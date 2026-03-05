"use client";

import styles from "./CreatorCard.module.scss";
import { MapPin, CheckCircle, Instagram, Youtube, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Platform = {
  name: "Instagram" | "TikTok" | "YouTube";
  followers: string;
};

type Props = {
  name: string;
  avatar: string;
  niche: string;
  location: string;
  platforms: Platform[];
};

/* icon mapping */

const platformIcons = {
  Instagram: Instagram,
  TikTok: Music,
  YouTube: Youtube,
};

export default function CreatorCard({
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
        {platforms.map((p) => {
          const Icon = platformIcons[p.name];

          return (
            <div key={p.name} className={styles.platform}>
              <div className={styles.platformLeft}>
                <Icon size={16} />
                <span>{p.name}</span>
              </div>

              <strong>{p.followers}</strong>
            </div>
          );
        })}
      </div>
     <Link href={`/creator/${name}`}>
      <button className={styles.button}>View Profile</button>
      </Link>
    </div>
  );
}