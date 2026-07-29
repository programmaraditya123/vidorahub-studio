import type { Metadata } from "next";

export function loginMetadata(): Metadata {
  return {
    title: "Login - VidoraHub Studio",
    description:
      "Login to VidoraHub Studio to upload videos, manage your creator profile, collaborate with brands, and grow your audience on VidoraHub.",
    keywords: [
      "VidoraHub login",
      "creator login",
      "video creator dashboard login",
      "VidoraHub studio login",
      "creator brand marketplace login",
    ],
    robots: {
      index: false,
      follow: false,
    },
  };
}

export function signupMetadata(): Metadata {
  return {
    title: "Create Your Creator Account - VidoraHub Studio",
    description:
      "Sign up for VidoraHub Studio and start your journey as a creator. Upload videos, manage your content, collaborate with brands, and grow your audience on the VidoraHub creator platform.",
    keywords: [
      "VidoraHub signup",
      "create creator account",
      "video creator platform signup",
      "creator brand marketplace",
      "influencer platform signup",
      "creator collaboration platform",
      "youtube alternative for creators",
    ],
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: "Create Your Creator Account - VidoraHub Studio",
      description: "Join VidoraHub Studio to upload videos, collaborate with brands, and grow as a creator.",
      url: "https://studio.vidorahub.com/signup",
      siteName: "VidoraHub",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "VidoraHub Studio Creator Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Create Your Creator Account - VidoraHub Studio",
      description: "Start creating, uploading videos, and collaborating with brands on VidoraHub.",
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: "https://studio.vidorahub.com/signup",
    },
  };
}
