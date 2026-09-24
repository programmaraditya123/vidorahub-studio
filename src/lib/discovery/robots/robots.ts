import type { MetadataRoute } from "next";
import { DEFAULT_BOT_DISALLOW, SITE_URL } from "../config/seo";
export function generate(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: DEFAULT_BOT_DISALLOW }], sitemap: SITE_URL + "/sitemap.xml" };
}
