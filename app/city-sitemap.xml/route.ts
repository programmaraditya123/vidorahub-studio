import { INDEXABLE_CITIES } from "@/lib/seo/constants";
import { urlset, xmlResponse } from "@/lib/seo/xml";

export const revalidate = 86400;

export function GET() {
  return xmlResponse(
    urlset(
      ["/cities", ...INDEXABLE_CITIES.map((city) => `/cities/${city}`)].map((loc) => ({
        loc,
        changefreq: "weekly",
        priority: loc === "/cities" ? 0.7 : 0.8,
      })),
    ),
    86400,
  );
}
