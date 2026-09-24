import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(
  readFileSync(new URL("../src/lib/LoginRegisterApis.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;

function loadApi(post) {
  const module = { exports: {} };
  vm.runInNewContext(source, {
    module,
    exports: module.exports,
    require(name) {
      assert.equal(name, "./http");
      return { http: { post } };
    },
  });
  return module.exports;
}

test("Google login sends the Google credential through http and returns the app session", async () => {
  const response = {
    success: true,
    token: "app-jwt",
    user: { name: "Test", email: "test@example.com", userId: "123", userSerialNumber: 1 },
  };
  const api = loadApi(async (path, body) => {
    assert.equal(path, "/api/v1/google-login");
    assert.deepEqual(Object.keys(body), ["token"]);
    assert.equal(body.token, "google-id-token");
    return { data: response };
  });
  assert.equal(await api.googleLogin("google-id-token"), response);
});

test("Google login preserves HTTP errors for the sign-in error message", async () => {
  const error = { status: 500, message: "Google authentication failed" };
  const api = loadApi(async () => { throw error; });
  await assert.rejects(api.googleLogin("invalid-token"), (caught) => caught === error);
});
