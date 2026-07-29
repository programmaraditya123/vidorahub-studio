import type { Metadata } from "next";

export function dashboardMetadata(): Metadata {
  return {
    title: "Dashboard",
    robots: { index: false, follow: false },
  };
}
