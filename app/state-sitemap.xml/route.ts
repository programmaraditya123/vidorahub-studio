import { DISCOVERY_CACHE, Discovery, xmlResponse } from "@/lib/discovery";

export const revalidate = 86400;

export function GET() {
  return xmlResponse(Discovery.sitemap.states(), DISCOVERY_CACHE.collection);
}
