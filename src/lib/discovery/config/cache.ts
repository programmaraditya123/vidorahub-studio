export const DISCOVERY_CACHE = {
  profile: 900,
  sitemap: 1800,
  collection: 86400,
  text: 3600,
  staleWhileRevalidate: 86400,
};

export const DISCOVERY_REVALIDATE_PATHS = [
  "/sitemap.xml",
  "/creator-sitemap.xml",
  "/brand-sitemap.xml",
  "/category-sitemap.xml",
  "/platform-sitemap.xml",
  "/city-sitemap.xml",
  "/state-sitemap.xml",
  "/search-sitemap.xml",
  "/image-sitemap.xml",
  "/video-sitemap.xml",
  "/rss.xml",
  "/atom.xml",
  "/llms.txt",
  "/llms-full.txt",
];
