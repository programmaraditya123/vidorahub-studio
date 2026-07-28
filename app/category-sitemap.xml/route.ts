import { INDEXABLE_CATEGORIES } from "@/lib/seo/constants";
import { urlset, xmlResponse } from "@/lib/seo/xml";

export const revalidate = 86400;

export function GET() {
  return xmlResponse(
    urlset(
      ["/categories", ...INDEXABLE_CATEGORIES.map((category) => `/categories/${category}`)].map(
        (loc) => ({ loc, changefreq: "weekly", priority: loc === "/categories" ? 0.7 : 0.8 }),
      ),
    ),
    86400,
  );
}
