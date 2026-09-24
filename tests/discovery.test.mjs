import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { createRequire } from "node:module";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";
import React from "react";
import { renderToString } from "react-dom/server";

const require = createRequire(import.meta.url);
const root = resolve(".");
const entityPath = resolve(root, "src/lib/discovery/search/entities.ts");
function loader({ fetch, entities } = {}) {
  const modules = new Map();
  if (entities) modules.set(entityPath, { exports: entities });
  function load(file) {
    const absolute = resolve(root, file);
    const filename = [absolute, absolute + ".ts", absolute + ".tsx", absolute + "/index.ts"].find(p => existsSync(p) && /\.[cm]?[jt]sx?$/.test(p));
    if (!filename) throw Error("Cannot resolve " + file);
    if (modules.has(filename)) return modules.get(filename).exports;
    const module = { exports: {} }; modules.set(filename, module);
    const source = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText;
    vm.runInNewContext(source, { module, exports: module.exports,
      require(name) {
        if (name === "react") return { ...React, cache: fn => fn };
        if (name === "next/navigation") return { notFound() { throw Error("NOT_FOUND"); } };
        if (name.startsWith(".")) return load(resolve(dirname(filename), name));
        return require(name);
      },
      URL, URLSearchParams, AbortSignal, Response, Buffer, fetch,
      process: { env: { NEXT_PUBLIC_API_BASE_URL: "https://api.example.test" } },
    }, { filename });
    return module.exports;
  }
  return load;
}
const id = "69974bc1f19a0c7fe0a42de0";
const creator = { _id: id, name: "Example Creator", tags: ["Fashion"], city: "Delhi", updatedAt: "2026-01-02T00:00:00Z" };
const fixture = { getAllCreators: async () => [creator], getAllBrands: async () => [] };

test("public content is included in server HTML before auth hydration", () => {
  const { AuthProvider } = loader()("src/Context/AuthContext.tsx");
  assert.match(renderToString(React.createElement(AuthProvider, null, React.createElement("h1", null, "Public content"))), /<h1>Public content<\/h1>/);
});

test("sitemaps include public entry pages, omit empty directories and redirect aliases", async () => {
  const sitemap = loader({ entities: fixture })("src/lib/discovery/sitemap/index.ts");
  assert.match(sitemap.generate(), /page-sitemap.xml/);
  assert.doesNotMatch(sitemap.generate(), /lastmod|video-sitemap/);
  assert.match(await sitemap.pages(), /<loc>https:\/\/studio.vidorahub.com\/<\/loc>/);
  assert.doesNotMatch(await sitemap.pages(), /\/brands</);
  assert.match(await sitemap.categories(), /categories\/fashion/);
  assert.doesNotMatch(await sitemap.categories(), /gaming/);
  assert.match(await sitemap.search(), /search\/fashion\/delhi/);
  assert.doesNotMatch(await sitemap.search(), /ugc-creators|youtube-creators|fashion\/mumbai/);
  assert.doesNotMatch(await sitemap.videos(), /<video:video>/);
});

test("sitemap serialization escapes URLs, deduplicates, and omits invalid dates", () => {
  const { urlset } = loader()("src/lib/discovery/sitemap/generator.ts");
  const xml = urlset([{ loc: "/search?name=A&B", lastmod: "not-a-date" }, { loc: "/search?name=A&B" }]);
  assert.equal((xml.match(/<url>/g) || []).length, 1);
  assert.match(xml, /A&amp;B/);
  assert.doesNotMatch(xml, /lastmod|Invalid Date/);
  assert.match(urlset([{ loc: "/", lastmod: "2026-01-02" }]), /2026-01-02T00:00:00.000Z/);
});

test("profile schema separates the profile page from its person without invented FAQ or videos", () => {
  const { creatorJsonLd } = loader()("src/lib/discovery/schemas/creator.ts");
  const graph = creatorJsonLd({ _id: id, name: "Example", showCaseContent: [{ link: "https://example.com/post" }] });
  assert.equal(graph[0]["@type"], "ProfilePage");
  assert.equal(graph[0].mainEntity["@type"], "Person");
  assert.equal(graph[0].mainEntity.address, undefined);
  assert.doesNotMatch(JSON.stringify(graph), /FAQPage|VideoObject|Instagram|India/);
});

test("filtered search is noindex with a stable canonical and tracking parameters removed", () => {
  const { searchMetadata } = loader()("src/lib/discovery/metadata/shared.ts");
  const metadata = searchMetadata({ location: "Delhi", category: "Fashion", utm_source: "test" });
  assert.equal(metadata.alternates.canonical, "/search?niche=Fashion&location=Delhi");
  assert.equal(metadata.robots.index, false);
  assert.equal(searchMetadata({ utm_source: "test" }).alternates.canonical, "/search");
});

test("unknown landing segments fail and known single filters redirect to one canonical directory", () => {
  const { resolveSearchLanding } = loader()("src/lib/discovery/search/landing.ts");
  assert.equal(resolveSearchLanding(["made-up"]), null);
  assert.equal(resolveSearchLanding(["fashion", "delhi", "extra"]), null);
  assert.equal(resolveSearchLanding(["youtube-creators"]).redirect, "/platforms/youtube");
  assert.equal(resolveSearchLanding(["delhi"]).redirect, "/cities/delhi");
});

test("creator discovery follows API pagination instead of silently truncating page one", async () => {
  const pages = [];
  const { getAllCreators } = loader({ fetch: async url => {
    const page = Number(url.searchParams.get("page")); pages.push(page);
    return Response.json({ creators: [{ ...creator, _id: page === 1 ? id : "69974bc1f19a0c7fe0a42de1" }], pagination: { totalPages: 2 } });
  } })("src/lib/discovery/search/entities.ts");
  assert.equal((await getAllCreators()).length, 2);
  assert.deepEqual(pages, [1, 2]);
});

test("upstream failures do not become empty sitemaps or false profile 404s", async () => {
  const api = loader({ fetch: async () => new Response("unavailable", { status: 503 }) })("src/lib/discovery/search/entities.ts");
  await assert.rejects(api.getAllCreators(), /503/);
  await assert.rejects(api.getCreatorById(id), /503/);
  const missing = loader({ fetch: async () => new Response(null, { status: 404 }) })("src/lib/discovery/search/entities.ts");
  assert.equal(await missing.getCreatorById(id), null);
});

test("response validators hash the whole document and do not fabricate modification dates", () => {
  const { xmlResponse } = loader()("src/lib/discovery/generators/response.ts");
  const prefix = '<?xml version="1.0" encoding="UTF-8"?>';
  const first = xmlResponse(prefix + "one"); const second = xmlResponse(prefix + "two");
  assert.notEqual(first.headers.get("etag"), second.headers.get("etag"));
  assert.equal(first.headers.get("last-modified"), null);
});
