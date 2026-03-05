"use client";

import styles from "./SignupCard.module.scss";
import { User, Mail, Lock, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignupCard() {
  const [role, setRole] = useState<"creator" | "brand">("creator");

  return (
    <div className={styles.wrapper}>
      {/* LEFT PANEL */}
      <div className={styles.left}>
        <div className={styles.brand}>
          <span className={styles.logo}>✽</span>
          <span>VidoraHub Studio</span>
        </div>

        <div className={styles.hero}>
          <h1>Connect without boundaries.</h1>

          <p>
            The all-in-one workspace for modern creators and forward-thinking
            brands to collaborate and scale.
          </p>
        </div>

        <div className={styles.users}>
          {/* <div className={styles.avatars}>
            <Image src="/avatar1.png" alt="" width={28} height={28} />
            <Image src="/avatar2.png" alt="" width={28} height={28} />
            <Image src="/avatar3.png" alt="" width={28} height={28} />
          </div> */}

          {/* <span>Join 10k+ creators today</span> */}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className={styles.right}>
        <h2>Join VidoraHub</h2>
        <p className={styles.subtitle}>Start your creative journey today</p>

        {/* ROLE SWITCH */}
        <div className={styles.roleSwitch}>
          <button
            className={role === "creator" ? styles.activeRole : ""}
            onClick={() => setRole("creator")}
          >
            Creator
          </button>

          <button
            className={role === "brand" ? styles.activeRole : ""}
            onClick={() => setRole("brand")}
          >
            Brand
          </button>
        </div>

        {/* INPUTS */}
        <div className={styles.form}>
          <label>Full Name</label>

          <div className={styles.input}>
            <User size={16} />
            <input placeholder="John Doe" />
          </div>

          <label>Email Address</label>

          <div className={styles.input}>
            <Mail size={16} />
            <input placeholder="hello@vidorahub.com" />
          </div>

          <label>Password</label>

          <div className={styles.input}>
            <Lock size={16} />
            <input type="password" placeholder="••••••••" />
            <Eye size={16} />
          </div>

          {/* <div className={styles.terms}>
            <input type="checkbox" />
            <span>
              I agree to the <a>Terms of Service</a> and <a>Privacy Policy</a>.
            </span>
          </div> */}

          <button className={styles.cta}>Create Account →</button>

          <p className={styles.login}>
            Already have an account? <a><Link href={'/login'}>Log In</Link> </a>
          </p>
        </div>
      </div>
    </div>
  );
}