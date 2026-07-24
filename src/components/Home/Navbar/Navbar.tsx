"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Home, LayoutDashboard, Menu, Search, User, X } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { username } = useAuth();

  const dashboardHref = username ? `/dashboard/${username}` : "/login";
  const navItems = [
    { label: "Home", href: "/", icon: Home, active: pathname === "/" },
    {
      label: "Dashboard",
      href: dashboardHref,
      icon: LayoutDashboard,
      active: pathname.startsWith("/dashboard"),
    },
    {
      label: "Creators",
      href: "/search",
      icon: Search,
      active: pathname.startsWith("/search"),
    },
    {
      label: "Brands",
      href: "/brand",
      icon: Building2,
      active: pathname.startsWith("/brand"),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: User,
      active: pathname.startsWith("/profile"),
    },
  ];

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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link href="/" onClick={() => setOpen(false)}>
              <span className={styles.logoText}>VidoraHub Studio</span>
            </Link>
          </div>
        </div>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${item.active ? styles.active : ""}`}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.right}>
          <Link
            href="https://about.vidorahub.com/"
            target="_blank"
            className={styles.aboutLink}
          >
            About
          </Link>

          <button
            className={styles.hamburger}
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <button
          className={`${styles.mobileOverlay} ${open ? styles.showOverlay : ""}`}
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
        />

        <div
          ref={menuRef}
          className={`${styles.mobileMenu} ${open ? styles.open : ""}`}
          aria-hidden={!open}
        >
          <div className={styles.drawerHeader}>
            <span>Menu</span>
            <button
              className={styles.closeButton}
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileItem} ${item.active ? styles.mobileActive : ""}`}
                onClick={() => setOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </header>
    </>
  );
}
