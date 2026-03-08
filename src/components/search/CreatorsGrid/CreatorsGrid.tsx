"use client";

import CreatorCard from "../CreatorCard/CreatorCard";
import styles from "./CreatorsGrid.module.scss";

type Props = {
  creators: any[];
  total: number;
  loadMore: () => void;
  loading: boolean;
};

export default function CreatorsGrid({
  creators,
  total,
  loadMore,
  loading,
}: Props) {

  return (
    <section className={styles.wrapper}>

      <div className={styles.header}>
        <h2>Recommended Creators</h2>
        <p>Showing {total} creators</p>
      </div>

      <div className={styles.grid}>
        {creators.map((creator) => (
          <CreatorCard
            id={creator._id}
            key={creator._id}
            name={creator.name}
            avatar={creator.profilePicUrl}
            niche={creator.tags?.[0]}
            location={creator.location}
            platforms={creator.platforms}
          />
        ))}
      </div>

      <div className={styles.loadMore}>
        <button onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More Creators"}
        </button>
      </div>

    </section>
  );
}