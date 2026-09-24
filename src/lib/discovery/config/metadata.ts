import { SITE_LANGUAGE, SITE_LOCALE, SITE_NAME, SITE_URL } from "./site";
import { DEFAULT_OG_IMAGE } from "./social";

export const ROOT_METADATA_CONFIG = {
  title: {
    default: "VidoraHub Studio | Creator and Brand Discovery",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Discover creator portfolios and brand profiles on VidoraHub Studio. Explore content niches, social platforms and locations to find potential collaboration partners.",
  keywords: ["VidoraHub Studio", "creator portfolios", "brand profiles", "creator discovery", "brand collaborations"],
  metadataBase: SITE_URL,
  openGraph: {
    title: "VidoraHub Studio | Creator and Brand Discovery",
    description: "Explore creator portfolios and brand profiles to find potential collaboration partners.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    locale: SITE_LOCALE.replace("_", "_"),
    type: "website" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "VidoraHub Studio | Creator and Brand Discovery",
    description:
      "Explore creator portfolios and brand profiles to find potential collaboration partners.",
    images: [DEFAULT_OG_IMAGE],
  },
  language: SITE_LANGUAGE,
};
