import {
  INDEXABLE_CATEGORIES,
  INDEXABLE_CITIES,
  INDEXABLE_PLATFORMS,
  INDEXABLE_STATES,
} from "../config/seo";

export function collectionLinks(kind: "categories" | "platforms" | "cities" | "states"): string[] {
  const items = {
    categories: INDEXABLE_CATEGORIES,
    platforms: INDEXABLE_PLATFORMS,
    cities: INDEXABLE_CITIES,
    states: INDEXABLE_STATES,
  }[kind];

  return items.map((item) => `/${kind}/${item}`);
}
