import Link from "next/link";
import HomeClient from "./HomeClient";
import { homepageMetadata } from "@/lib/discovery/metadata/homepage";
import styles from "@/lib/discovery/components/DiscoveryPage.module.scss";
export const metadata = homepageMetadata();
export default function Page() {
  return <HomeClient><section className={styles.page} aria-labelledby="discovery-questions">
    <h2 id="discovery-questions">Finding creators and brands</h2>
    <h3>What is VidoraHub Studio?</h3>
    <p>VidoraHub Studio helps people discover public creator portfolios and brand profiles for potential collaborations.</p>
    <h3>How do I find a creator?</h3>
    <p>Use creator search to filter by name, niche and location. Review the profile information and social links the creator has shared.</p>
    <h3>Where can I browse brand profiles?</h3>
    <p>The brand directory links to public brand profiles, including descriptions, categories and locations when available.</p>
    <nav aria-label="Explore VidoraHub"><ul className={styles.links}>{["creators", "brands", "categories", "platforms", "cities", "states"].map(kind => <li key={kind}><Link href={"/" + kind}>{kind.charAt(0).toUpperCase() + kind.slice(1)}</Link></li>)}</ul></nav>
  </section></HomeClient>;
}
