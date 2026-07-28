import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";

export default function robots(): MetadataRoute.Robots {
  const allowBots = [
    "Googlebot",
    "Googlebot-News",
    "Googlebot-Image",
    "Bingbot",
    "DuckDuckBot",
    "Yandex",
    "Applebot",
    "ClaudeBot",
    "Claude-Web",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "CCBot",
    "PerplexityBot",
    "Amazonbot",
    "Bytespider",
    "facebookexternalhit",
    "LinkedInBot",
    "Slackbot",
    "Discordbot",
    "Pinterestbot",
    "Twitterbot",
  ];

  return {
    rules: [
      ...allowBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: [
          "/dashboard",
          "/login",
          "/signup",
          "/profile/edit",
          "/profile/settings",
          "/profile/notifications",
          "/profile/messages",
          "/settings",
          "/notifications",
          "/messages",
          "/api",
          "/private",
          "/admin",
        ],
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/login", "/signup", "/profile", "/api", "/private", "/admin"],
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
