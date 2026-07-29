import type { CreatorEntity } from "../types";
import { buildEntitySlug } from "./slug";

export function creatorPath(creator: CreatorEntity): string {
  return `/creator/${buildEntitySlug(creator.username || creator.name, creator._id)}`;
}
