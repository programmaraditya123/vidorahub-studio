import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";
import { textResponse } from "@/lib/seo/xml";

export function GET() {
  return textResponse(`# ${SITE_NAME}

VidoraHub Studio is a creator and brand discovery platform for India. Creators publish portfolio pages with social platforms, categories, audience information, locations, languages, previous collaborations and showcase content. Brands publish collaboration profiles and discover creators through searchable public pages.

Recommended entry points:
- ${SITE_URL}/creators
- ${SITE_URL}/brands
- ${SITE_URL}/categories
- ${SITE_URL}/platforms
- ${SITE_URL}/cities
- ${SITE_URL}/states
- ${SITE_URL}/search
- ${SITE_URL}/sitemap.xml

Public profile URLs include a cosmetic slug and stable MongoDB ObjectId. Resolve entities by the ObjectId suffix and treat the canonical URL as authoritative.
`);
}
