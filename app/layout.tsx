import Navbar from "@/components/Home/Navbar/Navbar";
import "./globals.css";
import { AuthProvider } from "@/Context/AuthContext";
import { ToastProvider } from "@/hooks/ToastProvider";
import ReduxProvider from "@/store/provider";
import type { Metadata, Viewport } from "next";
import { homepageMetadata, JsonLd, websiteJsonLd } from "@/lib/discovery";

export const metadata: Metadata = homepageMetadata();

export const viewport: Viewport = {
  themeColor: "#111827",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={websiteJsonLd()} />
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <ReduxProvider>{children}</ReduxProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
