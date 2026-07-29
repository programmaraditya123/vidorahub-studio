import { SITE_NAME, SITE_URL } from "../config/seo";
import type { BrandEntity } from "../types";
import { absoluteUrl } from "../urls/canonical";
import { brandPath } from "../urls/brand";

export function brandJsonLd(brand: BrandEntity) {
  const url = absoluteUrl(brandPath(brand));
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
        { "@type": "ListItem", position: 2, name: "Brands", item: absoluteUrl("/brands") },
        { "@type": "ListItem", position: 3, name, item: url },
      ],
    },
  ];
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  };
}
