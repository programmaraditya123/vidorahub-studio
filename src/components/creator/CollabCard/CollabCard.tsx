"use client";

import styles from "./CollabCard.module.scss";

type CollabCardProps = {
  brand: string;
  title: string;
  description: string;
  thumbnail: string;
};

export default function CollabCard({
  brand,
  title,
  description,
  thumbnail,
}: CollabCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        <img src={thumbnail} alt={title} />
      </div>

      <div className={styles.content}>
        <span className={styles.brand}>{brand}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}