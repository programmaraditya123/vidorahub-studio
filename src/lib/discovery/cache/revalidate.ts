import { DISCOVERY_REVALIDATE_PATHS } from "../config/cache";
import { getBrandById, getCreatorById } from "../search/entities";
import { brandPath } from "../urls/brand";
import { creatorPath } from "../urls/creator";

type RevalidatePath = (path: string) => void;

export async function revalidateDiscoveryEntity(
  type: "creator" | "brand" | undefined,
  id: string | undefined,
  revalidatePath: RevalidatePath,
) {
  if (type === "creator" && id) {
    const creator = await getCreatorById(id);
    revalidatePath(`/creator/${id}`);
    if (creator) revalidatePath(creatorPath(creator));
  }

  if (type === "brand" && id) {
    const brand = await getBrandById(id);
    revalidatePath(`/brand/${id}`);
    if (brand) revalidatePath(brandPath(brand));
  }

  DISCOVERY_REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
  return DISCOVERY_REVALIDATE_PATHS;
}
