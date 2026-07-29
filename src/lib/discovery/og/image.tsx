import type { ReactElement } from "react";
import { OG_IMAGE_SIZE } from "../config/social";

type OgImageInput = {
  accent: string;
  background: string;
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type ImageResponseFactory = new (
  element: ReactElement,
  options: { width: number; height: number },
) => Response;

export function generateOgImage(ImageResponse: ImageResponseFactory, input: OgImageInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: input.background,
          color: "#111827",
          fontFamily: "Arial",
        }}
      >
        <div style={{ fontSize: 28, color: input.accent }}>{input.eyebrow}</div>
        <div style={{ fontSize: 78, fontWeight: 700, marginTop: 28 }}>{input.title}</div>
        <div style={{ fontSize: 36, marginTop: 16 }}>{input.subtitle}</div>
      </div>
    ),
    OG_IMAGE_SIZE,
  );
}
