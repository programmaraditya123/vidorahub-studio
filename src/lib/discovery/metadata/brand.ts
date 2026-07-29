import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_LANGUAGE, SITE_LOCALE, SITE_NAME } from "../config/seo";
import { getAllBrands, getBrandById } from "../search/entities";
import type { BrandEntity } from "../types";
import { absoluteUrl } from "../urls/canonical";
import { brandPath } from "../urls/brand";
import { extractObjectId } from "../urls/slug";
import { compactDescription } from "../utils/sanitize";

type BrandPageProps = {
  params: Promise<{ slug: string }>;
};

export function brandMetadata(brand: BrandEntity): Metadata {
  const name = brand.name || "Brand";
  const category = brand.category || "Brand";
  const path = brandPath(brand);
  const description = compactDescription(
    brand.bio ||
      `Discover ${name} on ${SITE_NAME}. Explore brand category, location, collaboration goals and creator partnership opportunities.`,
    `Discover ${name} on ${SITE_NAME}.`,
  );
  const image = brand.profilePicUrl || brand.logoUrl || DEFAULT_OG_IMAGE;

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
      languages: { [SITE_LANGUAGE]: path },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${name} | ${category} Brand`,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: `${name} brand profile` }],
      type: "website",
      locale: SITE_LOCALE,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${category} Brand`,
      description,
      images: [image],
    },
  };
}

export async function generateBrandStaticParams() {
  const brands = await getAllBrands();
  return brands.map((brand) => ({
    slug: brandPath(brand).split("/").pop() || brand._id,
  }));
}

export async function generateBrandMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const id = extractObjectId(slug);
  if (!id) return {};

  const brand = await getBrandById(id);
  return brand ? brandMetadata(brand) : {};
}

export async function resolveBrandRoute(slug: string) {
  const id = extractObjectId(slug);
  const brand = id ? await getBrandById(id) : null;
  const canonicalPath = brand ? brandPath(brand) : null;

  return {
    id,
    brand,
    canonicalPath,
    redirectPath: canonicalPath && `/brand/${slug}` !== canonicalPath ? canonicalPath : null,
  };
}
