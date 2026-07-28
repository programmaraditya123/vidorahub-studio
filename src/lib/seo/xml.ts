import { SITE_URL } from "./constants";

export type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  images?: { loc: string; title?: string; caption?: string; license?: string }[];
  videos?: {
    thumbnailLoc?: string;
    title: string;
    description: string;
    contentLoc?: string;
    playerLoc?: string;
    duration?: string;
    publicationDate?: string;
  }[];
};

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

function esc(value: unknown): string {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function xmlResponse(body: string, maxAge = 1800): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=86400`,
      "Last-Modified": new Date().toUTCString(),
      ETag: `"${Buffer.from(body).toString("base64url").slice(0, 27)}"`,
    },
  });
}

export function textResponse(body: string, contentType = "text/plain; charset=utf-8"): Response {
  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      "Last-Modified": new Date().toUTCString(),
      ETag: `"${Buffer.from(body).toString("base64url").slice(0, 27)}"`,
    },
  });
}

export function sitemapIndex(paths: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <sitemap>
    <loc>${esc(absoluteUrl(path))}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>`;
}

export function urlset(urls: SitemapUrl[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls
  .map(
    (url) => `  <url>
    <loc>${esc(absoluteUrl(url.loc))}</loc>
    ${url.lastmod ? `<lastmod>${esc(url.lastmod)}</lastmod>` : ""}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
    ${url.priority ? `<priority>${url.priority.toFixed(1)}</priority>` : ""}
${(url.images || [])
  .map(
    (image) => `    <image:image>
      <image:loc>${esc(image.loc)}</image:loc>
      ${image.title ? `<image:title>${esc(image.title)}</image:title>` : ""}
      ${image.caption ? `<image:caption>${esc(image.caption)}</image:caption>` : ""}
      ${image.license ? `<image:license>${esc(image.license)}</image:license>` : ""}
    </image:image>`,
  )
  .join("\n")}
${(url.videos || [])
  .map(
    (video) => `    <video:video>
      ${video.thumbnailLoc ? `<video:thumbnail_loc>${esc(video.thumbnailLoc)}</video:thumbnail_loc>` : ""}
      <video:title>${esc(video.title)}</video:title>
      <video:description>${esc(video.description)}</video:description>
      ${video.contentLoc ? `<video:content_loc>${esc(video.contentLoc)}</video:content_loc>` : ""}
      ${video.playerLoc ? `<video:player_loc>${esc(video.playerLoc)}</video:player_loc>` : ""}
      ${video.duration ? `<video:duration>${esc(video.duration)}</video:duration>` : ""}
      ${video.publicationDate ? `<video:publication_date>${esc(video.publicationDate)}</video:publication_date>` : ""}
    </video:video>`,
  )
  .join("\n")}
  </url>`,
  )
  .join("\n")}
</urlset>`;
}
