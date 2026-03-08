"use client";

import styles from "./CreatorCard.module.scss";
import { MapPin, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { platformConfig } from "@/components/utils/platformConfig";

type Platform = {
  platform: string;
  audience: number;
};

type Props = {
  id : string
  name: string;
  avatar: string;
  niche: string;
  location: string;
  platforms: Platform[];
};

/* audience formatter */

function formatAudience(num: number) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num?.toString();
}

export default function CreatorCard({
  id,
  name,
  avatar,
  niche,
  location,
  platforms,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Image
          src={avatar}
          alt={name}
          width={56}
          height={56}
          className={styles.avatar}
        />

        <span className={styles.tag}>{niche}</span>
      </div>

      <h3 className={styles.name}>
        {name}
        <CheckCircle size={16} className={styles.verify} />
      </h3>

      <p className={styles.location}>
        <MapPin size={14} />
        {location}
      </p>

      <div className={styles.platforms}>
        {platforms?.map((p, i) => {
          const config = platformConfig[p.platform];

          if (!config) return null;

          const Icon = config.icon;

          return (
            <div key={i} className={styles.platform}>
              <div className={styles.platformLeft}>
                {config.isImage ? (
                  <Image src={Icon} alt={p.platform} width={16} height={16} />
                ) : (
                  <Icon size={16} />
                )}

                <span>{p.platform}</span>
              </div>

              <strong>{formatAudience(p.audience)}</strong>
            </div>
          );
        })}
      </div>

      <Link href={`/creator/${id}`}>
        <button className={styles.button}>View Profile</button>
      </Link>
    </div>
  );
}