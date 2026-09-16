import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";
import axios from "axios";
import ts from "typescript";

const require = createRequire(import.meta.url);
const source = ts.transpileModule(
  readFileSync(new URL("../src/lib/http3.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } },
).outputText;

function client(browserWindow) {
  const loadedModule = { exports: {} };
  const context = { module: loadedModule, exports: loadedModule.exports, require, process: { env: {} } };
  if (browserWindow !== undefined) context.window = browserWindow;
  vm.runInNewContext(source, context);
  return loadedModule.exports.http3;
}

async function authorization(http, headers) {
  const response = await http.get("/test", {
    headers,
    adapter: async (config) => ({
      data: config.headers.get("Authorization"),
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    }),
  });
  return response.data;
}

function failure(data, status = 422, code, message = "Request failed") {
  return new axios.AxiosError(message, code, undefined, undefined,
    status === undefined ? undefined : { status, data });
}

async function rejected(http, error) {
  try {
    await http.get("/test", { adapter: async () => { throw error; } });
    assert.fail("Expected the request to reject");
  } catch (result) {
    if (result instanceof assert.AssertionError) throw result;
    return result;
  }
}

test("uses the latest stored token and stops adding it after logout", async () => {
  let token = "  first-token  ";
  const http = client({ localStorage: { getItem: () => token } });
  assert.equal(await authorization(http), "Bearer first-token");
  token = "second-token";
  assert.equal(await authorization(http), "Bearer second-token");
  token = null;
  assert.equal(await authorization(http), undefined);
  assert.equal(http.defaults.headers.common.Authorization, undefined);
});

test("preserves explicit authorization, including on the server", async () => {
  const http = client({ localStorage: { getItem: () => "stored-token" } });
  assert.equal(await authorization(http, { authorization: "Bearer explicit-token" }), "Bearer explicit-token");
  assert.equal(await authorization(client(), { Authorization: "Bearer server-token" }), "Bearer server-token");
  assert.equal(await authorization(client()), undefined);
});

test("missing, empty, invalid storage values and unavailable storage are safe", async () => {
  for (const token of [null, "", "  ", "null", "undefined"]) {
    assert.equal(await authorization(client({ localStorage: { getItem: () => token } })), undefined);
  }
  const browser = { get localStorage() { throw new Error("SecurityError"); } };
  assert.equal(await authorization(client(browser)), undefined);
});

test("normalizes FastAPI string, object and validation-list errors", async () => {
  for (const [data, message] of [
    [{ detail: "Not authenticated" }, "Not authenticated"],
    [{ detail: { message: "Permission denied" } }, "Permission denied"],
    [{ detail: [{ msg: "Field required" }, null, 7, {}, { msg: "Invalid value" }] }, "Field required; Invalid value"],
    [{ detail: [], message: "Invalid request" }, "Invalid request"],
    [{ detail: { unexpected: true }, message: "Upload failed" }, "Upload failed"],
  ]) {
    const raw = failure(data);
    const result = await rejected(client(), raw);
    assert.equal(result.status, 422);
    assert.equal(result.message, message);
    assert.equal(result.raw, raw);
  }
});

test("malformed response bodies produce a string message", async () => {
  for (const data of [null, "<html>Bad gateway</html>", 42, {}, { detail: [null], message: {} }]) {
    const result = await rejected(client(), failure(data, 500));
    assert.equal(result.message, "Request failed");
    assert.equal(result.status, 500);
  }
  const result = await rejected(client(), failure({}, 500, undefined, ""));
  assert.equal(result.message, "Something went wrong. Please try again.");
});

test("timeouts and network failures have useful messages without inventing a status", async () => {
  for (const [code, pattern] of [["ECONNABORTED", /timed out/], ["ETIMEDOUT", /timed out/], ["ERR_NETWORK", /Check your connection/]]) {
    const raw = new axios.AxiosError("Transport error", code);
    const result = await rejected(client(), raw);
    assert.match(result.message, pattern);
    assert.equal(result.status, undefined);
    assert.equal(result.raw, raw);
  }
});

test("cancellations and unexpected errors retain their original identity", async () => {
  const cancellation = new axios.CanceledError("Canceled by caller");
  assert.equal(await rejected(client(), cancellation), cancellation);
  assert.equal(axios.isCancel(await rejected(client(), cancellation)), true);
  const unexpected = new Error("Unexpected interceptor failure");
  assert.equal(await rejected(client(), unexpected), unexpected);
});
