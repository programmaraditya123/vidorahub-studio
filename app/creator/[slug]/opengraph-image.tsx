import { ImageResponse } from "next/og";
import { Discovery, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/discovery";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  return Discovery.og.creator(slug, ImageResponse);
}
