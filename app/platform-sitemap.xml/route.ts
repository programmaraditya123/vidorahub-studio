import { INDEXABLE_PLATFORMS } from "@/lib/seo/constants";
import { urlset, xmlResponse } from "@/lib/seo/xml";

export const revalidate = 86400;

export function GET() {
  return xmlResponse(
    urlset(
      ["/platforms", ...INDEXABLE_PLATFORMS.map((platform) => `/platforms/${platform}`)].map(
        (loc) => ({ loc, changefreq: "weekly", priority: loc === "/platforms" ? 0.7 : 0.8 }),
      ),
    ),
    86400,
  );
}
