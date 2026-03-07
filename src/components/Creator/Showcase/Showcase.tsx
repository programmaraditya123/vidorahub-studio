"use client";

import styles from "./Showcase.module.scss";
import Image from "next/image";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { useState } from "react";
import ShowcaseModal from "../ShowcaseModal/ShowcaseModal";
import { useDeleteShowcaseContentMutation } from "@/store/api/creatorApi";
import { formatAudience } from "@/components/utils/gloablFunctions";

export type ShowcaseItem = {
  _id: string;
  title: string;
  platform: string;
  views: string;
  image: string;
  link: string;
  thumbnailUrl: string;
};

type Props = {
  data: ShowcaseItem[];
};

export default function Showcase({ data }: Props) {
  const [open, setOpen] = useState(false);

  const [deleteShowcase, { isLoading }] =
    useDeleteShowcaseContentMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteShowcase(id).unwrap();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3>Showcase Your Work</h3>

          <button className={styles.addBtn} onClick={() => setOpen(true)}>
            <Plus size={16} />
            Add New
          </button>
        </div>

        <div className={styles.grid}>
          {data?.map((item) => (
            <div key={item._id} className={styles.card}>
              <Image
                src={item.thumbnailUrl}
                alt={item.title}
                fill
                className={styles.image}
              />

              {/* DELETE */}
              <button
                className={styles.delete}
                disabled={isLoading}
                onClick={() => handleDelete(item._id)}
              >
                <Trash2 size={16} />
              </button>

              {/* VISIT BUTTON */}
              <a
                href={item.link}
                target="_blank"
                className={styles.visitBtn}
              >
                <ExternalLink size={16} />
                Visit Content
              </a>

              {/* OVERLAY */}
              <div className={styles.overlay}>
                <h4>{item.title}</h4>
                <p>
                  {item.platform} • {formatAudience(item.views)}
                </p>
              </div>
            </div>
          ))}

          {/* ADD CARD */}
          <div className={styles.addCard} onClick={() => setOpen(true)}>
            <Plus size={24} />
            <span>New Portfolio Item</span>
          </div>
        </div>
      </div>

      {open && <ShowcaseModal close={() => setOpen(false)} />}
    </>
  );
}