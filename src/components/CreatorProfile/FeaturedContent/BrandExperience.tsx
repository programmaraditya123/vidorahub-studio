"use client";

import styles from "./FeaturedContent.module.scss";

export default function BrandExperience() {
  return (
    <div className={styles.brandBox}>
      <h3>Brand Experience</h3>

      <div className={styles.brandLogos}>
        <span>TECHNI</span>
        <span>LUMINA</span>
        <span>CORE</span>
        <span>VIVID</span>
      </div>

      <div className={styles.collab}>
        <h4>Previous Collaborations</h4>

        <div className={styles.collabItem}>
          <strong>Lumina Smart Home (2023)</strong>
          <p>
            Product launch campaign resulting in 15% conversion lift
            on TikTok.
          </p>
        </div>

        <div className={styles.collabItem}>
          <strong>Techni Gear Pro (2024)</strong>
          <p>
            Long-term brand ambassadorship and monthly video reviews.
          </p>
        </div>
      </div>
    </div>
  );
}