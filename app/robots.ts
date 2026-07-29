import type { MetadataRoute } from "next";
import { Discovery } from "@/lib/discovery";

export default function robots(): MetadataRoute.Robots {
  return Discovery.robots.generate();
}
