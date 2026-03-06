"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import a from '../../../images/heroimage.png'

import { Home, LayoutDashboard, Search, Building2, User } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [name,setName] = useState("")

  const toggleMenu = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const username = localStorage.getItem("username")
    setName(username!)

  },[])

  return (
    <>
      <header className={styles.navbar}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link href="/">
              <span className={styles.logoText}>VidoraHub Studio</span>
            </Link>
          </div>
        </div>

        {/* CENTER SEARCH */}
        <div className={styles.center}>
          <input
            className={styles.search}
            placeholder="Search creators or brands..."
          />
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <Link href={"https://about.vidorahub.com/"} target="_blank">
            <button className={styles.iconBtn}>About</button>
          </Link>

          <div className={styles.avatar} onClick={toggleMenu}>
            <Image src={a} alt="avatar" width={36} height={36} />
          </div>
        </div>

        {/* DROPDOWN MENU (UNCHANGED DESIGN) */}
        <div
          ref={menuRef}
          className={`${styles.mobileMenu} ${open ? styles.open : ""}`}
        >
          <Link href={"/"}>
            <button
              className={`${styles.mobileItem} ${
                pathname === "/" ? styles.active : ""
              }`}
            >
              Home
            </button>
          </Link>

          <Link href={`/dashboard/${name}`}>
            <button
              className={`${styles.mobileItem} ${
                pathname === `/dashboard/${name}` ? styles.active : ""
              }`}
            >
              Dashboard
            </button>
          </Link>

          <Link href={"/search"}>
            <button
              className={`${styles.mobileItem} ${
                pathname === "/search" ? styles.active : ""
              }`}
            >
              Creators
            </button>
          </Link>

          <Link href={"/brand"}>
            <button
              className={`${styles.mobileItem} ${
                pathname === "/brand" ? styles.active : ""
              }`}
            >
              Brands
            </button>
          </Link>
          <button className={styles.mobileItem}>Logout</button>
        </div>
      </header>

      {/* NEW BOTTOM NAVIGATION (MOBILE ONLY) */}
      <nav className={styles.bottomNav}>
        <Link
          href="/"
          className={`${styles.bottomItem} ${
            pathname === "/" ? styles.activeTab : ""
          }`}
        >
          <Home size={20} />
          <span>Home</span>
        </Link>

        <Link
          href={`/dashboard/${name}`}
          className={`${styles.bottomItem} ${
            pathname.startsWith("/dashboard") ? styles.activeTab : ""
          }`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/search"
          className={`${styles.bottomItem} ${
            pathname.startsWith("/search") ? styles.activeTab : ""
          }`}
        >
          <Search size={20} />
          <span>Creators</span>
        </Link>

        <Link
          href="/brand"
          className={`${styles.bottomItem} ${
            pathname.startsWith("/brand") ? styles.activeTab : ""
          }`}
        >
          <Building2 size={20} />
          <span>Brands</span>
        </Link>

        <Link
          href="/signup"
          className={`${styles.bottomItem} ${
            pathname.startsWith("/signup") ? styles.activeTab : ""
          }`}
        >
          <User size={20} />
          <span>Profile</span>
        </Link>
      </nav>
    </>
  );
}
