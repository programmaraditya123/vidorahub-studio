import { Discovery, textResponse } from "@/lib/discovery";

export const revalidate = 1800;

export async function GET() {
  return textResponse(await Discovery.rss.generate(), "application/rss+xml; charset=utf-8");
}
