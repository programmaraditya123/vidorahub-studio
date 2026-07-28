import { SITE_NAME, SITE_URL } from "./constants";
import { brandPath, creatorPath } from "./metadata";
import { BrandEntity, CreatorEntity } from "./types";

function absolute(path?: string): string | undefined {
  if (!path) return undefined;
  try {
    return new URL(path, SITE_URL).toString();
  } catch {
    return undefined;
  }
}

export function creatorJsonLd(creator: CreatorEntity) {
  const url = absolute(creatorPath(creator));
  const name = creator.name || creator.username || "Creator";
  const sameAs = (creator.platforms || []).map((platform) => platform.url).filter(Boolean);
  const breadcrumbs = [
    { name: "Home", item: SITE_URL },
    { name: "Creators", item: absolute("/creators") },
    ...(creator.tags?.[0]
      ? [{ name: creator.tags[0], item: absolute(`/categories/${creator.tags[0]}`) }]
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

export function brandJsonLd(brand: BrandEntity) {
  const url = absolute(brandPath(brand));
  const name = brand.name || "Brand";

  return [
    {
      "@context": "https://schema.org",
      "@type": ["Organization", "Brand"],
      "@id": `${url}#brand`,
      name,
      url,
      image: brand.profilePicUrl || brand.logoUrl,
      logo: brand.logoUrl || brand.profilePicUrl,
      description: brand.bio,
      address: brand.location,
      industry: brand.category,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "creator collaborations",
        url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Brands", item: absolute("/brands") },
        { "@type": "ListItem", position: 3, name, item: url },
      ],
    },
  ];
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?name={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function itemListJsonLd(name: string, urls: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: urls.map((url, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absolute(url),
    })),
  };
}
