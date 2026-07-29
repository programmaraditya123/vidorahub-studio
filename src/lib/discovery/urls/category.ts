import { slugify } from "../utils/slugify";

export function categoryPath(slug?: string): string {
  return slug ? `/categories/${slugify(slug)}` : "/categories";
}
