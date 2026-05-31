"use client";

import { useState } from "react";
import shared from "../profileShared.module.scss";
import styles from "./NotificationsSection.module.scss";
import { Bell, Handshake, TrendingUp, Heart, Settings } from "lucide-react";
import style from '../../../../app/page.module.css'

const notifications = [
  {
    id: "1",
    type: "deal",
    icon: Handshake,
    title: "New brand offer from Glow Cosmetics",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "2",
    type: "analytics",
    icon: TrendingUp,
    title: "Your profile views are up 18% this week",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "3",
    type: "social",
    icon: Heart,
    title: "12 creators added you to their collections",
    time: "2 days ago",
    unread: false,
  },
  {
    id: "4",
    type: "system",
    icon: Settings,
    title: "Security: password changed successfully",
    time: "1 week ago",
    unread: false,
  },
];

export default function NotificationsSection() {
  const unreadCount = notifications.filter((n) => n.unread).length;

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
        <div className={styles.headerRow}>
          <div>
            <h1>Notifications</h1>
            <p>Stay updated on deals, analytics, and account activity.</p>
          </div>
          {unreadCount > 0 && (
            <span className={styles.unreadBadge}>{unreadCount} new</span>
          )}
        </div>
      </header>

      <div className={styles.actions}>
        <button type="button" className={shared.btnSecondary}>
          Mark all read
        </button>
      </div>

      <ul className={styles.list}>
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.id}
              className={`${styles.item} ${item.unread ? styles.itemUnread : ""}`}
            >
              <div className={styles.iconWrap}>
                <Icon size={18} />
              </div>
              <div className={styles.body}>
                <p>{item.title}</p>
                <span>{item.time}</span>
              </div>
              {item.unread && <span className={styles.dot} aria-hidden />}
            </li>
          );
        })}
      </ul>

      {notifications.length === 0 && (
        <div className={shared.empty}>
          <Bell size={32} />
          <p>No notifications yet</p>
        </div>
      )}
    </div>
  );
}
