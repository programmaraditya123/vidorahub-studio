import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(readFileSync(new URL("../src/lib/uploads.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

function uploadsWithClient(http3) {
  const loaded = { exports: {} };
  vm.runInNewContext(source, {
    module: loaded, exports: loaded.exports,
    require: name => { assert.equal(name, "./http3"); return { http3 }; },
  });
  return loaded.exports;
}

test("creator uploads use http3 with requested page, page size and cancellation signal", async () => {
  const signal = new AbortController().signal;
  const response = { success: true, videos: [], page: 3, limit: 10, total_count: 25, total_pages: 3, has_next: false, has_previous: true };
  const api = uploadsWithClient({ get: async (url, config) => {
    assert.equal(url, "/api/creator/videos");
    assert.equal(config.params.page, 3);
    assert.equal(config.params.limit, 10);
    assert.equal(config.signal, signal);
    return { data: response };
  } });
  assert.equal(await api.getCreatorUploads(3, signal), response);
});

test("unsuccessful responses are errors rather than empty upload lists", async () => {
  for (const response of [{ success: false, videos: [] }, { success: true, videos: null }]) {
    const api = uploadsWithClient({ get: async () => ({ data: response }) });
    await assert.rejects(api.getCreatorUploads(1), /Could not load your uploads/);
  }
});

test("http3 errors reach callers with the server message", async () => {
  const error = { status: 401, message: "Not authenticated" };
  const api = uploadsWithClient({ get: async () => { throw error; } });
  await assert.rejects(api.getCreatorUploads(1), reason => reason === error);
  assert.equal(api.uploadErrorMessage(error), "Not authenticated");
});

test("title updates post the video_id and trimmed title through http3", async () => {
  const api = uploadsWithClient({ post: async (url, payload) => {
    assert.equal(url, "/api/creator/updateVideoTitle");
    assert.equal(payload.video_id, "video-123");
    assert.equal(payload.title, "Updated title");
    assert.deepEqual(Object.keys(payload).sort(), ["title", "video_id"]);
    return { data: { success: true, message: "Title saved" } };
  } });
  assert.equal(await api.updateVideoTitle("video-123", "  Updated title  "), "Title saved");
});

test("title updates accept an updated video document without a success envelope", async () => {
  const api = uploadsWithClient({ post: async () => ({ data: { _id: "video-123", title: "Updated title" } }) });
  assert.equal(await api.updateVideoTitle("video-123", "Updated title"), "Title updated successfully.");
});

test("title updates reject blank input before calling the API", async () => {
  const api = uploadsWithClient({ post: async () => assert.fail("Must not submit an empty title") });
  await assert.rejects(api.updateVideoTitle("video-123", "  "), /Enter a title/);
});

test("failed title updates do not report success", async () => {
  for (const data of [null, false, { success: false, message: "Video not found" }, { ok: false }]) {
    const api = uploadsWithClient({ post: async () => ({ data }) });
    await assert.rejects(api.updateVideoTitle("video-123", "Updated title"), /Video not found|Could not update the title/);
  }
  const error = { status: 403, message: "Permission denied" };
  const api = uploadsWithClient({ post: async () => { throw error; } });
  await assert.rejects(api.updateVideoTitle("video-123", "Updated title"), reason => reason === error);
});
