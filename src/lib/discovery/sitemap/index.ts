import {
  INDEXABLE_CATEGORIES,
  INDEXABLE_CITIES,
  INDEXABLE_PLATFORMS,
  INDEXABLE_STATES,
} from "../config/seo";
import { getAllBrands, getAllCreators } from "../search/entities";
import { brandPath } from "../urls/brand";
import { creatorPath } from "../urls/creator";
import { compact } from "../utils/normalize";
import { sitemapIndex, urlset } from "./generator";

export const SITEMAP_INDEX_PATHS = [
  "/creator-sitemap.xml",
  "/brand-sitemap.xml",
  "/category-sitemap.xml",
  "/platform-sitemap.xml",
  "/city-sitemap.xml",
  "/state-sitemap.xml",
  "/search-sitemap.xml",
  "/image-sitemap.xml",
  "/video-sitemap.xml",
];

export function generate(): string {
  return sitemapIndex(SITEMAP_INDEX_PATHS);
}

export async function creators(): Promise<string> {
  const creators = await getAllCreators();
  return urlset(
    creators.map((creator) => ({
      loc: creatorPath(creator),
      lastmod: creator.updatedAt || creator.createdAt,
      changefreq: "daily",
      priority: 0.9,
    })),
  );
}

export async function brands(): Promise<string> {
  const brands = await getAllBrands();
  return urlset(
    brands.map((brand) => ({
      loc: brandPath(brand),
      lastmod: brand.updatedAt || brand.createdAt,
      changefreq: "daily",
      priority: 0.8,
    })),
  );
}

function collection(paths: string[], rootPath: string): string {
  return urlset(
    [rootPath, ...paths].map((loc) => ({
      loc,
      changefreq: "weekly",
      priority: loc === rootPath ? 0.7 : 0.8,
    })),
  );
}

export function categories(): string {
  return collection(INDEXABLE_CATEGORIES.map((category) => `/categories/${category}`), "/categories");
}

export function platforms(): string {
  return collection(INDEXABLE_PLATFORMS.map((platform) => `/platforms/${platform}`), "/platforms");
}

export function cities(): string {
  return collection(INDEXABLE_CITIES.map((city) => `/cities/${city}`), "/cities");
}

export function states(): string {
  return collection(INDEXABLE_STATES.map((state) => `/states/${state}`), "/states");
}

export function search(): string {
  const paths = [
    "/search",
    ...INDEXABLE_CATEGORIES.slice(0, 8).map((category) => `/search/${category}`),
    ...INDEXABLE_PLATFORMS.map((platform) => `/search/${platform}-creators`),
    ...INDEXABLE_CITIES.slice(0, 8).map((city) => `/search/${city}`),
    ...INDEXABLE_CATEGORIES.slice(0, 6).flatMap((category) =>
      INDEXABLE_CITIES.slice(0, 6).map((city) => `/search/${category}/${city}`),
    ),
    "/search/ugc-creators",
  ];

  return urlset(paths.map((loc) => ({ loc, changefreq: "weekly", priority: loc === "/search" ? 0.8 : 0.7 })));
}

export async function images(): Promise<string> {
  const [creators, brands] = await Promise.all([getAllCreators(), getAllBrands()]);
  const creatorUrls = creators.map((creator) => ({
    loc: creatorPath(creator),
    images: compact([
      creator.profilePicUrl
        ? {
            loc: creator.profilePicUrl,
            title: `${creator.name || "Creator"} profile photo`,
            caption: `${creator.name || "Creator"} creator profile on VidoraHub Studio`,
          }
        : null,
      creator.coverImageUrl
        ? {
            loc: creator.coverImageUrl,
            title: `${creator.name || "Creator"} cover image`,
          }
        : null,
    ]),
  }));
  const brandUrls = brands.map((brand) => ({
    loc: brandPath(brand),
    images: compact([
      brand.logoUrl || brand.profilePicUrl
        ? {
            loc: brand.logoUrl || brand.profilePicUrl || "",
            title: `${brand.name || "Brand"} logo`,
            caption: `${brand.name || "Brand"} brand profile on VidoraHub Studio`,
          }
        : null,
    ]),
  }));

  return urlset([...creatorUrls, ...brandUrls]);
}

export async function videos(): Promise<string> {
  const creators = await getAllCreators();
  return urlset(
    creators
      .filter((creator) => creator.showCaseContent?.some((item) => item.link || item.thumbnailUrl))
      .map((creator) => ({
        loc: creatorPath(creator),
        videos: (creator.showCaseContent || []).map((item) => ({
          thumbnailLoc: item.thumbnailUrl,
          title: item.title || `${creator.name || "Creator"} showcase video`,
          description: item.transcript || item.platform || creator.bio || "Creator showcase video",
          contentLoc: item.link,
          duration: item.duration,
          publicationDate: item.uploadDate || creator.updatedAt || creator.createdAt,
        })),
      })),
  );
}
