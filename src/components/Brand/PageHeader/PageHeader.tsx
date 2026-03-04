"use client";

import styles from "./PageHeader.module.scss";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <h1>{title}</h1>

      {subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}
    </div>
  );
}