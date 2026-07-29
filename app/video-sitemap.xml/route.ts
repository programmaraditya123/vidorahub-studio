import { Discovery, xmlResponse } from "@/lib/discovery";

export const revalidate = 1800;

export async function GET() {
  return xmlResponse(await Discovery.sitemap.videos());
}
