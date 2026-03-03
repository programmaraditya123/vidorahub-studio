"use client";

import Image from "next/image";
import styles from "./CreatorHeroCard.module.scss";
import { MapPin, Send, MessageCircle } from "lucide-react";

type CreatorHeroCardProps = {
  name: string;
  niche: string;
  location: string;
  bio: string;
  profileImage: string;
};

export default function CreatorHeroCard({
  name,
  niche,
  location,
  bio,
  profileImage,
}: CreatorHeroCardProps) {
  return (
    <div className={styles.pageWrapper}>
    <section className={styles.card}>
  <div className={styles.left}>
    <div className={styles.avatarWrapper}>
      <Image
        src={profileImage}
        alt={name}
        fill
        sizes="120px"
        className={styles.avatar}
      />
      <span className={styles.badge} />
    </div>
  </div>

  {/* CENTER CONTENT */}
  <div className={styles.content}>
    <h1 className={styles.name}>{name}</h1>
    <p className={styles.niche}>{niche}</p>

    <div className={styles.location}>
      <MapPin size={14} />
      <span>{location}</span>
    </div>

    <p className={styles.bio}>{bio}</p>
  </div>

  {/* RIGHT ACTIONS */}
  <div className={styles.actions}>
    <button className={styles.primaryBtn}>
      <Send size={16} />
      <span>Send Proposal</span>
    </button>

    <button className={styles.secondaryBtn}>
      <MessageCircle size={16} />
      <span>Message on IG</span>
    </button>

    <button className={styles.whatsappBtn}>
      <MessageCircle size={16} />
      <span>WhatsApp</span>
    </button>
  </div>
</section>
    </div>
  );
}