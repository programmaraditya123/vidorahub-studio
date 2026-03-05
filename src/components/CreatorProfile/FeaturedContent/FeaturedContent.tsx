"use client";

import styles from "./FeaturedContent.module.scss";
import Image from "next/image";
import { Eye } from "lucide-react";

type Content = {
  title: string;
  description: string;
  image: string;
  views: string;
  likes: string;
};

type Props = {
  content: Content[];
};

export default function FeaturedContent({ content }: Props) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Featured Content</h3>

      <div className={styles.grid}>
        {content.map((item, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className={styles.image}
              />
            </div>

            <div className={styles.body}>
              <h4>{item.title}</h4>

              <p>{item.description}</p>

              <div className={styles.stats}>
                <span>
                  <Eye size={14} /> {item.views}
                </span>

                <span>❤ {item.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}