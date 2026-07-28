import { sitemapIndex, xmlResponse } from "@/lib/seo/xml";

export const revalidate = 1800;

export function GET() {
  return xmlResponse(
    sitemapIndex([
      "/creator-sitemap.xml",
      "/brand-sitemap.xml",
      "/category-sitemap.xml",
      "/platform-sitemap.xml",
      "/city-sitemap.xml",
      "/state-sitemap.xml",
      "/search-sitemap.xml",
      "/image-sitemap.xml",
      "/video-sitemap.xml",
    ]),
  );
}
