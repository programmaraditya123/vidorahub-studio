import { getCreatorById } from "../search/entities";
import { extractObjectId } from "../urls/slug";
import { generateOgImage, type ImageResponseFactory } from "./image";

export async function creatorOgImage(slug: string, ImageResponse: ImageResponseFactory) {
  const id = extractObjectId(slug);
  const creator = id ? await getCreatorById(id) : null;
  const name = creator?.name || "VidoraHub Creator";
  const category = creator?.tags?.[0] || "Creator Portfolio";

  return generateOgImage(ImageResponse, {
    accent: "#2563eb",
    background: "#f8fafc",
    eyebrow: "VidoraHub Studio",
    title: name,
    subtitle: `${category} Creator ${creator?.location ? `in ${creator.location}` : ""}`,
  });
}
