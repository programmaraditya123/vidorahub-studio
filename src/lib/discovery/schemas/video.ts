export function videoJsonLd(input: {
  name: string;
  description?: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  contentUrl?: string;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    ...input,
  };
}
