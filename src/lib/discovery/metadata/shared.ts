import type { Metadata } from "next";
import { SITE_LANGUAGE, SITE_NAME } from "../config/seo";
import { absoluteUrl } from "../urls/canonical";
import { searchPath } from "../urls/search";
import { slugify, titleizeSlug } from "../utils/slugify";

export function collectionMetadata(kind: string, slug?: string): Metadata {
  const label = slug ? titleizeSlug(slug) : titleizeSlug(kind);
  const path = slug ? `/${kind}/${slugify(slug)}` : `/${kind}`;
  const description = `Explore ${label} creators, brands and collaboration opportunities on ${SITE_NAME}. Find trusted profiles, platforms, locations and portfolio details.`;

  return {
    title: `${label} Creators and Brands`,
    description,
    keywords: [
      `${label} creators`,
      `${label} influencers`,
      "creator marketplace India",
      "hire influencer",
      "brand collaboration creators",
    ],
    alternates: {
      canonical: path,
      languages: { [SITE_LANGUAGE]: path },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${label} Creators and Brands | ${SITE_NAME}`,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${label} Creators and Brands`,
      description,
    },
  };
}

export function searchMetadata(filters: Record<string, string | undefined>): Metadata {
  const usefulFilters = Object.entries(filters).filter(([, value]) => Boolean(value));
  const label = usefulFilters.length
    ? usefulFilters.map(([, value]) => titleizeSlug(slugify(value || ""))).join(" ")
    : "Creator Search";
  const path = searchPath(filters);

  return {
    title: `${label} | Creator Search`,
    description: `Search ${label.toLowerCase()} profiles on ${SITE_NAME}. Filter by category, platform, location, followers, language, creator type and brand fit.`,
    keywords: ["creator search", "influencer search", "hire influencer", label],
    alternates: { canonical: path, languages: { [SITE_LANGUAGE]: path } },
    robots: { index: usefulFilters.length <= 2, follow: true },
    openGraph: {
      title: `${label} | ${SITE_NAME}`,
      description: `Find relevant creator profiles for brand collaborations on ${SITE_NAME}.`,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      type: "website",
    },
  };
}
