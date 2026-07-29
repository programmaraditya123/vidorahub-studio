import type { MetadataRoute } from "next";
import {
  ALLOWED_BOTS,
  DEFAULT_BOT_DISALLOW,
  PUBLIC_BOT_DISALLOW,
  SITE_URL,
} from "../config/seo";

export function generate(): MetadataRoute.Robots {
  return {
    rules: [
      ...ALLOWED_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PUBLIC_BOT_DISALLOW,
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: DEFAULT_BOT_DISALLOW,
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/creator-sitemap.xml`,
      `${SITE_URL}/brand-sitemap.xml`,
      `${SITE_URL}/image-sitemap.xml`,
      `${SITE_URL}/video-sitemap.xml`,
    ],
    host: SITE_URL,
  };
}
