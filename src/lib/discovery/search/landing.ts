import { INDEXABLE_CATEGORIES, INDEXABLE_CITIES, INDEXABLE_PLATFORMS } from "../config/constants";
import { getAllCreators } from "./entities";
import { slugify } from "../utils/slugify";

export function resolveSearchLanding(segments: string[]) {
  const [category, city] = segments;
  if (segments.length === 1) {
    if (INDEXABLE_CATEGORIES.includes(category)) return { redirect: "/categories/" + category };
    if (INDEXABLE_CITIES.includes(category)) return { redirect: "/cities/" + category };
    const platform = category.replace(/-creators$/, "");
    if (INDEXABLE_PLATFORMS.includes(platform)) return { redirect: "/platforms/" + platform };
  }
  if (segments.length === 2 && INDEXABLE_CATEGORIES.includes(category) && INDEXABLE_CITIES.includes(city)) return { category, city };
  return null;
}

export async function searchLandingProfiles(category: string, city: string) {
  return (await getAllCreators()).filter(creator =>
    creator.tags?.some(tag => slugify(tag) === category) &&
    [creator.city, creator.location].some(value => value?.split(/[,|]/).some(part => slugify(part.trim()) === city)),
  );
}
