import { DISCOVERY_CACHE, Discovery, xmlResponse } from "@/lib/discovery";

export const revalidate = 86400;

export async function GET() {
  return xmlResponse(await Discovery.sitemap.search(), DISCOVERY_CACHE.collection);
}
