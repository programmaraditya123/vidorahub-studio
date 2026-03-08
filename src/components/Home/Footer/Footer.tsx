"use client";

import styles from "./Footer.module.scss";
import { Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* LEFT */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.icon}>✦</span>
            <h3>VidoraHub Studio</h3>
          </div>

          <p>
            The premier destination for brand-creator partnerships in India.
            Empowering the next generation of digital marketing.
          </p>

          <div className={styles.socials}>
            <button><Twitter size={16} /></button>
            <button><Instagram size={16} /></button>
            <button><Linkedin size={16} /></button>
          </div>
        </div>

        {/* LINKS */}
        <div className={styles.links}>
          
          <div>
            <h4>PLATFORM</h4>
            <a>Find Creators</a>
            <a>Brand Dashboard</a>
            <a>Success Stories</a>
            <a>Pricing</a>
          </div>

          <div>
            <h4>COMPANY</h4>
            <a>About Us</a>
            <a>Careers</a>
            <a>Press</a>
            <a>Contact</a>
          </div>

          <div>
            <h4>LEGAL</h4>
            <a>Privacy Policy</a>
            <a>Terms of Service</a>
            <a>Cookie Policy</a>
          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        © 2026 VidoraHub Studio. All rights reserved. Made for the creator economy.
      </div>
    </footer>
  );
}