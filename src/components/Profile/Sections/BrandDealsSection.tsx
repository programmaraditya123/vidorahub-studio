"use client";

import { useState } from "react";
import shared from "../profileShared.module.scss";
import styles from "./BrandDealsSection.module.scss";
import { Handshake, Calendar, MessageSquare } from "lucide-react";
import style from '../../../../app/page.module.css'

const deals = [
  {
    brand: "Nova Athletics",
    campaign: "Spring collection launch",
    amount: "$3,200",
    status: "Active",
    due: "Jun 15, 2026",
  },
  {
    brand: "Glow Cosmetics",
    campaign: "UGC video series (3 posts)",
    amount: "$1,800",
    status: "Pending",
    due: "Awaiting approval",
  },
  {
    brand: "TechFlow Audio",
    campaign: "Product review + story",
    amount: "$950",
    status: "Completed",
    due: "Paid Mar 28, 2026",
  },
  {
    brand: "Urban Eats",
    campaign: "Restaurant takeover reel",
    amount: "$1,200",
    status: "Negotiating",
    due: "Proposal sent",
  },
];

const statusClass: Record<string, string> = {
  Active: shared.badgeSuccess,
  Pending: shared.badgePending,
  Completed: shared.badge,
  Negotiating: shared.badgeWarning,
};

export default function BrandDealsSection() {
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
    <div className={shared.section}>
      <header className={shared.header}>
        <h1>Brand Deals</h1>
        <p>
          Manage sponsorships, collaborations, and partnership opportunities
          with brands on VidoraHub.
        </p>
      </header>

      <div className={shared.grid3}>
        <div className={shared.card}>
          <span className={shared.label}>Active deals</span>
          <p className={shared.value}>2</p>
        </div>
        <div className={shared.card}>
          <span className={shared.label}>Pending offers</span>
          <p className={shared.value}>1</p>
        </div>
        <div className={shared.card}>
          <span className={shared.label}>Total earned (YTD)</span>
          <p className={shared.value}>$8.4K</p>
        </div>
      </div>

      <div className={styles.filters}>
        <button type="button" className={`${styles.filterBtn} ${styles.filterActive}`}>
          All
        </button>
        <button type="button" className={styles.filterBtn}>Active</button>
        <button type="button" className={styles.filterBtn}>Pending</button>
        <button type="button" className={styles.filterBtn}>Completed</button>
      </div>

      <div className={styles.dealList}>
        {deals.map((deal) => (
          <article key={deal.brand + deal.campaign} className={styles.dealCard}>
            <div className={styles.dealIcon}>
              <Handshake size={22} />
            </div>
            <div className={styles.dealBody}>
              <div className={styles.dealTop}>
                <strong>{deal.brand}</strong>
                <span className={`${shared.badge} ${statusClass[deal.status]}`}>
                  {deal.status}
                </span>
              </div>
              <p className={styles.campaign}>{deal.campaign}</p>
              <div className={styles.meta}>
                <span>
                  <Calendar size={14} />
                  {deal.due}
                </span>
                <span className={styles.amount}>{deal.amount}</span>
              </div>
            </div>
            <button type="button" className={styles.msgBtn} aria-label="Message brand">
              <MessageSquare size={18} />
            </button>
          </article>
        ))}
      </div>

      <div className={shared.cardMuted}>
        <p className={styles.tip}>
          <strong>Tip:</strong> Complete your creator dashboard profile to receive
          more brand match offers.
        </p>
      </div>
    </div>
  );
}
