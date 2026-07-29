import SignupCard from "@/components/Login/SignupCard/SignupCard";
import type { Metadata } from "next";
import { signupMetadata } from "@/lib/discovery";
import styles from "../page.module.css";

export const metadata: Metadata = signupMetadata();

export default function Page() {
  return (
    <div className={styles.page}>
      <SignupCard />
    </div>
  );
}
