import type { Metadata } from "next";
import { ROOT_METADATA_CONFIG, SITE_LANGUAGE } from "../config/seo";

export function homepageMetadata(): Metadata {
  return {
    title: ROOT_METADATA_CONFIG.title,
    description: ROOT_METADATA_CONFIG.description,
    keywords: ROOT_METADATA_CONFIG.keywords,
    metadataBase: new URL(ROOT_METADATA_CONFIG.metadataBase),
    openGraph: ROOT_METADATA_CONFIG.openGraph,
    twitter: ROOT_METADATA_CONFIG.twitter,
    robots: { index: true, follow: true },
    icons: { icon: "/favicon.ico" },
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: "/",
      languages: { [SITE_LANGUAGE]: "/" },
      types: {
        "application/rss+xml": "/rss.xml",
        "application/atom+xml": "/atom.xml",
      },
    },
  };
}
