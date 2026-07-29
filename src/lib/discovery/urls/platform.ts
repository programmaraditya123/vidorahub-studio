import { slugify } from "../utils/slugify";

export function platformPath(slug?: string): string {
  return slug ? `/platforms/${slugify(slug)}` : "/platforms";
}
