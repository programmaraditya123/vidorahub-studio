import type { SitemapUrl } from "../types";
import { absoluteUrl } from "../urls/canonical";
import { escapeXml } from "../utils/sanitize";

export function sitemapIndex(paths: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <sitemap>
    <loc>${escapeXml(absoluteUrl(path))}</loc>
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
    <loc>${escapeXml(absoluteUrl(url.loc))}</loc>
    ${url.lastmod ? `<lastmod>${escapeXml(url.lastmod)}</lastmod>` : ""}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
    ${url.priority ? `<priority>${url.priority.toFixed(1)}</priority>` : ""}
${(url.images || [])
  .map(
    (image) => `    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>
      ${image.title ? `<image:title>${escapeXml(image.title)}</image:title>` : ""}
      ${image.caption ? `<image:caption>${escapeXml(image.caption)}</image:caption>` : ""}
      ${image.license ? `<image:license>${escapeXml(image.license)}</image:license>` : ""}
    </image:image>`,
  )
  .join("\n")}
${(url.videos || [])
  .map(
    (video) => `    <video:video>
      ${video.thumbnailLoc ? `<video:thumbnail_loc>${escapeXml(video.thumbnailLoc)}</video:thumbnail_loc>` : ""}
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      ${video.contentLoc ? `<video:content_loc>${escapeXml(video.contentLoc)}</video:content_loc>` : ""}
      ${video.playerLoc ? `<video:player_loc>${escapeXml(video.playerLoc)}</video:player_loc>` : ""}
      ${video.duration ? `<video:duration>${escapeXml(video.duration)}</video:duration>` : ""}
      ${video.publicationDate ? `<video:publication_date>${escapeXml(video.publicationDate)}</video:publication_date>` : ""}
    </video:video>`,
  )
  .join("\n")}
  </url>`,
  )
  .join("\n")}
</urlset>`;
}
