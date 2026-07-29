import { absoluteUrl } from "../urls/canonical";

export function itemListJsonLd(name: string, urls: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: urls.map((url, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(url),
    })),
  };
}
