import type { BrandEntity, CreatorEntity } from "../types";
import { brandPath } from "./brand";
import { creatorPath } from "./creator";

export function creatorCanonicalRedirectPath(slug: string, creator: CreatorEntity): string | null {
  const canonicalPath = creatorPath(creator);
  return `/creator/${slug}` === canonicalPath ? null : canonicalPath;
}

export function brandCanonicalRedirectPath(slug: string, brand: BrandEntity): string | null {
  const canonicalPath = brandPath(brand);
  return `/brand/${slug}` === canonicalPath ? null : canonicalPath;
}
