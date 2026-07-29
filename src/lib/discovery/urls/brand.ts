import type { BrandEntity } from "../types";
import { buildEntitySlug } from "./slug";

export function brandPath(brand: BrandEntity): string {
  return `/brand/${buildEntitySlug(brand.name, brand._id)}`;
}
