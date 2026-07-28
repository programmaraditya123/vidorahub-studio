import { getAllCreators } from "@/lib/seo/data";
import { creatorPath } from "@/lib/seo/metadata";
import { urlset, xmlResponse } from "@/lib/seo/xml";

export const revalidate = 1800;

export async function GET() {
  const creators = await getAllCreators();
  return xmlResponse(
    urlset(
      creators.map((creator) => ({
        loc: creatorPath(creator),
        lastmod: creator.updatedAt || creator.createdAt,
        changefreq: "daily",
        priority: 0.9,
      })),
    ),
  );
}
