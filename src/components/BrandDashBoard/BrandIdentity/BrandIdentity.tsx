"use client";

import styles from "./BrandIdentity.module.scss";
import { Pencil } from "lucide-react";

export default function BrandIdentity() {
  return (
    <section className={styles.wrapper}>
      
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2>Brand Identity</h2>
          <p>
            Manage your public brand profile and industry details.
          </p>
        </div>

        <button className={styles.editBtn}>
          Edit Profile <Pencil size={14} />
        </button>
      </div>

      {/* Card */}
      <div className={styles.card}>
        
        {/* Logo */}
        <div className={styles.logoBox}>
          <img
            src="/logo.png"
            alt="Brand Logo"
          />
        </div>

        {/* Info Section */}
        <div className={styles.info}>
          
          {/* Top Row */}
          <div className={styles.topRow}>
            <div>
              <span>Company Name</span>
              <h3>VidoraHub</h3>
            </div>

            <div>
              <span>Industry</span>
              <h3>Media & Entertainment</h3>
            </div>

            <div>
              <span>Website</span>
              <a href="#">www.vidorahub.com</a>
            </div>
          </div>

          {/* About */}
          <div className={styles.about}>
            <span>About</span>
            <p>
              VidoraHub is a leading global platform empowering the next
              generation of digital storytellers. We specialize in
              connecting high-growth brands with premium video creators
              to build high-impact, results-driven social media campaigns.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}