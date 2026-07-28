import { getAllBrands } from "@/lib/seo/data";
import { brandPath } from "@/lib/seo/metadata";
import { urlset, xmlResponse } from "@/lib/seo/xml";

export const revalidate = 1800;

export async function GET() {
  const brands = await getAllBrands();
  return xmlResponse(
    urlset(
      brands.map((brand) => ({
        loc: brandPath(brand),
        lastmod: brand.updatedAt || brand.createdAt,
        changefreq: "daily",
        priority: 0.8,
      })),
    ),
  );
}
