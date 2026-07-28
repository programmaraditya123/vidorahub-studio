import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { brandPath, creatorPath } from "@/lib/seo/metadata";
import { getBrandById, getCreatorById } from "@/lib/seo/data";

const sitemapPaths = [
  "/sitemap.xml",
  "/creator-sitemap.xml",
  "/brand-sitemap.xml",
  "/category-sitemap.xml",
  "/platform-sitemap.xml",
  "/city-sitemap.xml",
  "/state-sitemap.xml",
  "/search-sitemap.xml",
  "/image-sitemap.xml",
  "/video-sitemap.xml",
  "/rss.xml",
  "/atom.xml",
  "/llms.txt",
  "/llms-full.txt",
];

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false, message: "Invalid revalidation secret" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const type = body.type as "creator" | "brand" | undefined;
  const id = body.id as string | undefined;

  if (type === "creator" && id) {
    const creator = await getCreatorById(id);
    revalidatePath(`/creator/${id}`);
    if (creator) revalidatePath(creatorPath(creator));
  }

  if (type === "brand" && id) {
    const brand = await getBrandById(id);
    revalidatePath(`/brand/${id}`);
    if (brand) revalidatePath(brandPath(brand));
  }

  sitemapPaths.forEach((path) => revalidatePath(path));
  return Response.json({ ok: true, revalidated: { type, id, paths: sitemapPaths } });
}
