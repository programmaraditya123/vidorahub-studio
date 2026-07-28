import Link from "next/link";
import { POPULAR_SEARCHES } from "@/lib/seo/constants";
import { CreatorEntity } from "@/lib/seo/types";
import { slugify } from "@/lib/seo/slugs";

type Props = {
  creator: CreatorEntity;
};

export function CreatorSemanticEntityBlocks({ creator }: Props) {
  const name = creator.name || creator.username || "This creator";
  const category = creator.tags?.[0] || "content";
  const location = creator.location || creator.city || creator.state || "India";
  const platforms = creator.platforms?.map((platform) => platform.platform).filter(Boolean);

  return (
    <aside aria-label="Creator entity details">
      <section>
        <h2>About Creator</h2>
        <p>
          {name} is a {category} creator based in {location}. Brands can review
          this portfolio to understand audience platforms, content niches,
          collaboration experience and brand fit.
        </p>
      </section>

      <section>
        <h2>Social Platforms</h2>
        <ul>
          {(platforms?.length ? platforms : ["Instagram", "YouTube"]).map((platform) => (
            <li key={platform}>
              <Link href={`/platforms/${slugify(platform)}`}>{platform}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Content Categories</h2>
        <ul>
          {(creator.tags?.length ? creator.tags : [category]).map((tag) => (
            <li key={tag}>
              <Link href={`/categories/${slugify(tag)}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Location</h2>
        <p>
          <Link href={`/cities/${slugify(location)}`}>{location}</Link>
        </p>
      </section>

      <section>
        <h2>Why Collaborate</h2>
        <p>
          {name} can be evaluated for campaigns by niche, language, location,
          platform mix, audience size and previous brand collaborations.
        </p>
      </section>

      <nav aria-label="Popular creator searches">
        <h2>Popular Searches</h2>
        <ul>
          {POPULAR_SEARCHES.slice(0, 8).map((search) => (
            <li key={search}>
              <Link href={`/search?name=${encodeURIComponent(search)}`}>{search}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
