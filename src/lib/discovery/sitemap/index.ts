import { getAllBrands, getAllCreators } from "../search/entities";
import { getCollection, collectionValues } from "../search/collections";
import { searchLandingProfiles } from "../search/landing";
import { INDEXABLE_CATEGORIES, INDEXABLE_CITIES } from "../config/constants";
import { brandPath } from "../urls/brand";
import { creatorPath } from "../urls/creator";
import { publicUrl } from "../utils/evidence";
import { sitemapIndex, urlset } from "./generator";

export const SITEMAP_INDEX_PATHS = ["/page-sitemap.xml", "/creator-sitemap.xml", "/brand-sitemap.xml", "/category-sitemap.xml", "/platform-sitemap.xml", "/city-sitemap.xml", "/state-sitemap.xml", "/search-sitemap.xml", "/image-sitemap.xml"];
export function generate() { return sitemapIndex(SITEMAP_INDEX_PATHS); }
export async function pages() {
  const urls = ["/", "/search"];
  for (const kind of ["creators", "brands", "categories", "platforms", "cities", "states"]) {
    if ((await getCollection(kind)).length) urls.push("/" + kind);
  }
  return urlset(urls.map(loc => ({ loc })));
}
export async function creators() {
  return urlset((await getAllCreators()).map(creator => ({ loc: creatorPath(creator), lastmod: creator.updatedAt || creator.createdAt })));
}
export async function brands() {
  return urlset((await getAllBrands()).map(brand => ({ loc: brandPath(brand), lastmod: brand.updatedAt || brand.createdAt })));
}
async function collection(kind: string) {
  const urls: { loc: string }[] = [];
  for (const slug of collectionValues[kind]) {
    if ((await getCollection(kind, slug)).length) urls.push({ loc: "/" + kind + "/" + slug });
  }
  return urlset(urls);
}
export const categories = () => collection("categories");
export const platforms = () => collection("platforms");
export const cities = () => collection("cities");
export const states = () => collection("states");
export async function search() {
  const urls: { loc: string }[] = [];
  for (const category of INDEXABLE_CATEGORIES) {
    for (const city of INDEXABLE_CITIES) {
      if ((await searchLandingProfiles(category, city)).length) urls.push({ loc: "/search/" + category + "/" + city });
    }
  }
  return urlset(urls);
}
export async function images() {
  const [creators, brands] = await Promise.all([getAllCreators(), getAllBrands()]);
  const entries = [
    ...creators.map(creator => ({ loc: creatorPath(creator), images: [creator.profilePicUrl, creator.coverImageUrl].map(publicUrl).filter((loc): loc is string => !!loc).map(loc => ({ loc })) })),
    ...brands.map(brand => ({ loc: brandPath(brand), images: [brand.logoUrl || brand.profilePicUrl].map(publicUrl).filter((loc): loc is string => !!loc).map(loc => ({ loc })) })),
  ];
  return urlset(entries.filter(entry => entry.images.length));
}
// Showcase items are outbound links, not playable videos on these profile pages.
// Keep this legacy endpoint valid, but do not advertise it until watch pages exist.
export async function videos() { return urlset([]); }
