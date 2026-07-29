import Link from "next/link";
import {
  INDEXABLE_CATEGORIES,
  INDEXABLE_CITIES,
  INDEXABLE_PLATFORMS,
  INDEXABLE_STATES,
} from "../config/seo";
import { titleizeSlug } from "../utils/slugify";

type Props = {
  kind: "creators" | "brands" | "categories" | "platforms" | "cities" | "states";
  slug?: string;
};

const related = {
  creators: INDEXABLE_CATEGORIES.map((item) => `/categories/${item}`),
  brands: INDEXABLE_CATEGORIES.map((item) => `/categories/${item}`),
  categories: INDEXABLE_CATEGORIES.map((item) => `/categories/${item}`),
  platforms: INDEXABLE_PLATFORMS.map((item) => `/platforms/${item}`),
  cities: INDEXABLE_CITIES.map((item) => `/cities/${item}`),
  states: INDEXABLE_STATES.map((item) => `/states/${item}`),
};

export default function CollectionPage({ kind, slug }: Props) {
  const label = slug ? titleizeSlug(slug) : titleizeSlug(kind);
  const singular = kind.replace(/s$/, "");
  const searchHref =
    kind === "categories"
      ? `/search?category=${encodeURIComponent(label)}`
      : kind === "platforms"
        ? `/search?platform=${encodeURIComponent(label)}`
        : kind === "cities"
          ? `/search?location=${encodeURIComponent(label)}`
          : "/search";

  return (
    <main>
      <header>
        <h1>{label} Creators and Brands</h1>
        <p>
          Discover {label.toLowerCase()} creator profiles, brand collaboration opportunities, social
          platforms, locations and portfolio signals on VidoraHub Studio.
        </p>
      </header>

      <section>
        <h2>Find {label} Profiles</h2>
        <p>
          VidoraHub Studio structures each public {singular} page as an entity with canonical URLs,
          metadata, JSON-LD, breadcrumbs, social profiles, audience details and collaboration
          context for search engines and AI assistants.
        </p>
        <Link href={searchHref}>Browse matching profiles</Link>
      </section>

      <section>
        <h2>Popular Segments</h2>
        <ul>
          {related[kind].map((path) => (
            <li key={path}>
              <Link href={path}>{titleizeSlug(path.split("/").pop() || "")}</Link>
            </li>
          ))}
        </ul>
      </section>

      <nav aria-label="Entity relationships">
        <h2>Related Discovery Pages</h2>
        <ul>
          <li>
            <Link href="/creators">Creators</Link>
          </li>
          <li>
            <Link href="/brands">Brands</Link>
          </li>
          <li>
            <Link href="/categories">Categories</Link>
          </li>
          <li>
            <Link href="/platforms">Platforms</Link>
          </li>
          <li>
            <Link href="/cities">Cities</Link>
          </li>
          <li>
            <Link href="/states">States</Link>
          </li>
        </ul>
      </nav>

      {slug && (
        <section>
          <h2>Answer Summary</h2>
          <p>
            {label} is an indexable VidoraHub Studio entity page for discovering creators and
            brands. It connects public profiles to categories, platforms, cities, states and search
            pages using crawlable internal links.
          </p>
        </section>
      )}
    </main>
  );
}
