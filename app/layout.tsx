 
import Navbar from "@/components/Home/Navbar/Navbar";
import "./globals.css";
import { ToastProvider } from "@/hooks/ToastProvider";
import { AuthProvider } from "@/Context/AuthContext";
import ReduxProvider from "@/store/provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "VidoraHub Studio – Creator Dashboard & Video Management Platform",
    template: "%s | VidoraHub Studio",
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

  metadataBase: new URL("https://studio.vidorahub.com"),

  openGraph: {
    title: "VidoraHub Studio – Creator Dashboard",
    description:
      "Upload videos, manage content, and collaborate with brands on VidoraHub Studio.",
    url: "https://studio.vidorahub.com",
    siteName: "VidoraHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VidoraHub Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "VidoraHub Studio – Creator Dashboard",
    description:
      "The ultimate studio for creators to upload videos, manage content, and collaborate with brands.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <ToastProvider>
        <Navbar/>
        <ReduxProvider>
        {children}
        </ReduxProvider>
        </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
