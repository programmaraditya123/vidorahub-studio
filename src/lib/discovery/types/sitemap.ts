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
