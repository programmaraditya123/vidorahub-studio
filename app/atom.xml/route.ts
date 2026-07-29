import { Discovery, textResponse } from "@/lib/discovery";

export const revalidate = 1800;

export async function GET() {
  return textResponse(await Discovery.rss.atom(), "application/atom+xml; charset=utf-8");
}
