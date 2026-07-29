import { DISCOVERY_CACHE } from "../config/cache";

function etag(body: string): string {
  return `"${Buffer.from(body).toString("base64url").slice(0, 27)}"`;
}

export function xmlResponse(body: string, maxAge = DISCOVERY_CACHE.sitemap): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=${DISCOVERY_CACHE.staleWhileRevalidate}`,
      "Last-Modified": new Date().toUTCString(),
      ETag: etag(body),
    },
  });
}

export function textResponse(body: string, contentType = "text/plain; charset=utf-8"): Response {
  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": `public, max-age=${DISCOVERY_CACHE.text}, s-maxage=${DISCOVERY_CACHE.text}, stale-while-revalidate=${DISCOVERY_CACHE.staleWhileRevalidate}`,
      "Last-Modified": new Date().toUTCString(),
      ETag: etag(body),
    },
  });
}
