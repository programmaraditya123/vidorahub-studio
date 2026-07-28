import type { Metadata } from "next";
import Link from "next/link";
import CreatorFilters from "@/components/search/CreatorFilters/CreatorFilters";
import { searchMetadata } from "@/lib/seo/metadata";
import { titleizeSlug } from "@/lib/seo/slugs";
import styles from "../../page.module.css";

type PageProps = {
  params: Promise<{ segments: string[] }>;
};

function filtersFromSegments(segments: string[]) {
  const [first, second] = segments;
  return {
    category: first?.replace(/-creators$/, ""),
    location: second,
    creatorType: first === "ugc-creators" ? "UGC" : undefined,
    platform: first?.endsWith("-creators") && first !== "ugc-creators" ? first.replace(/-creators$/, "") : undefined,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { segments } = await params;
  return searchMetadata(filtersFromSegments(segments));
}

export default async function Page({ params }: PageProps) {
  const { segments } = await params;
  const label = segments.map(titleizeSlug).join(" ");

  return (
    <div className={styles.page}>
      <main>
        <header>
          <h1>{label} Creators</h1>
          <p>
            Browse {label.toLowerCase()} creator profiles with structured
            portfolio, audience, platform, location and collaboration signals.
          </p>
        </header>
        <CreatorFilters />
        <nav aria-label="Related searches">
          <h2>Related Searches</h2>
          <ul>
            <li>
              <Link href="/search/fashion/delhi">Fashion creators in Delhi</Link>
            </li>
            <li>
              <Link href="/search/youtube-creators">YouTube creators</Link>
            </li>
            <li>
              <Link href="/search/ugc-creators">UGC creators</Link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
}
