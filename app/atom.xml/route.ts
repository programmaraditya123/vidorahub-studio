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
  const updated = new Date().toISOString();
  const entries = [
    ...creators.map((creator) => ({
      title: creator.name || "Creator",
      link: creatorPath(creator),
      updated: creator.updatedAt || creator.createdAt || updated,
      summary: creator.bio || "Creator profile on VidoraHub Studio.",
    })),
    ...brands.slice(0, 100).map((brand) => ({
      title: brand.name || "Brand",
      link: brandPath(brand),
      updated: brand.updatedAt || brand.createdAt || updated,
      summary: brand.bio || "Brand profile on VidoraHub Studio.",
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_NAME}</title>
  <id>${SITE_URL}/</id>
  <updated>${updated}</updated>
  <link href="${SITE_URL}/atom.xml" rel="self" />
  <link href="${SITE_URL}/" />
  ${entries
    .map(
      (entry) => `<entry>
    <title>${esc(entry.title)}</title>
    <id>${SITE_URL}${entry.link}</id>
    <link href="${SITE_URL}${entry.link}" />
    <updated>${new Date(entry.updated).toISOString()}</updated>
    <summary>${esc(entry.summary)}</summary>
  </entry>`,
    )
    .join("\n")}
</feed>`;

  return textResponse(body, "application/atom+xml; charset=utf-8");
}
