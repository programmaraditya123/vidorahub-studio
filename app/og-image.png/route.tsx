import { ImageResponse } from "next/og";
import { generateOgImage } from "@/lib/discovery/og/image";

export function GET() {
  return generateOgImage(ImageResponse, {
    accent: "#7c3aed",
    background: "#f5f3ff",
    eyebrow: "CREATORS · BRANDS · COLLABORATIONS",
    title: "VidoraHub Studio",
    subtitle: "Discover creators. Explore brand partnerships.",
  });
}
