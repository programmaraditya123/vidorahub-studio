"use client";

import styles from "./LoginCard.module.scss";
import { Mail, Lock, Eye, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.wrapper}>
      {/* LEFT SIDE */}
      <div className={styles.left}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <LayoutGrid size={20} />
          </div>

          <span>VidoraHub Studio</span>
        </div>

        <div className={styles.hero}>
          <h1>Helping brands discover creators. Helping creators land better deals.</h1>

          <p>
            VidoraHub is the marketplace where brands discover authentic creators
and creators unlock high-value partnerships.
          </p>
        </div>

        <div className={styles.imageCard}>
          {/* <Image
            src="/login-art.png"
            alt="hero"
            fill
            className={styles.image}
          /> */}

          <p className={styles.quote}>
            “VidoraHub helped us discover creators that perfectly matched our brand
  voice and audience.”
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.right}>
        <h2>Welcome Back</h2>
        <p className={styles.subtitle}>
          Enter your credentials to access your studio
        </p>

        <div className={styles.form}>
          <label>Email Address</label>

          <div className={styles.input}>
            <Mail size={16} />
            <input placeholder="name@company.com" />
          </div>

          <label>Password</label>

          <div className={styles.input}>
            <Lock size={16} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
            />

            <Eye
              size={16}
              className={styles.eye}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className={styles.options}>
            {/* <label className={styles.remember}>
              <input type="checkbox" />
              Remember me
            </label> */}

            {/* <a className={styles.forgot}>Forgot password?</a> */}
          </div>

          <button className={styles.loginBtn}>Log In</button>

          <p className={styles.signup}>
            Don't have an account? <Link href="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}