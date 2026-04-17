"use client";

import styles from "./FeaturedCreators.module.scss";
import Image from "next/image";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import { useGetAllCreatorsQuery } from "@/store/api/creatorApi";
import vidoraicon from "../../../../app/favicon.ico";
import { useMemo, memo } from "react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CreatorPlatform {
  platform: string;
  audience: string | number;
}

interface CreatorData {
  _id?: string;
  id?: string;
  name?: string;
  bio?: string;
  profilePicUrl?: string;
  tags?: string[];
  platforms?: CreatorPlatform[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getPlatform(platforms: CreatorPlatform[] | undefined, name: string) {
  return platforms?.find((p) => p.platform === name)?.audience;
}

// audience can be a number (e.g. 12000) or a string (e.g. "12K") from the API
function formatAudience(value: string | number | undefined): string {
  if (value === undefined || value === null || value === "") return "";
  const num = typeof value === "number" ? value : parseInt(String(value).replace(/[^0-9]/g, ""), 10);
  if (isNaN(num)) return String(value);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={`${styles.imageBox} ${styles.shimmer}`} />
      <div className={styles.content}>
        <div className={`${styles.skeletonLine} ${styles.shimmer}`} style={{ width: "60%", height: 14 }} />
        <div className={`${styles.skeletonLine} ${styles.shimmer}`} style={{ width: "90%", height: 10, marginTop: 6 }} />
        <div className={`${styles.skeletonLine} ${styles.shimmer}`} style={{ width: "75%", height: 10, marginTop: 4 }} />
        <div className={`${styles.skeletonLine} ${styles.shimmer}`} style={{ width: "100%", height: 28, marginTop: 14, borderRadius: 999 }} />
      </div>
    </div>
  );
}

// ─── Creator Card ─────────────────────────────────────────────────────────────

const CreatorCard = memo(function CreatorCard({
  creator,
  priority,
}: {
  creator: CreatorData;
  priority: boolean;
}) {
  const socials = useMemo(() => {
    const p = creator.platforms;
    return {
      instagram: getPlatform(p, "Instagram"),
      youtube: getPlatform(p, "YouTube"),
      linkedin: getPlatform(p, "LinkedIn"),
      facebook: getPlatform(p, "Facebook"),
      vidorahub: getPlatform(p, "VidoraHub"),
    };
  }, [creator.platforms]);

  const tag = creator.tags?.[0] || "CREATOR";
  const bio = (creator.bio?.length ?? 0) > 72
    ? creator.bio!.slice(0, 72).trimEnd() + "…"
    : creator.bio;
  

  const Router = useRouter()
  const handleNavigate = () => {
    const path =  `/creator/${creator._id ?? creator.id}`
    Router.push(path);

  }

  return (
    <article className={styles.card} onClick={handleNavigate}>
      <div className={styles.imageBox}>
        <Image
          src={creator.profilePicUrl || "/creators/default.jpg"}
          alt={`${creator.name} profile photo`}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1400px) 25vw, 20vw"
          className={styles.image}
          priority={priority}
          quality={80}
        />
        <span className={styles.tag}>{tag}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{creator.name}</h3>
        {bio && <p className={styles.bio}>{bio}</p>}

        <ul className={styles.socials} aria-label="Social platforms">
          {socials.instagram && (
            <li>
              <Instagram size={12} aria-label="Instagram" />
              <span>{formatAudience(socials.instagram)}</span>
            </li>
          )}
          {socials.youtube && (
            <li>
              <Youtube size={12} aria-label="YouTube" />
              <span>{formatAudience(socials.youtube)}</span>
            </li>
          )}
          {socials.linkedin && (
            <li>
              <Linkedin size={12} aria-label="LinkedIn" />
              <span>{formatAudience(socials.linkedin)}</span>
            </li>
          )}
          {socials.facebook && (
            <li>
              <Facebook size={12} aria-label="Facebook" />
              <span>{formatAudience(socials.facebook)}</span>
            </li>
          )}
          {socials.vidorahub && (
            <li>
              <Image src={vidoraicon} alt="VidoraHub" width={12} height={12} />
              <span>{formatAudience(socials.vidorahub)}</span>
            </li>
          )}
        </ul>

        <Link href={`/creator/${creator._id ?? creator.id}`} className={styles.profileLink}>
          View Profile
        </Link>
      </div>
    </article>
  );
});

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FeaturedCreators() {
  const { data, isLoading, isError } = useGetAllCreatorsQuery({
    page: 1,
    limit: 10,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const creators = (data?.creators || []) as any[];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Featured Creators</h2>
          <p className={styles.subtitle}>Discover the top trending voices on VidoraHub</p>
        </div>
        <Link href="/search" className={styles.viewAll}>
          View All <span aria-hidden="true">→</span>
        </Link>
      </div>

      {isError && (
        <p className={styles.errorMsg} role="alert">
          Failed to load creators. Please try again.
        </p>
      )}

      <div className={styles.grid} aria-busy={isLoading}>
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : creators.map((creator, i) => (
              <CreatorCard
                key={creator._id ?? creator.id ?? i}
                creator={creator}
                priority={i < 4}
              />
            ))}
      </div>
    </section>
  );
}