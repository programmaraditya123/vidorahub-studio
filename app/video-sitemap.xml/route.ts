import { getAllCreators } from "@/lib/seo/data";
import { creatorPath } from "@/lib/seo/metadata";
import { urlset, xmlResponse } from "@/lib/seo/xml";

export const revalidate = 1800;

export async function GET() {
  const creators = await getAllCreators();
  return xmlResponse(
    urlset(
      creators
        .filter((creator) => creator.showCaseContent?.some((item) => item.link || item.thumbnailUrl))
        .map((creator) => ({
          loc: creatorPath(creator),
          videos: (creator.showCaseContent || []).map((item) => ({
            thumbnailLoc: item.thumbnailUrl,
            title: item.title || `${creator.name || "Creator"} showcase video`,
            description: item.transcript || item.platform || creator.bio || "Creator showcase video",
            contentLoc: item.link,
            duration: item.duration,
            publicationDate: item.uploadDate || creator.updatedAt || creator.createdAt,
          })),
        })),
    ),
  );
}
