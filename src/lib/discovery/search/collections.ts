import { cache } from "react";
import { notFound } from "next/navigation";
import { INDEXABLE_CATEGORIES, INDEXABLE_CITIES, INDEXABLE_PLATFORMS, INDEXABLE_STATES } from "../config/constants";
import { getAllBrands, getAllCreators } from "./entities";
import { brandPath } from "../urls/brand";
import { creatorPath } from "../urls/creator";
import { slugify, titleizeSlug } from "../utils/slugify";

export const collectionValues: Record<string, string[]> = {
  categories: INDEXABLE_CATEGORIES, platforms: INDEXABLE_PLATFORMS,
  cities: INDEXABLE_CITIES, states: INDEXABLE_STATES,
};

export function collectionTitle(kind: string, slug?: string) {
  if (slug) return titleizeSlug(slug) + " Creators";
  return ({ creators: "Creator Directory", brands: "Brand Directory", categories: "Creators by Category",
    platforms: "Creators by Platform", cities: "Creators by City", states: "Creators by State" } as Record<string, string>)[kind] || "Creator Directory";
}

export const getCollection = cache(async (kind: string, slug?: string) => {
  if (slug && !collectionValues[kind]?.includes(slug)) notFound();
  if (kind === "brands") {
    return (await getAllBrands()).map(brand => ({ name: brand.name || "Brand", path: brandPath(brand), description: brand.bio, location: brand.location }));
  }
  const creators = await getAllCreators();
  return creators.filter(creator => {
    if (!slug) return true;
    if (kind === "categories") return creator.tags?.some(tag => slugify(tag) === slug);
    if (kind === "platforms") return creator.platforms?.some(platform => slugify(platform.platform || "") === slug);
    const locations = kind === "cities" ? [creator.city, creator.location] : [creator.state, creator.location];
    return locations.some(value => value?.split(/[,|]/).some(part => slugify(part.trim()) === slug));
  }).map(creator => ({ name: creator.name || creator.username || "Creator", path: creatorPath(creator), description: creator.bio, location: creator.location || creator.city || creator.state }));
});
