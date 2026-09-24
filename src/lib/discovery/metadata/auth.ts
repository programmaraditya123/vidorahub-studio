import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "../config/social";
function authMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, robots: { index: false, follow: true }, alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] } };
}
export function loginMetadata() { return authMetadata("Login", "Log in to manage your creator or brand profile on VidoraHub Studio.", "/login"); }
export function signupMetadata() { return authMetadata("Create an Account", "Create a creator or brand account on VidoraHub Studio.", "/signup"); }
