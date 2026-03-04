"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.scss";
import { Bell, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.navbar}>
      {/* LEFT */}
      <div className={styles.left}>
        <div className={styles.logo}>
          {/* <span className={styles.logoIcon}>✦</span> */}
          <span className={styles.logoText}>VidoraHub Studio</span>
        </div>
      </div>

      {/* CENTER SEARCH */}
      <div className={styles.center}>
        <input
          className={styles.search}
          placeholder="Search creators or brands..."
        />
      </div>

      {/* RIGHT DESKTOP */}
      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <Bell size={18} />
        </button>

        <div className={styles.avatar}>
          <Image src="/avatar.png" alt="avatar" width={36} height={36} />
        </div>

        <button className={styles.hamburger} onClick={toggleMenu}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className={`${styles.mobileMenu} ${open ? styles.open : ""}`}
      >
        <input
          className={styles.mobileSearch}
          placeholder="Search creators or brands..."
        />

        <button className={styles.mobileItem}>Dashboard</button>
        <button className={styles.mobileItem}>Creators</button>
        <button className={styles.mobileItem}>Brands</button>
        {/* <button className={styles.mobileItem}>Requests</button> */}
      </div>
    </header>
  );
}