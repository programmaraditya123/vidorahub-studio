"use client";

import styles from "./ProfileCard.module.scss";
import Image from "next/image";
import { useState } from "react";
import { Pencil } from "lucide-react";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

export default function ProfileCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.avatarBox}>
            <Image
              src="/avatar.png"
              alt="avatar"
              width={84}
              height={84}
              className={styles.avatar}
            />
          </div>

          <div className={styles.info}>
            <div className={styles.nameRow}>
              <h2>VidoraHub Studio</h2>
              <span className={styles.badge}>Creator</span>
            </div>

            <p className={styles.bio}>
              Digital creator focusing on high-end tech reviews and cinematic
              storytelling. Helping brands connect with global tech audiences.
            </p>

            <div className={styles.tags}>
              <span>Tech</span>
              <span>Cinematography</span>
              <span>Reviews</span>
              <span>London, UK</span>
            </div>
          </div>
        </div>

        <button className={styles.editBtn} onClick={() => setOpen(true)}>
          <Pencil size={14} />
          Edit Profile
        </button>
      </div>

      {open && <EditProfileModal close={() => setOpen(false)} />}
    </>
  );
}
 



