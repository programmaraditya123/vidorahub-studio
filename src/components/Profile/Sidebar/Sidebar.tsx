"use client";

import styles from "./sidebar.module.scss";
import {
  Home,
  User,
  Video,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

type SidebarProps = {
  active: string;
  onChange: (value: string) => void;
};

const menuItems = [
  { key: "profile", label: "Profile", icon: User },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "settings", label: "Settings", icon: Settings },
];

const Sidebar = ({ active, onChange }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.menu}>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className={`${styles.menuItem} ${
                active === item.key ? styles.active : ""
              }`}
              onClick={() => onChange(item.key)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
export default Sidebar;