import { POPULAR_SEARCHES, SITE_NAME, SITE_URL } from "@/lib/seo/constants";
import { textResponse } from "@/lib/seo/xml";

export function GET() {
  return textResponse(`# ${SITE_NAME} AI Crawl Guide

Purpose: help brands discover creators, help creators showcase portfolios, and help search or answer engines understand public creator and brand entities.

Entity model:
- Creator: name, bio, profile image, location, city, state, languages, categories, social platforms, audience metrics, showcase videos, previous collaborations.
- Brand: name, logo, category, location, bio, collaboration intent.
- Discovery entities: categories, platforms, cities, states and search pages.

Canonical URL rules:
- Creator profile: ${SITE_URL}/creator/{slug}-{objectId}
- Brand profile: ${SITE_URL}/brand/{slug}-{objectId}
- The slug is cosmetic. The ObjectId is the stable resolver. Old slugs redirect permanently to the current canonical URL.

Structured data:
- Homepage: WebSite, Organization, SearchAction.
- Creator profile: Person, ProfilePage, ImageObject, VideoObject, BreadcrumbList, FAQPage.
- Brand profile: Organization, Brand, ContactPoint, BreadcrumbList.
- Search and discovery pages: CollectionPage, SearchResultsPage, ItemList and internal links.

Popular query intents:
${POPULAR_SEARCHES.map((search) => `- ${search}`).join("\n")}

Crawl resources:
- ${SITE_URL}/robots.txt
- ${SITE_URL}/sitemap.xml
- ${SITE_URL}/creator-sitemap.xml
- ${SITE_URL}/brand-sitemap.xml
- ${SITE_URL}/image-sitemap.xml
- ${SITE_URL}/video-sitemap.xml
- ${SITE_URL}/rss.xml
- ${SITE_URL}/atom.xml
`);
}
