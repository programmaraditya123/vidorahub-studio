"use client";

import styles from "./SavedCreators.module.scss";
import { Search, Bookmark } from "lucide-react";

export default function SavedCreators() {
  return (
    <section className={styles.wrapper}>
      
      {/* Top Controls */}
      <div className={styles.topBar}>
        <div className={styles.searchBox}>
          <Search size={16} />
          <input placeholder="Search within saved..." />
        </div>

        <div className={styles.sort}>
          <span>Sort By:</span>
          <select>
            <option>Recently Saved</option>
            <option>Engagement Rate</option>
            <option>Followers</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.card}>
            <Bookmark size={16} className={styles.bookmark} />

            <div className={styles.avatar}></div>

            <h3>Alex Rivera</h3>
            <p className={styles.location}>San Francisco, CA</p>

            <div className={styles.tags}>
              <span>Tech</span>
              <span>Productivity</span>
            </div>

            <div className={styles.stats}>
              <div>
                <strong>850k</strong>
                <span>Followers</span>
              </div>
              <div className={styles.er}>
                <strong>4.2%</strong>
                <span>Eng. Rate</span>
              </div>
              <div>
                <strong>120k</strong>
                <span>Avg. Views</span>
              </div>
            </div>

            <button className={styles.viewBtn}>
              View Profile
            </button>
          </div>
        ))}

        {/* Discover More Card */}
        <div className={styles.discoverCard}>
          <div className={styles.discoverIcon}>🔍</div>
          <h4>Discover More</h4>
          <p>
            Find new creators that match your brand profile
          </p>
          <button>Browse Creators</button>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <p>Showing 1-12 of 24 saved creators</p>

        <div className={styles.pagination}>
          <button>{"<"}</button>
          <button className={styles.activePage}>1</button>
          <button>2</button>
          <button>{">"}</button>
        </div>
      </div>
    </section>
  );
}