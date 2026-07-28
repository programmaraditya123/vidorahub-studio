import { getAllBrands, getAllCreators } from "@/lib/seo/data";
import { brandPath, creatorPath } from "@/lib/seo/metadata";
import { urlset, xmlResponse } from "@/lib/seo/xml";

export const revalidate = 1800;

export async function GET() {
  const [creators, brands] = await Promise.all([getAllCreators(), getAllBrands()]);
  const creatorUrls = creators.map((creator) => ({
    loc: creatorPath(creator),
    images: [
      creator.profilePicUrl && {
        loc: creator.profilePicUrl,
        title: `${creator.name || "Creator"} profile photo`,
        caption: `${creator.name || "Creator"} creator profile on VidoraHub Studio`,
      },
      creator.coverImageUrl && {
        loc: creator.coverImageUrl,
        title: `${creator.name || "Creator"} cover image`,
      },
    ].filter(Boolean) as { loc: string; title?: string; caption?: string }[],
  }));
  const brandUrls = brands.map((brand) => ({
    loc: brandPath(brand),
    images: [
      (brand.logoUrl || brand.profilePicUrl) && {
        loc: brand.logoUrl || brand.profilePicUrl || "",
        title: `${brand.name || "Brand"} logo`,
        caption: `${brand.name || "Brand"} brand profile on VidoraHub Studio`,
      },
    ].filter(Boolean) as { loc: string; title?: string; caption?: string }[],
  }));

  return xmlResponse(urlset([...creatorUrls, ...brandUrls]));
}
