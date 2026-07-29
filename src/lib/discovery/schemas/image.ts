export function imageJsonLd(name: string, contentUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name,
    contentUrl,
  };
}
