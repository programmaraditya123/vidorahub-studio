"use client";

import styles from "./CreatorCard.module.scss";
import { MapPin, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { platformConfig } from "@/components/utils/platformConfig";
import { memo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Platform = {
  platform: string;
  audience: number;
};

type Props = {
  id: string;
  name: string;
  avatar: string;
  niche: string;
  location: string;
  platforms: Platform[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatAudience(num: number): string {
  if (!num && num !== 0) return "—";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}

// ─── Platform Row ─────────────────────────────────────────────────────────────

const PlatformRow = memo(function PlatformRow({ p }: { p: Platform }) {
  const config = platformConfig[p.platform];
  if (!config) return null;
  const Icon = config.icon;

  return (
    <div className={styles.platform}>
      <div className={styles.platformLeft}>
        <span className={styles.platformIcon}>
          {config.isImage ? (
            <Image src={Icon} alt={p.platform} width={15} height={15} />
          ) : (
            <Icon size={15} />
          )}
        </span>
        <span className={styles.platformName}>{p.platform}</span>
      </div>
      <span className={styles.platformAudience}>{formatAudience(p.audience)}</span>
    </div>
  );
});

// ─── Main Card ────────────────────────────────────────────────────────────────

const CreatorCard = memo(function CreatorCard({
  id,
  name,
  avatar,
  niche,
  location,
  platforms,
}: Props) {
  return (
    <article className={styles.card}>
      {/* Top accent bar */}
      <div className={styles.accentBar} />

      {/* Header: avatar + niche tag */}
      <div className={styles.header}>
        <div className={styles.avatarWrap}>
          <Image
            src={avatar}
            alt={`${name} avatar`}
            width={60}
            height={60}
            className={styles.avatar}
          />
          <span className={styles.verifiedBadge} title="Verified creator">
            <ShieldCheck size={13} />
          </span>
        </div>

        <span className={styles.tag}>{niche}</span>
      </div>

      {/* Name */}
      <div className={styles.meta}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.location}>
          <MapPin size={12} />
          {location}
        </p>
      </div>

      {/* Divider */}
      <hr className={styles.divider} />

      {/* Platforms */}
      <div className={styles.platforms}>
        {platforms?.slice(0, 4).map((p, i) => (
          <PlatformRow key={i} p={p} />
        ))}
        {(platforms?.length ?? 0) > 4 && (
          <p className={styles.morePlatforms}>+{platforms.length - 4} more</p>
        )}
      </div>

      {/* CTA */}
      <Link href={`/creator/${id}`} className={styles.button}>
        View Profile
      </Link>
    </article>
  );
});

export default CreatorCard;