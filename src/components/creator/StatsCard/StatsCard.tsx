"use client";

import styles from "./StatsCard.module.scss";

type StatsCardProps = {
  label: string;
  value: string;
};

export default function StatsCard({ label, value }: StatsCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <h3 className={styles.value}>{value}</h3>
    </div>
  );
}