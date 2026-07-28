import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";
import { textResponse } from "@/lib/seo/xml";

export function GET() {
  return textResponse(
    JSON.stringify({
      name: SITE_NAME,
      short_name: "VidoraHub",
      description: "Creator portfolio and brand collaboration discovery platform.",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#111827",
      icons: [
        {
          src: `${SITE_URL}/favicon.ico`,
          sizes: "48x48",
          type: "image/x-icon",
        },
      ],
    }),
    "application/manifest+json; charset=utf-8",
  );
}
