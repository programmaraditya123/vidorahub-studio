import { INDEXABLE_STATES } from "@/lib/seo/constants";
import { urlset, xmlResponse } from "@/lib/seo/xml";

export const revalidate = 86400;

export function GET() {
  return xmlResponse(
    urlset(
      ["/states", ...INDEXABLE_STATES.map((state) => `/states/${state}`)].map((loc) => ({
        loc,
        changefreq: "weekly",
        priority: loc === "/states" ? 0.7 : 0.8,
      })),
    ),
    86400,
  );
}
