import { SITE_NAME, SITE_URL } from "../config/seo";
import type { CreatorEntity } from "../types";
import { absoluteUrl } from "../urls/canonical";
import { creatorPath } from "../urls/creator";

export function creatorJsonLd(creator: CreatorEntity) {
  const url = absoluteUrl(creatorPath(creator));
  const name = creator.name || creator.username || "Creator";
  const sameAs = (creator.platforms || []).map((platform) => platform.url).filter(Boolean);
  const breadcrumbs = [
    { name: "Home", item: SITE_URL },
    { name: "Creators", item: absoluteUrl("/creators") },
    ...(creator.tags?.[0]
      ? [{ name: creator.tags[0], item: absoluteUrl(`/categories/${creator.tags[0]}`) }]
      : []),
    { name, item: url },
  ];

  return [
    {
      "@context": "https://schema.org",
      "@type": ["Person", "ProfilePage"],
      "@id": `${url}#creator`,
      name,
      url,
      image: creator.profilePicUrl,
      description: creator.bio,
      jobTitle: `${creator.tags?.[0] || "Content"} Creator`,
      address: creator.location,
      knowsLanguage: creator.languages,
      knowsAbout: creator.tags,
      sameAs,
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `Who is ${name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${name} is a ${creator.tags?.join(", ") || "content"} creator on ${SITE_NAME}.`,
          },
        },
        {
          "@type": "Question",
          name: `Why collaborate with ${name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${name} shares creator portfolio details, audience platforms, niches, location and collaboration history for brand evaluation.`,
          },
        },
      ],
    },
    ...(creator.showCaseContent || []).map((item) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: item.title || `${name} showcase video`,
      thumbnailUrl: item.thumbnailUrl,
      uploadDate: item.uploadDate || creator.updatedAt || creator.createdAt,
      description: item.transcript || item.platform || creator.bio,
      contentUrl: item.link,
      duration: item.duration,
    })),
  ];
}
