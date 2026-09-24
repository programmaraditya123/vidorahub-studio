import type { CreatorEntity } from "../types";
import { publicUrl } from "../utils/evidence";
import styles from "./DiscoveryPage.module.scss";
export function CreatorSemanticEntityBlocks({ creator }: { creator: CreatorEntity }) {
  const location = creator.location || creator.city || creator.state;
  return <section className={styles.page} aria-label="Public creator information">
    <h2>About {creator.name || creator.username || "this creator"}</h2>
    {creator.bio && <p>{creator.bio}</p>}
    <dl>
      {location && <><dt>Location</dt><dd>{location}</dd></>}
      {!!creator.tags?.length && <><dt>Content categories</dt><dd>{creator.tags.join(", ")}</dd></>}
      {!!creator.languages?.length && <><dt>Languages</dt><dd>{creator.languages.join(", ")}</dd></>}
    </dl>
    {!!creator.platforms?.length && <><h3>Social profiles</h3><ul>{creator.platforms.filter(platform => publicUrl(platform.url)).map((platform, index) => <li key={index}><a href={publicUrl(platform.url)} rel="ugc nofollow">{platform.platform || "Social profile"}</a></li>)}</ul></>}
  </section>;
}
