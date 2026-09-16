import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(readFileSync(new URL("../src/lib/stores.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

function setup(response, rejection) {
  const calls = [];
  const request = async (...args) => {
    calls.push(args);
    if (rejection) throw rejection;
    return { data: response };
  };
  const loadedModule = { exports: {} };
  vm.runInNewContext(source, {
    module: loadedModule, exports: loadedModule.exports, URL,
    require: name => {
      assert.equal(name, "./http3");
      return { http3: { get: (...args) => request("GET", ...args), post: (...args) => request("POST", ...args) } };
    },
  });
  return { api: loadedModule.exports, calls };
}

const saved = {
  _id: "store-id", ownerId: "owner-id", name: "Studio shop", description: "Templates and art",
  category: ["Design"], subCategory: ["Templates"], currency: "rupee", rating: 4,
  review_count: 12, isAvailable: false, policies: { shipping: "Digital delivery", returns: "Contact us" },
  location: "Delhi", websiteurl: "https://example.com",
};

test("status distinguishes an existing store from the supplied null response", async () => {
  assert.equal(await setup({ success: true, message: "store already created" }).api.getStoreStatus(), true);
  assert.equal(await setup(null).api.getStoreStatus(), false);
  assert.equal(await setup({ success: false, exists: false }).api.getStoreStatus(), false);
  assert.equal(await setup({ success: false, message: "No store found" }).api.getStoreStatus(), false);
});

test("unknown status and failed requests are not treated as a missing store", async () => {
  for (const response of [undefined, {}, "Bad gateway", { success: false, message: "Forbidden" }]) {
    await assert.rejects(setup(response).api.getStoreStatus());
  }
  const error = { status: 401, message: "Not authenticated" };
  await assert.rejects(setup(null, error).api.getStoreStatus(), result => result === error);
});

test("GET requests use exact paths, support cancellation, and do not send bodies", async () => {
  const { api, calls } = setup({ success: true, store: saved });
  const signal = new AbortController().signal;
  await api.getStoreStatus(signal);
  await api.getStoreDetails(signal);
  assert.equal(calls[0][1], "/api/store/status");
  assert.equal(calls[1][1], "/api/store/store_details");
  for (const call of calls) {
    assert.equal(call[0], "GET");
    assert.equal(call[2].signal, signal);
    assert.equal("data" in call[2], false);
  }
});

test("details map MongoDB subCategory and preserve false availability and review data", async () => {
  const { api } = setup({ success: true, store: saved });
  const details = await api.getStoreDetails();
  assert.equal(details.subCatgories[0], "Templates");
  assert.equal(details.isAvailable, false);
  assert.equal(details.rating, 4);
  assert.equal(details.review_count, 12);
  assert.equal("ownerId" in details, false);
  assert.equal("_id" in details, false);
  const payload = api.storeFormToPayload(api.storeToForm(details));
  assert.equal(payload.rating, 4);
  assert.equal(payload.review_count, 12);
  assert.equal(payload.isAvailable, false);
});

test("missing details are explicit; malformed details cannot populate an update form", async () => {
  assert.equal(await setup({ success: false, message: "No store found" }).api.getStoreDetails(), null);
  for (const store of [null, {}, { ...saved, policies: null }, { ...saved, currency: "GBP" }, { ...saved, category: "Design" }, { ...saved, review_count: 1.5 }, { ...saved, isAvailable: "false" }]) {
    await assert.rejects(setup({ success: true, store }).api.getStoreDetails());
  }
  await assert.rejects(setup({ success: true }).api.getStoreDetails());
});

test("new stores start with zero counters; required fields reject whitespace", () => {
  const { api } = setup();
  const form = api.storeToForm();
  assert.equal(form.rating, 0);
  assert.equal(form.review_count, 0);
  form.name = "  ";
  form.categories = " , , ";
  const errors = api.validateStoreForm(form);
  for (const field of ["name", "description", "categories", "location", "shipping", "returns"]) assert.ok(errors[field]);
  assert.throws(() => api.storeFormToPayload(form));
});

test("payload trims text, removes empty and duplicate categories, and keeps wire spelling", () => {
  const { api } = setup();
  const form = api.storeToForm(api.parseStoreDetails(saved));
  form.name = "  My store  ";
  form.categories = "Design, design, Art, ,";
  form.subcategories = " , ";
  form.websiteurl = "";
  const payload = api.storeFormToPayload(form);
  assert.equal(payload.name, "My store");
  assert.equal(JSON.stringify(payload.category), '["Design","Art"]');
  assert.equal(payload.subCatgories.length, 0);
  assert.equal("subCategory" in payload, false);
  assert.equal(payload.websiteurl, "");
});

test("website validation allows optional HTTP(S) URLs and rejects invalid schemes and credentials", () => {
  const { api } = setup();
  const form = api.storeToForm(api.parseStoreDetails(saved));
  for (const websiteurl of ["", "https://example.com/shop", "http://example.com"]) assert.equal(api.validateStoreForm({ ...form, websiteurl }).websiteurl, undefined);
  for (const websiteurl of ["example.com", "javascript:alert(1)", "ftp://example.com", "https://user:password@example.com"]) assert.ok(api.validateStoreForm({ ...form, websiteurl }).websiteurl);
});

test("mutations POST to the correct endpoint and reject success:false responses", async () => {
  const { api, calls } = setup({ success: true, message: "Saved" });
  const payload = api.parseStoreDetails(saved);
  await api.createStore(payload);
  await api.updateStore(payload);
  assert.equal(calls[0][0], "POST");
  assert.equal(calls[0][1], "/api/store/create");
  assert.equal(calls[1][1], "/api/store/update");
  assert.equal(calls[1][2], payload);
  for (const response of [null, {}, { success: false, message: "Failed" }]) await assert.rejects(setup(response).api.createStore(payload));
});

test("duplicate create is distinguished from creation; misleading missing-store update fails", async () => {
  const { api } = setup({ success: true, message: "store already created" });
  assert.equal((await api.createStore(api.parseStoreDetails(saved))).alreadyExists, true);
  await assert.rejects(api.updateStore(api.parseStoreDetails(saved)), /not updated/);
});

test("auth, permission, server and fallback error messages are useful", () => {
  const { api } = setup();
  assert.match(api.storeErrorMessage({ status: 401 }), /sign in/);
  assert.match(api.storeErrorMessage({ status: 403 }), /permission/);
  assert.equal(api.storeErrorMessage({ message: "Validation failed" }), "Validation failed");
  assert.equal(api.storeErrorMessage(null, "Retry"), "Retry");
});
