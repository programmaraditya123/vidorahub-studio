import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import CreatorFilters from "@/components/search/CreatorFilters/CreatorFilters";
import { resolveSearchLanding, searchLandingProfiles } from "@/lib/discovery/search/landing";
import { titleizeSlug } from "@/lib/discovery/utils/slugify";
import { creatorPath } from "@/lib/discovery/urls/creator";
import { absoluteUrl } from "@/lib/discovery/urls/canonical";
import { DEFAULT_OG_IMAGE } from "@/lib/discovery/config/social";
import styles from "@/lib/discovery/components/DiscoveryPage.module.scss";

type Props = { params: Promise<{ segments: string[] }> };
async function resolve(params: Props["params"]) {
  const { segments } = await params;
  const landing = resolveSearchLanding(segments);
  if (!landing) notFound();
  if (landing.redirect) permanentRedirect(landing.redirect);
  const category = landing.category!;
  const city = landing.city!;
  return { category, city, profiles: await searchLandingProfiles(category, city), path: "/search/" + category + "/" + city,
    title: titleizeSlug(category) + " Creators in " + titleizeSlug(city) };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title, path, profiles } = await resolve(params);
  const description = "Browse public profiles for " + title.toLowerCase() + " on VidoraHub Studio.";
  return { title, description, alternates: { canonical: path }, robots: { index: profiles.length > 0, follow: true },
    openGraph: { title, description, url: absoluteUrl(path), images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] } };
}
export default async function Page({ params }: Props) {
  const { title, category, city, profiles } = await resolve(params);
  return <main className={styles.page}><h1>{title}</h1>
    <p>Review the niches, locations and portfolios members have shared to find potential collaboration partners.</p>
    <ul className={styles.links}>{profiles.map(creator => <li key={creator._id}><Link href={creatorPath(creator)}>{creator.name || creator.username || "Creator"}</Link></li>)}</ul>
    {!profiles.length && <p>No matching public profiles are currently listed.</p>}
    <Suspense fallback={<p>Loading search controls?</p>}><CreatorFilters key={category + city} initialFilters={{ niche: titleizeSlug(category), location: titleizeSlug(city) }} /></Suspense>
  </main>;
}
