"use client";

import styles from "./Hero.module.scss";
import Image from "next/image";
import a from '../../../images/heroimage.png'
import Link from "next/link";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <span className={styles.badge}>CREATOR ECONOMY PLATFORM</span>

        <h1 className={styles.title}>
          Discover <span>Creators and Brands</span>
        </h1>

        <p className={styles.desc}>
          Explore public portfolios and find potential collaboration partners.
          Discover, connect, and collaborate without the friction.
        </p>

        <div className={styles.actions}>
          <Link href="/search" className={styles.primary}>
            <span>Find Creators</span>
          </Link>
          <Link href="/brands" className={styles.primary}>
            <span>Find Brands</span>
          </Link>
          <Link href="/signup" className={styles.secondary}>
            <span>Register as Creator</span>
          </Link>
          <Link href="/signup" className={styles.secondary}>
            <span>Register as Brand</span>
          </Link>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.imageCard}>
          <Image
            src={a}
            alt="creator workspace"
            fill
            className={styles.image}
          />

          {/* <div className={styles.joinBadge}>
            <div className={styles.avatars}>
              <span />
              <span />
              <span />
            </div>

            <p>Joined by 12,000+ creators this week</p>
          </div> */}
        </div>
      </div>
    </section>
  );
}
