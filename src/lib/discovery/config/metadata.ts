import { SITE_LANGUAGE, SITE_LOCALE, SITE_NAME, SITE_URL } from "./site";
import { DEFAULT_OG_IMAGE } from "./social";

export const ROOT_METADATA_CONFIG = {
  title: {
    default: "VidoraHub Studio - Creator Dashboard & Video Management Platform",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "VidoraHub Studio is a powerful creator dashboard to upload videos, manage content, collaborate with brands, and grow your audience. Built for modern creators.",
  keywords: [
    "VidoraHub Studio",
    "creator dashboard",
    "video creator platform",
    "creator brand marketplace",
    "video sharing platform",
    "content creator tools",
    "creator monetization",
    "youtube alternative",
    "creator brand collaborations",
    "influencer marketplace",
  ],
  metadataBase: SITE_URL,
  openGraph: {
    title: "VidoraHub Studio - Creator Dashboard",
    description: "Upload videos, manage content, and collaborate with brands on VidoraHub Studio.",
    url: SITE_URL,
    siteName: "VidoraHub",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    locale: SITE_LOCALE.replace("_", "_"),
    type: "website" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "VidoraHub Studio - Creator Dashboard",
    description:
      "The ultimate studio for creators to upload videos, manage content, and collaborate with brands.",
    images: [DEFAULT_OG_IMAGE],
  },
  language: SITE_LANGUAGE,
};
