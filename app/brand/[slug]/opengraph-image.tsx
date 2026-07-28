import { ImageResponse } from "next/og";
import { getBrandById } from "@/lib/seo/data";
import { extractObjectId } from "@/lib/seo/slugs";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const id = extractObjectId(slug);
  const brand = id ? await getBrandById(id) : null;
  const name = brand?.name || "VidoraHub Brand";
  const category = brand?.category || "Brand Collaboration";

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
          background: "#fff7ed",
          color: "#111827",
          fontFamily: "Arial",
        }}
      >
        <div style={{ fontSize: 28, color: "#c2410c" }}>VidoraHub Studio</div>
        <div style={{ fontSize: 78, fontWeight: 700, marginTop: 28 }}>{name}</div>
        <div style={{ fontSize: 36, marginTop: 16 }}>{category} Brand Profile</div>
      </div>
    ),
    size,
  );
}
