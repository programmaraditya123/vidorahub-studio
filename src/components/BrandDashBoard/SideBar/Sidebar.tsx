"use client";

import { useState } from "react";
import styles from "./SideBar.module.scss";
import { Menu, X } from "lucide-react";

type SideBarProps = {
    onSelect : (value : string) => void;
    activeSection: string;
}

export default function SideBar({ onSelect, activeSection }: SideBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.layout}>
      {/* Mobile Header */}
      <header className={styles.mobileHeader}>
        <button
          className={styles.hamburger}
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
        <h2>Brand Dashboard</h2>
      </header>

      {isOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`${styles.sidebar} ${
          isOpen ? styles.open : ""
        }`}
      >
        <div className={styles.sidebarHeader}>
          <span>VidoraHub</span>
          <button
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${
              activeSection === "overview" ? styles.active : ""
            }`}
            onClick={() => handleClick("overview")}
          >
            Brand Overview
          </button>

          <button
            className={`${styles.navItem} ${
              activeSection === "saved" ? styles.active : ""
            }`}
            onClick={() => handleClick("saved")}
          >
            Saved Creators
          </button>

          <button
            className={`${styles.navItem} ${
              activeSection === "requests" ? styles.active : ""
            }`}
            onClick={() => handleClick("requests")}
          >
            Creator Requests
          </button>
        </nav>
      </aside>
    </div>
  );
}