"use client";

import styles from "./StatsCards.module.scss";
import { TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Employees",
    value: "124",
    growth: "+12%",
  },
  {
    title: "Brand Equity",
    value: "$2.4M",
  },
  {
    title: "Project Reach",
    value: "850k",
  },
];

export default function StatsCards() {
  return (
    <div className={styles.grid}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.card}>
          <p className={styles.label}>{stat.title}</p>

          <div className={styles.valueRow}>
            <h2>{stat.value}</h2>

            {stat.growth && (
              <span className={styles.growth}>
                <TrendingUp size={14} />
                {stat.growth}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
