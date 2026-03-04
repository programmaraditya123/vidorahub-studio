"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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
        <Link href={'https://about.vidorahub.com/'} target="_blank">
        <button className={styles.iconBtn}>
          {/* <Bell size={18} /> */}
          About
        </button>
        </Link>

        <div className={styles.avatar} onClick={toggleMenu}>
          <Image src="/avatar.png" alt="avatar" width={36} height={36} />
        </div>

        
      </div>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className={`${styles.mobileMenu} ${open ? styles.open : ""}`}
      >
         
        <Link href={`/dashboard/${"abcd"}`}>
        <button className={`${styles.mobileItem} ${
      pathname === `/dashboard/${"abcd"}` ? styles.active : ""
    }`}>Dashboard</button>
        </Link>
        <button className={styles.mobileItem}>Creators</button>
        <button className={styles.mobileItem}>Brands</button>
        <button className={styles.mobileItem}>Logout</button>
      </div>
    </header>
  );
}