"use client";

import styles from "./HowItWorks.module.scss";
import { Search, MessageCircle, Rocket } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>How VidoraHub Works</h2>
        <p>
          VidoraHub is the marketplace where brands and creators discover each
          other, start conversations instantly, and collaborate on impactful
          campaigns through VidoraHub Studio.
        </p>
      </div>

      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.icon}>
            <Search size={18} />
          </div>

          <h3>1. Discover</h3>

          <p>
            Browse thousands of verified creators across niches. Brands can
            filter by category, audience size, and engagement to find the
            perfect collaboration partner.
          </p>
        </div>

        <div className={styles.step}>
          <div className={styles.icon}>
            <MessageCircle size={18} />
          </div>

          <h3>2. Connect</h3>

          <p>
            Start conversations instantly through WhatsApp, Instagram, or
            integrated messaging. VidoraHub Studio makes creator-brand
            communication seamless.
          </p>
        </div>

        <div className={styles.step}>
          <div className={styles.icon}>
            <Rocket size={18} />
          </div>

          <h3>3. Collaborate</h3>

          <p>
            Launch campaigns, manage collaborations, and grow together. Brands
            scale their reach while creators secure paid partnerships.
          </p>
        </div>
      </div>
    </section>
  );
}