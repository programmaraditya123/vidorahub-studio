"use client";

import { useState } from "react";
import shared from "../profileShared.module.scss";
import styles from "./AnalyticsSection.module.scss";
import { TrendingUp, TrendingDown, Eye, Heart, Users, Share2 } from "lucide-react";
import style from '../../../../app/page.module.css'

const overviewStats = [
  { label: "Profile views", value: "12.4K", change: "+18%", up: true, icon: Eye },
  { label: "Engagement rate", value: "6.8%", change: "+2.1%", up: true, icon: Heart },
  { label: "New followers", value: "842", change: "+24%", up: true, icon: Users },
  { label: "Shares", value: "1.2K", change: "-4%", up: false, icon: Share2 },
];

const topContent = [
  { title: "Summer creator roundup", views: "4.2K", engagement: "9.1%" },
  { title: "Brand collab highlights", views: "3.1K", engagement: "7.4%" },
  { title: "Studio walkthrough", views: "2.8K", engagement: "6.2%" },
];

const audienceBreakdown = [
  { platform: "Instagram", percent: 42 },
  { platform: "YouTube", percent: 31 },
  { platform: "TikTok", percent: 19 },
  { platform: "Other", percent: 8 },
];

export default function AnalyticsSection() {
  const [show,setShow] = useState(1)
  if (show) {
  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2>Coming Soon</h2>

        <p>
          We're working hard to bring you exciting new features. Stay tuned!
        </p>

        <div className={style.actions}>
          <button
            className={style.primaryButton}
            onClick={() => setShow(0)}
          >
            See What's Coming
          </button>
        </div>
      </div>
    </div>
  );
}
  return (
    <>
    <div className={shared.section}>
      <header className={shared.header}>
        <h1>Analytics</h1>
        <p>Track how your profile, content, and collections perform over time.</p>
      </header>

      <div className={styles.statsGrid}>
        {overviewStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={shared.card}>
              <div className={styles.statTop}>
                <span className={shared.label}>{stat.label}</span>
                <div className={styles.iconWrap}>
                  <Icon size={18} />
                </div>
              </div>
              <div className={styles.valueRow}>
                <span className={shared.value}>{stat.value}</span>
                <span
                  className={`${shared.growth} ${!stat.up ? shared.growthDown : ""}`}
                >
                  {stat.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {stat.change}
                </span>
              </div>
              <span className={styles.period}>Last 30 days</span>
            </div>
          );
        })}
      </div>

      <div className={styles.twoCol}>
        <div className={shared.card}>
          <h2 className={styles.blockTitle}>Performance trend</h2>
          <div className={styles.chartPlaceholder}>
            <div className={styles.bars}>
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                <div
                  key={i}
                  className={styles.bar}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className={styles.chartNote}>Views & engagement — last 12 weeks</p>
          </div>
        </div>

        <div className={shared.card}>
          <h2 className={styles.blockTitle}>Audience by platform</h2>
          <ul className={styles.platformList}>
            {audienceBreakdown.map((row) => (
              <li key={row.platform}>
                <div className={styles.platformRow}>
                  <span>{row.platform}</span>
                  <span>{row.percent}%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={shared.card} style={{ marginTop: 16 }}>
        <h2 className={styles.blockTitle}>Top performing content</h2>
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>Content</span>
            <span>Views</span>
            <span>Engagement</span>
          </div>
          {topContent.map((row) => (
            <div key={row.title} className={styles.tableRow}>
              <span>{row.title}</span>
              <span>{row.views}</span>
              <span>{row.engagement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
