import Link from "next/link";
import { getCollection, collectionTitle, collectionValues } from "../search/collections";
import { titleizeSlug } from "../utils/slugify";
import { itemListJsonLd } from "../schemas/search";
import JsonLd from "./JsonLd";
import styles from "./DiscoveryPage.module.scss";

type Props = { kind: "creators" | "brands" | "categories" | "platforms" | "cities" | "states"; slug?: string };

export default async function CollectionPage({ kind, slug }: Props) {
  const profiles = await getCollection(kind, slug);
  const title = collectionTitle(kind, slug);
  return <main className={styles.page}>
    <h1>{title}</h1>
    <p>Browse public {kind === "brands" ? "brand" : "creator"} profiles on VidoraHub Studio. Review the information each member has shared before choosing a collaboration partner.</p>
    {profiles.length > 0 ? <>
      <JsonLd data={itemListJsonLd(title, profiles.map(profile => profile.path))} />
      <ul className={styles.grid}>{profiles.map(profile => <li key={profile.path}>
        <h2><Link href={profile.path}>{profile.name}</Link></h2>
        {profile.location && <p>{profile.location}</p>}
        {profile.description && <p>{profile.description}</p>}
      </li>)}</ul>
    </> : <p>No matching public profiles are currently listed. Explore another category or location.</p>}
    {collectionValues[kind] && <nav aria-label="Browse more groups"><h2>Explore more</h2><ul className={styles.links}>
      {collectionValues[kind].map(value => <li key={value}><Link href={"/" + kind + "/" + value}>{titleizeSlug(value)}</Link></li>)}
    </ul></nav>}
    <nav aria-label="Discovery directories"><ul className={styles.links}>
      {["creators", "brands", "categories", "platforms", "cities", "states"].map(value => <li key={value}><Link href={"/" + value}>{titleizeSlug(value)}</Link></li>)}
      <li><Link href="/search">Search creators</Link></li>
    </ul></nav>
  </main>;
}
