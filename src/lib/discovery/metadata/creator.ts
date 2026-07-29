import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_LANGUAGE, SITE_LOCALE, SITE_NAME } from "../config/seo";
import { getAllCreators, getCreatorById } from "../search/entities";
import type { CreatorEntity } from "../types";
import { absoluteUrl } from "../urls/canonical";
import { creatorPath } from "../urls/creator";
import { extractObjectId } from "../urls/slug";
import { compactDescription } from "../utils/sanitize";

type CreatorPageProps = {
  params: Promise<{ slug: string }>;
};

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
  const image = creator.profilePicUrl || DEFAULT_OG_IMAGE;

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
      languages: { [SITE_LANGUAGE]: path },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${name} | ${category} Creator`,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: `${name} creator profile` }],
      type: "profile",
      locale: SITE_LOCALE,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${category} Creator`,
      description,
      images: [image],
    },
  };
}

export async function generateCreatorStaticParams() {
  const creators = await getAllCreators(1000);
  return creators.map((creator) => ({
    slug: creatorPath(creator).split("/").pop() || creator._id,
  }));
}

export async function generateCreatorMetadata({ params }: CreatorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const id = extractObjectId(slug);
  if (!id) return {};

  const creator = await getCreatorById(id);
  return creator ? creatorMetadata(creator) : {};
}

export async function resolveCreatorRoute(slug: string) {
  const id = extractObjectId(slug);
  const creator = id ? await getCreatorById(id) : null;
  const canonicalPath = creator ? creatorPath(creator) : null;

  return {
    id,
    creator,
    canonicalPath,
    redirectPath: canonicalPath && `/creator/${slug}` !== canonicalPath ? canonicalPath : null,
  };
}
