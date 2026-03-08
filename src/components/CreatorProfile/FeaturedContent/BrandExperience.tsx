"use client";

import styles from "./FeaturedContent.module.scss";

type Collaboration = {
  title: string;
  description: string;
};

type Props = {
  brandExperienceTitle?: string;
  brands?: string[];
  collaborationsTitle?: string;
  collaborations?: Collaboration[];
};

export default function BrandExperience({
  brandExperienceTitle,
  brands,
  collaborationsTitle,
  collaborations,
}: Props) {
  return (
    <div className={styles.brandBox}>
      
      {/* Brand Experience */}

      {brandExperienceTitle && <h3>{brandExperienceTitle}</h3>}

      {brands && brands.length > 0 && (
        <div className={styles.brandLogos}>
          {brands.map((brand, i) => (
            <span key={i}>{brand}</span>
          ))}
        </div>
      )}

      {/* Collaborations */}

      {collaborations && collaborations.length > 0 && (
        <div className={styles.collab}>
          
          {collaborationsTitle && <h4>{collaborationsTitle}</h4>}

          {collaborations.map((item, i) => (
            <div key={i} className={styles.collabItem}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}