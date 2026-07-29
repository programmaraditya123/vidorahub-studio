import { SITE_NAME, SITE_URL } from "../config/seo";
import { getAllBrands, getAllCreators } from "../search/entities";
import { brandPath } from "../urls/brand";
import { creatorPath } from "../urls/creator";
import { escapeFeedText } from "../utils/sanitize";

export async function rss(): Promise<string> {
  const [creators, brands] = await Promise.all([getAllCreators(100), getAllBrands()]);
  const items = [
    ...creators.map((creator) => ({
      title: `${creator.name || "Creator"} joined VidoraHub Studio`,
      link: creatorPath(creator),
      date: creator.createdAt || creator.updatedAt,
      description: creator.bio || `${creator.name || "Creator"} creator profile.`,
    })),
    ...brands.slice(0, 100).map((brand) => ({
      title: `${brand.name || "Brand"} on VidoraHub Studio`,
      link: brandPath(brand),
      date: brand.createdAt || brand.updatedAt,
      description: brand.bio || `${brand.name || "Brand"} brand profile.`,
    })),
  ].sort((a, b) => Date.parse(b.date || "0") - Date.parse(a.date || "0"));

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>Newest creators and brands on VidoraHub Studio.</description>
    ${items
      .map(
        (item) => `<item>
      <title>${escapeFeedText(item.title)}</title>
      <link>${SITE_URL}${item.link}</link>
      <guid>${SITE_URL}${item.link}</guid>
      ${item.date ? `<pubDate>${new Date(item.date).toUTCString()}</pubDate>` : ""}
      <description>${escapeFeedText(item.description)}</description>
    </item>`,
      )
      .join("\n")}
  </channel>
</rss>`;
}

export async function atom(): Promise<string> {
  const [creators, brands] = await Promise.all([getAllCreators(100), getAllBrands()]);
  const updated = new Date().toISOString();
  const entries = [
    ...creators.map((creator) => ({
      title: creator.name || "Creator",
      link: creatorPath(creator),
      updated: creator.updatedAt || creator.createdAt || updated,
      summary: creator.bio || "Creator profile on VidoraHub Studio.",
    })),
    ...brands.slice(0, 100).map((brand) => ({
      title: brand.name || "Brand",
      link: brandPath(brand),
      updated: brand.updatedAt || brand.createdAt || updated,
      summary: brand.bio || "Brand profile on VidoraHub Studio.",
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_NAME}</title>
  <id>${SITE_URL}/</id>
  <updated>${updated}</updated>
  <link href="${SITE_URL}/atom.xml" rel="self" />
  <link href="${SITE_URL}/" />
  ${entries
    .map(
      (entry) => `<entry>
    <title>${escapeFeedText(entry.title)}</title>
    <id>${SITE_URL}${entry.link}</id>
    <link href="${SITE_URL}${entry.link}" />
    <updated>${new Date(entry.updated).toISOString()}</updated>
    <summary>${escapeFeedText(entry.summary)}</summary>
  </entry>`,
    )
    .join("\n")}
</feed>`;
}
