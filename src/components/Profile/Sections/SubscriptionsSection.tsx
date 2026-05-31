"use client";

import Image from "next/image";
import shared from "../profileShared.module.scss";
import styles from "./SubscriptionsSection.module.scss";
import { CreditCard, Crown } from "lucide-react";
import { useState } from "react";
import style from '../../../../app/page.module.css'

const subscribedCreators = [
  { name: "Maya Chen", handle: "@mayachen", tier: "Pro", since: "Jan 2026" },
  { name: "Jordan Films", handle: "@jordanfilms", tier: "Basic", since: "Mar 2026" },
  { name: "Studio K", handle: "@studiok", tier: "Pro", since: "Feb 2026" },
];

const billingHistory = [
  { date: "May 1, 2026", plan: "VidoraHub Pro", amount: "$9.99" },
  { date: "Apr 1, 2026", plan: "VidoraHub Pro", amount: "$9.99" },
  { date: "Mar 1, 2026", plan: "VidoraHub Pro", amount: "$9.99" },
];

export default function SubscriptionsSection() {
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
        <h1>Subscriptions</h1>
        <p>Manage your VidoraHub membership and creator subscriptions.</p>
      </header>

      <div className={styles.proCard}>
        <div className={styles.proIcon}>
          <Crown size={24} />
        </div>
        <div>
          <strong>VidoraHub Pro</strong>
          <p>Unlimited collections, analytics, and priority brand matching</p>
        </div>
        <div className={styles.proPrice}>
          <span>$9.99</span>
          <small>/ month</small>
        </div>
        <button type="button" className={shared.btnSecondary}>
          Manage billing
        </button>
      </div>

      <h2 className={styles.sectionTitle}>Subscribed creators</h2>
      <div className={styles.creatorList}>
        {subscribedCreators.map((creator) => (
          <div key={creator.handle} className={styles.creatorRow}>
            <Image
              src="/avatar.jpg"
              alt={creator.name}
              width={44}
              height={44}
              className={styles.avatar}
            />
            <div>
              <strong>{creator.name}</strong>
              <span>{creator.handle}</span>
            </div>
            <span className={shared.badge}>{creator.tier}</span>
            <span className={styles.since}>Since {creator.since}</span>
            <button type="button" className={shared.btnSecondary}>
              View
            </button>
          </div>
        ))}
      </div>

      <h2 className={styles.sectionTitle}>Billing history</h2>
      <div className={shared.card}>
        {billingHistory.map((row) => (
          <div key={row.date} className={styles.billRow}>
            <CreditCard size={16} />
            <div>
              <strong>{row.plan}</strong>
              <span>{row.date}</span>
            </div>
            <span className={styles.billAmount}>{row.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
