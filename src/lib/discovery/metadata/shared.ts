import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME } from "../config/seo";
import { absoluteUrl } from "../urls/canonical";
import { searchPath } from "../urls/search";
import { getCollection, collectionTitle } from "../search/collections";

export async function collectionMetadata(kind: string, slug?: string): Promise<Metadata> {
  const profiles = await getCollection(kind, slug);
  const title = collectionTitle(kind, slug);
  const path = slug ? "/" + kind + "/" + slug : "/" + kind;
  const description = "Browse " + title.toLowerCase() + " on " + SITE_NAME + ". Explore public profile information and potential collaboration partners.";
  return {
    title, description, alternates: { canonical: path },
    robots: { index: profiles.length > 0, follow: true },
    openGraph: { title, description, url: absoluteUrl(path), siteName: SITE_NAME, type: "website", images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export function searchMetadata(filters: Record<string, string | undefined>): Metadata {
  const path = searchPath(filters);
  const filtered = path !== "/search";
  const title = "Search Creators";
  const description = "Find creator profiles by name, niche and location on VidoraHub Studio.";
  return {
    title, description, alternates: { canonical: path },
    robots: { index: !filtered, follow: true },
    openGraph: { title, description, url: absoluteUrl(path), siteName: SITE_NAME, type: "website", images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}
