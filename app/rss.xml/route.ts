import { getAllBrands, getAllCreators } from "@/lib/seo/data";
import { brandPath, creatorPath } from "@/lib/seo/metadata";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";
import { textResponse } from "@/lib/seo/xml";

export const revalidate = 1800;

function esc(value: unknown): string {
  return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const [creators, brands] = await Promise.all([getAllCreators(100), getAllBrands()]);
  const items = [
    ...creators.map((creator) => ({
      title: `${creator.name || "Creator"} joined VidoraHub Studio`,
      link: creatorPath(creator),
      date: creator.createdAt || creator.updatedAt,
      description: creator.bio || `${creator.name || "Creator"} creator profile.`,
    })),
    ...brands.slice(0, 100).map((brand) => ({
      title: `${brand.name || "Brand"} on VidoraHub Studio`,
      link: brandPath(brand),
      date: brand.createdAt || brand.updatedAt,
      description: brand.bio || `${brand.name || "Brand"} brand profile.`,
    })),
  ].sort((a, b) => Date.parse(b.date || "0") - Date.parse(a.date || "0"));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>Newest creators and brands on VidoraHub Studio.</description>
    ${items
      .map(
        (item) => `<item>
      <title>${esc(item.title)}</title>
      <link>${SITE_URL}${item.link}</link>
      <guid>${SITE_URL}${item.link}</guid>
      ${item.date ? `<pubDate>${new Date(item.date).toUTCString()}</pubDate>` : ""}
      <description>${esc(item.description)}</description>
    </item>`,
      )
      .join("\n")}
  </channel>
</rss>`;

  return textResponse(body, "application/rss+xml; charset=utf-8");
}
