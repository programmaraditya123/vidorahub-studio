import { DISCOVERY_CACHE, Discovery, xmlResponse } from "@/lib/discovery";

export const revalidate = 86400;

export async function GET() {
  return xmlResponse(await Discovery.sitemap.categories(), DISCOVERY_CACHE.collection);
}
