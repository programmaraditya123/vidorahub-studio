import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./constants";
import { buildEntitySlug, slugify, titleizeSlug } from "./slugs";
import { BrandEntity, CreatorEntity } from "./types";

function absolute(path: string): string {
  return new URL(path, SITE_URL).toString();
}

function compactDescription(value: string, fallback: string): string {
  const text = value.replace(/\s+/g, " ").trim() || fallback;
  return text.length > 155 ? `${text.slice(0, 152).trim()}...` : text;
}

export function creatorPath(creator: CreatorEntity): string {
  return `/creator/${buildEntitySlug(creator.username || creator.name, creator._id)}`;
}

export function brandPath(brand: BrandEntity): string {
  return `/brand/${buildEntitySlug(brand.name, brand._id)}`;
}

export function creatorMetadata(creator: CreatorEntity): Metadata {
  const name = creator.name || creator.username || "Creator";
  const category = creator.tags?.[0] || "Creator";
  const location = creator.location || creator.city || creator.state || "India";
  const path = creatorPath(creator);
  const description = compactDescription(
    creator.bio ||
      `Discover ${name}'s creator portfolio. View social platforms, audience demographics, content categories, collaborations and contact details.`,
    `Discover ${name}'s creator portfolio on ${SITE_NAME}.`,
  );
  const image = creator.profilePicUrl || "/og-image.png";

  return {
    title: `${name} | ${category} Creator | ${SITE_NAME}`,
    description,
    keywords: [
      name,
      `${category} creator`,
      `${category} influencer ${location}`,
      `hire ${category} creator`,
      "creator portfolio",
      "brand collaboration creators",
      "influencer marketplace India",
      ...new Set([...(creator.tags || []), location]),
    ],
    alternates: {
      canonical: path,
      languages: { "en-IN": path },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${name} | ${category} Creator`,
      description,
      url: absolute(path),
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: `${name} creator profile` }],
      type: "profile",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${category} Creator`,
      description,
      images: [image],
    },
  };
}

export function brandMetadata(brand: BrandEntity): Metadata {
  const name = brand.name || "Brand";
  const category = brand.category || "Brand";
  const path = brandPath(brand);
  const description = compactDescription(
    brand.bio ||
      `Discover ${name} on ${SITE_NAME}. Explore brand category, location, collaboration goals and creator partnership opportunities.`,
    `Discover ${name} on ${SITE_NAME}.`,
  );
  const image = brand.profilePicUrl || brand.logoUrl || "/og-image.png";

  return {
    title: `${name} | ${category} Brand | ${SITE_NAME}`,
    description,
    keywords: [
      name,
      `${category} brand`,
      "brand collaborations",
      "hire creators",
      "creator marketplace India",
      "influencer partnerships",
    ],
    alternates: {
      canonical: path,
      languages: { "en-IN": path },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${name} | ${category} Brand`,
      description,
      url: absolute(path),
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: `${name} brand profile` }],
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${category} Brand`,
      description,
      images: [image],
    },
  };
}

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
      languages: { "en-IN": path },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${label} Creators and Brands | ${SITE_NAME}`,
      description,
      url: absolute(path),
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
  const query = new URLSearchParams();
  usefulFilters.forEach(([key, value]) => query.set(key, value || ""));
  const path = query.size ? `/search?${query.toString()}` : "/search";

  return {
    title: `${label} | Creator Search`,
    description: `Search ${label.toLowerCase()} profiles on ${SITE_NAME}. Filter by category, platform, location, followers, language, creator type and brand fit.`,
    keywords: ["creator search", "influencer search", "hire influencer", label],
    alternates: { canonical: path, languages: { "en-IN": path } },
    robots: { index: usefulFilters.length <= 2, follow: true },
    openGraph: {
      title: `${label} | ${SITE_NAME}`,
      description: `Find relevant creator profiles for brand collaborations on ${SITE_NAME}.`,
      url: absolute(path),
      siteName: SITE_NAME,
      type: "website",
    },
  };
}
