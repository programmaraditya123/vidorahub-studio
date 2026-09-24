import type { Metadata } from "next";
import ProfileShell from "./ProfileShell";
export const metadata: Metadata = { title: "My Profile", robots: { index: false, follow: false } };
export default function Layout({ children }: { children: React.ReactNode }) { return <ProfileShell>{children}</ProfileShell>; }
