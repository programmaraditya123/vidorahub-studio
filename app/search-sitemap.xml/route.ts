import { INDEXABLE_CATEGORIES, INDEXABLE_CITIES, INDEXABLE_PLATFORMS } from "@/lib/seo/constants";
import { urlset, xmlResponse } from "@/lib/seo/xml";

export const revalidate = 86400;

export function GET() {
  const paths = [
    "/search",
    ...INDEXABLE_CATEGORIES.slice(0, 8).map((category) => `/search/${category}`),
    ...INDEXABLE_PLATFORMS.map((platform) => `/search/${platform}-creators`),
    ...INDEXABLE_CITIES.slice(0, 8).map((city) => `/search/${city}`),
    ...INDEXABLE_CATEGORIES.slice(0, 6).flatMap((category) =>
      INDEXABLE_CITIES.slice(0, 6).map((city) => `/search/${category}/${city}`),
    ),
    "/search/ugc-creators",
  ];

  return xmlResponse(
    urlset(paths.map((loc) => ({ loc, changefreq: "weekly", priority: loc === "/search" ? 0.8 : 0.7 }))),
    86400,
  );
}
