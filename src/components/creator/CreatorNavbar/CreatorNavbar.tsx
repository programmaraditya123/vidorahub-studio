"use client";

import Image from "next/image";
import styles from "./CreatorNavbar.module.scss";
import { Share2 } from "lucide-react";

type CreatorNavbarProps = {
  profileImage: string;
  onShare?: () => void;
};

export default function CreatorNavbar({
  profileImage,
  onShare,
}: CreatorNavbarProps) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logoIcon}>VidoraHub</div>
        {/* <span className={styles.logoIcon}>VidoraHub</span> */}
      </div>

      <div className={styles.right}>
        <button className={styles.shareBtn} onClick={onShare}>
          <Share2 size={16} />
          <span>Share Profile</span>
        </button>

        <div className={styles.avatar}>
          <Image
            src={profileImage}
            alt="Creator Avatar"
            fill
            sizes="40px"
          />
        </div>
      </div>
    </nav>
  );
}