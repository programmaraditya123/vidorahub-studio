import { getBrandById } from "../search/entities";
import { extractObjectId } from "../urls/slug";
import { generateOgImage, type ImageResponseFactory } from "./image";

export async function brandOgImage(slug: string, ImageResponse: ImageResponseFactory) {
  const id = extractObjectId(slug);
  const brand = id ? await getBrandById(id) : null;
  const name = brand?.name || "VidoraHub Brand";
  const category = brand?.category || "Brand Collaboration";

  return generateOgImage(ImageResponse, {
    accent: "#c2410c",
    background: "#fff7ed",
    eyebrow: "VidoraHub Studio",
    title: name,
    subtitle: `${category} Brand Profile`,
  });
}
