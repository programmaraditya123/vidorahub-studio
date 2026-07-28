import { textResponse } from "@/lib/seo/xml";

export function GET() {
  return textResponse(`VidoraHub Studio
Site: https://studio.vidorahub.com
Purpose: creator portfolios, brand discovery and collaboration search.
Standards: semantic HTML, canonical URLs, JSON-LD, sitemaps, RSS, Atom, llms.txt.
`);
}
