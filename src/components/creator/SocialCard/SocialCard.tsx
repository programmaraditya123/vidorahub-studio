"use client";

import styles from "./SocialCard.module.scss";

type SocialCardProps = {
  platform: string;
  value: string;
  icon: React.ReactNode;
  href?: string;
};

export default function SocialCard({
  platform,
  value,
  icon,
  href,
}: SocialCardProps) {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      target="_blank"
      className={styles.card}
    >
      <div className={styles.icon}>{icon}</div>

      <div className={styles.text}>
        <span className={styles.platform}>{platform}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </Wrapper>
  );
}