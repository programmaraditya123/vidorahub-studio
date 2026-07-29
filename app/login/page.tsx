import LoginCard from "@/components/Login/LoginCard/LoginCard";
import type { Metadata } from "next";
import { loginMetadata } from "@/lib/discovery";
import styles from "../page.module.css";

export const metadata: Metadata = loginMetadata();

export default function Page() {
  return (
    <div className={styles.page}>
      <LoginCard />
    </div>
  );
}
