"use client";

import styles from "./BrandExperience.module.scss";

type Experience = {
  brand: string;
  campaignType: string;
  duration: string;
  status: "completed" | "ongoing";
};

type BrandExperienceProps = {
  experiences: Experience[];
};

export default function BrandExperience({
  experiences,
}: BrandExperienceProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Brand Experience</h2>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>Brand</span>
          <span>Campaign Type</span>
          <span>Duration</span>
          <span>Status</span>
        </div>

        {experiences.map((item, index) => (
          <div key={index} className={styles.row}>
            <span className={styles.brand}>{item.brand}</span>
            <span>{item.campaignType}</span>
            <span>{item.duration}</span>
            <span
              className={`${styles.status} ${
                item.status === "completed"
                  ? styles.completed
                  : styles.ongoing
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}