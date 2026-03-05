"use client";

import styles from "./CreatorProfileCard.module.scss";
import Image from "next/image";
import {
  MapPin,
  Send,
  Instagram,
  MessageSquare,
  Users,
  Youtube,
  TrendingUp,
} from "lucide-react";

export default function CreatorProfileCard() {
  return (
    <div className={styles.card}>
      {/* Avatar */}

      <div className={styles.avatarWrapper}>
        <Image
          src="/creator.png"
          alt="creator"
          width={110}
          height={110}
          className={styles.avatar}
        />

        <span className={styles.online}></span>
      </div>

      {/* Name */}

      <h2 className={styles.name}>Alex Rivers</h2>

      <p className={styles.role}>Tech & Lifestyle Creator</p>

      <p className={styles.location}>
        <MapPin size={14} /> San Francisco, CA
      </p>

      <p className={styles.bio}>
        Helping brands reach Gen-Z through authentic storytelling,
        high-end cinematography, and deep-tech reviews.
      </p>

      {/* Proposal Button */}

      <button className={styles.proposalBtn}>
        <Send size={16} />
        Send Proposal
      </button>

      {/* Social Links */}

      <div className={styles.links}>
        <button className={styles.linkBtn}>
          <Instagram size={16} />
          Instagram Portfolio
        </button>

        <button className={styles.linkBtn}>
          <MessageSquare size={16} />
          WhatsApp Business
        </button>
      </div>

      {/* Stats */}

      <div className={styles.stats}>
        <div className={styles.stat}>
          <Users size={18} />
          <div>
            <span>IG FOLLOWERS</span>
            <strong>120K</strong>
          </div>
        </div>

        <div className={styles.stat}>
          <Youtube size={18} />
          <div>
            <span>YT SUBS</span>
            <strong>85K</strong>
          </div>
        </div>

        <div className={styles.stat}>
          <TrendingUp size={18} />
          <div>
            <span>ENG. RATE</span>
            <strong>4.2%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}