import { Discovery, textResponse } from "@/lib/discovery";

export function GET() {
  return textResponse(Discovery.robots.security());
}
