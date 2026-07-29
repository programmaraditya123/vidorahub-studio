import { Discovery, xmlResponse } from "@/lib/discovery";

export const revalidate = 1800;

export function GET() {
  return xmlResponse(Discovery.sitemap.generate());
}
