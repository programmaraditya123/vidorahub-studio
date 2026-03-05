"use client";

import styles from "./BrandProfile.module.scss";
import Image from "next/image";
import {
  CheckCircle,
  Mail,
  Share2,
  MapPin,
  Globe,
  Briefcase,
  Users,
} from "lucide-react";

export default function BrandProfile() {
  return (
    <div className={styles.wrapper}>
      {/* COVER */}

      <div className={styles.cover}></div>

      <div className={styles.container}>
        {/* HEADER */}

        <div className={styles.header}>
          <div className={styles.brandInfo}>
            <div className={styles.logoWrapper}>
              <Image
                src="/brand-logo.png"
                alt="brand"
                width={80}
                height={80}
                className={styles.logo}
              />

              <CheckCircle size={18} className={styles.verify} />
            </div>

            <div>
              <h1>Luminary Labs</h1>

              <p className={styles.tagline}>
                Global Creator Partner since 2021
              </p>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.contactBtn}>
              <Mail size={16} />
              Contact Brand
            </button>

            <button className={styles.shareBtn}>
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* CONTENT */}

        <div className={styles.content}>
          {/* MISSION */}

          <div className={styles.mission}>
            <h3>Our Mission</h3>

            <p>
              At Luminary Labs, we believe that the future of storytelling
              belongs to independent creators. Our mission is to bridge the gap
              between world-class innovation and the creative community.
            </p>

            <p>
              We specialize in developing tools and platforms that empower
              creators to push the boundaries of digital media.
            </p>

            <p>
              Our commitment to excellence is reflected in every partnership we
              undertake.
            </p>
          </div>

          {/* BRAND CARD */}

          <div className={styles.card}>
            <h4>BRAND IDENTITY</h4>

            <div className={styles.item}>
              <MapPin size={16} />
              <div>
                <span>Headquarters</span>
                <strong>San Francisco, CA</strong>
              </div>
            </div>

            <div className={styles.item}>
              <Globe size={16} />
              <div>
                <span>Website</span>
                <strong>luminarylabs.io</strong>
              </div>
            </div>

            <div className={styles.item}>
              <Briefcase size={16} />
              <div>
                <span>Industry</span>
                <strong>Creative Technology</strong>
              </div>
            </div>

            <div className={styles.item}>
              <Users size={16} />
              <div>
                <span>Company Size</span>
                <strong>50 - 200 Employees</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}