"use client";

import styles from "./Showcase.module.scss";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import ShowcaseModal from "../ShowcaseModal/ShowcaseModal";

const showcases = [
  {
    title: "Minimal Workspace 2024",
    platform: "YouTube",
    views: "1.2M views",
    image: "/showcase/workspace.jpg",
  },
  {
    title: "Tech Trend Analysis",
    platform: "TikTok",
    views: "450K views",
    image: "/showcase/tech.jpg",
  },
  {
    title: "The Rise of Retro Tech",
    platform: "Instagram",
    views: "280K views",
    image: "/showcase/retro.jpg",
  },
];

export default function Showcase() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3>Showcase Your Work</h3>

          <button
            className={styles.addBtn}
            onClick={() => setOpen(true)}
          >
            <Plus size={16} />
            Add New
          </button>
        </div>

        <div className={styles.grid}>
          {showcases.map((item, i) => (
            <div key={i} className={styles.card}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className={styles.image}
              />

              <button className={styles.delete}>
                <Trash2 size={16} />
              </button>

              <div className={styles.overlay}>
                <h4>{item.title}</h4>
                <p>
                  {item.platform} • {item.views}
                </p>
              </div>
            </div>
          ))}

          {/* ADD NEW CARD */}
          <div
            className={styles.addCard}
            onClick={() => setOpen(true)}
          >
            <Plus size={24} />
            <span>New Portfolio Item</span>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && <ShowcaseModal close={() => setOpen(false)} />}
    </>
  );
}

