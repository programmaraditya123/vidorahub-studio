"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Profile/Sidebar/Sidebar";
import LoginCard from "@/components/Login/LoginCard/LoginCard";
import styles from "./profileShell.module.scss";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setChecked(true);
  }, []);

  if (!checked) {
    return null;
  }

  if (!token) {
    return (
      <div className={styles.authWrap}>
        <LoginCard />
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
