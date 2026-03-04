"use client";

import styles from "./BrandProfileCard.module.scss";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { useState } from "react";
import EditBrandModal from "../EditBrandModal/EditBrandModal";

export default function BrandProfileCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.card}>
        {/* EDIT BUTTON */}
        <button
          className={styles.editBtn}
          onClick={() => setOpen(true)}
        >
          <Pencil size={14} />
          Edit
        </button>

        {/* WATERMARK ICON */}
        <div className={styles.watermark}></div>

        <div className={styles.content}>
          <div className={styles.logo}>
            <Image
              src="/brand-logo.png"
              alt="brand"
              width={64}
              height={64}
            />
          </div>

          <h2>VidoraHub Studio</h2>

          <p className={styles.category}>
            Creative Media & Digital Production
          </p>

          <p className={styles.description}>
            VidoraHub is a premier boutique production house specializing in
            high-impact visual storytelling and cross-platform digital
            experiences. We bridge the gap between cinematic artistry and
            cutting-edge technology.
          </p>

          <div className={styles.badges}>
            <span className={styles.established}>
              Established 2024
            </span>

            <span className={styles.verified}>
              Verified Brand
            </span>
          </div>
        </div>
      </div>

      {open && <EditBrandModal close={() => setOpen(false)} />}
    </>
  );
}
