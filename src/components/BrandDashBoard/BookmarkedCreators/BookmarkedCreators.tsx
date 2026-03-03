"use client";

import styles from "./BookmarkedCreators.module.scss";
import { Bookmark, Plus } from "lucide-react";

type Creator = {
  id: number;
  name: string;
  username: string;
  subs: string;
  er: string;
  image: string;
};

const creators: Creator[] = [
  {
    id: 1,
    name: "Elena Wild",
    username: "@elenawild_",
    subs: "1.2M Subs",
    er: "8.4% ER",
    image: "/avatar1.jpg",
  },
  {
    id: 2,
    name: "Tech Bro Joe",
    username: "@techjoe_reviews",
    subs: "450K Subs",
    er: "12.1% ER",
    image: "/avatar2.jpg",
  },
  {
    id: 3,
    name: "Maya Style",
    username: "@maya_stylist",
    subs: "2.8M Subs",
    er: "4.2% ER",
    image: "/avatar3.jpg",
  },
  {
    id: 4,
    name: "Nomad Nick",
    username: "@nick_adventures",
    subs: "125K Subs",
    er: "15.8% ER",
    image: "/avatar4.jpg",
  },
];

export default function BookmarkedCreators() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Bookmarked Creators</h2>

        {/* <div className={styles.actions}>
          <button className={styles.iconBtn}>≡</button>
          <button className={styles.iconBtn}>☰</button>
        </div> */}
      </div>

      <div className={styles.grid}>
        {creators.map((creator) => (
          <div key={creator.id} className={styles.card}>
            <Bookmark size={16} className={styles.bookmark} />

            <div className={styles.avatarWrapper}>
              <img src={creator.image} alt={creator.name} />
            </div>

            <h3>{creator.name}</h3>
            <p className={styles.username}>{creator.username}</p>

            <div className={styles.stats}>
              <span>{creator.subs}</span>
              <span className={styles.er}>{creator.er}</span>
            </div>
          </div>
        ))}

        {/* Find More Card */}
        <div className={styles.findMore}>
          <Plus size={28} />
          <p>Find More</p>
        </div>
      </div>
    </section>
  );
}