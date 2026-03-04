"use client";

import styles from "./SocialAudience.module.scss";
import { ExternalLink, Instagram, Facebook, Youtube } from "lucide-react";
import { useState } from "react";
import AddPlatformModal from "../AddPlatformModal/AddPlatformModal";

const platforms = [
  {
    name: "Instagram",
    followers: "128.4K",
    icon: Instagram,
    link: "#",
  },
  {
    name: "Youtube",
    followers: "2.1M",
    icon: Youtube,
    link: "#",
  },
  {
    name: "TikTok",
    followers: "850K",
    icon: Facebook,
    link: "#",
  },
];

export default function SocialAudience() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3>Social & Audience</h3>

          <button
            className={styles.addBtn}
            onClick={() => setOpen(true)}
          >
            Add Platform
          </button>
        </div>

        <div className={styles.grid}>
          {platforms.map((p, i) => {
            const Icon = p.icon;

            return (
              <div key={i} className={styles.card}>
                <div className={styles.top}>
                  <Icon size={24} />

                  <a href={p.link} target="_blank">
                    <ExternalLink size={18} />
                  </a>
                </div>

                <h2>{p.followers}</h2>
                <p>{p.name} Followers</p>
              </div>
            );
          })}
        </div>
      </div>

      {open && <AddPlatformModal close={() => setOpen(false)} />}
    </>
  );
}