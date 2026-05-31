"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import ProfileHeader from "@/components/Profile/ProfileHeader/ProfileHeader";
import shared from "../profileShared.module.scss";
import styles from "./ProfileOverview.module.scss";
import {
  BarChart3,
  Store,
  Handshake,
  Settings,
  ArrowRight,
   WalletCards,
   Bell,
} from "lucide-react";
 

const quickLinks = [
  {
    href: "/profile/analytics",
    label: "View analytics",
    desc: "Reach, engagement & growth",
    icon: BarChart3,
  },
  {
    href: "/profile/store",
    label: "Manage store",
    desc: "Products & earnings",
    icon: Store,
  },
  {
    href: "/profile/brand-deals",
    label: "Brand deals",
    desc: "Partnerships & campaigns",
    icon: Handshake,
  },
  {
    href: "/profile/settings",
    label: "Account settings",
    desc: "Privacy & preferences",
    icon: Settings,
  },
  {
    href : "/profile/subscriptions",
    label : "Subscriptions",
    desc : "Manage Subscriptions",
    icon : WalletCards,
  },
  {
    href : "/profile/notifications",
    label : "Notifications",
    desc : "Manage Notification",
    icon : Bell
  },
  
];

export default function ProfileOverview() {
  const router = useRouter();
  const { username } = useAuth();
  const dashboardHref = username ? `/dashboard/${username}` : "/dashboard";

 

  return (
    <div className={shared.section}>
      <ProfileHeader />

      <div className={styles.recentBlock}>
        <h3>Quick actions</h3>
        <div className={styles.quickGrid}>
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={styles.quickCard}>
                <div className={styles.quickIcon}>
                  <Icon size={20} />
                </div>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.desc}</p>
                </div>
                <ArrowRight size={18} className={styles.arrow} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* <div className={styles.activityRow}>
        <div className={shared.cardMuted}>
          <span className={shared.label}>Recent activity</span>
          <p className={styles.activityText}>
            You saved 3 creators to collections this week.
          </p>
          <button
            type="button"
            className={shared.btnSecondary}
            onClick={() => router.push(dashboardHref)}
          >
            Open dashboard
          </button>
        </div>
        <div className={shared.cardMuted}>
          <span className={shared.label}>Membership</span>
          <div className={styles.proRow}>
            <Image src="/avatar.jpg" alt="" width={40} height={40} className={styles.miniAvatar} />
            <div>
              <strong>VidoraHub Pro</strong>
              <p>Renews Apr 12, 2026</p>
            </div>
          </div>
          <Link href="/profile/subscriptions" className={styles.linkBtn}>
            Manage subscription
          </Link>
        </div>
      </div> */}
    </div>
  );
}
