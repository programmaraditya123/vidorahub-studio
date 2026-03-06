"use client";

import styles from "./UnlockAccess.module.scss";
import { Lock, Users, Shield } from "lucide-react";
import Link from "next/link";

export default function UnlockAccess() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        
        <div className={styles.iconBox}>
          <Lock size={36} />
        </div>

        <h1 className={styles.h1}>
          Unlock Your <span>Creator Potential</span>
        </h1>

        <p className={styles.pa}>
          To access your VidoraHub Studio dashboard and manage your brand
          collaborations, please sign in or create a new account.
        </p>

        <div className={styles.actions}>
          <Link href="/login" className={styles.primaryBtn}>
            Sign In
          </Link>

          <Link href="/signup" className={styles.secondaryBtn}>
            Create Account
          </Link>
        </div>

        <div className={styles.footer}>
          <div>
            <Shield size={16} />
            <span>Secure Access</span>
          </div>

          <div>
            <Users size={16} />
            <span>Creator Focused</span>
          </div>
        </div>

      </div>
    </section>
  );
}