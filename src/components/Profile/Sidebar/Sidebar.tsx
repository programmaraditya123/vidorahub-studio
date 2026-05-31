"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import styles from "./sidebar.module.scss";
import {
  User,
  BarChart3,
  Store,
  Handshake,
  Settings,
  Bell,
  CreditCard,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const menuItems = [
  { href: "/profile", label: "Profile", icon: User, exact: true },
  { href: "/profile/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/profile/store", label: "Store", icon: Store },
  { href: "/profile/brand-deals", label: "Brand Deals", icon: Handshake },
  { href: "/profile/subscriptions", label: "Subscriptions", icon: CreditCard },
  { href: "/profile/notifications", label: "Notifications", icon: Bell },
  { href: "/profile/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { username } = useAuth();
  const dashboardHref = username ? `/dashboard/${username}` : "/dashboard";

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <aside className={styles.sidebar}>
      

      <div className={styles.menu}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.menuItem} ${active ? styles.active : ""}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
      <Link href={dashboardHref} className={styles.dashboardLink}>
        <LayoutDashboard size={18} />
        <span>Creator Dashboard</span>
      </Link>

      <button type="button" className={styles.logout} onClick={handleLogout}>
        <LogOut size={20} />
        <span>Log out</span>
      </button>
    </aside>
  );
};

export default Sidebar;
