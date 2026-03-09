import LoginCard from "@/components/Login/LoginCard/LoginCard"
import styles from '../page.module.css'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login – VidoraHub Studio",
  description:
    "Login to VidoraHub Studio to upload videos, manage your creator profile, collaborate with brands, and grow your audience on VidoraHub.",
  keywords: [
    "VidoraHub login",
    "creator login",
    "video creator dashboard login",
    "VidoraHub studio login",
    "creator brand marketplace login",
  ],
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return (
    <>
    <div className={styles.page}>
    <LoginCard/>
    </div>
    
    </>
  )
}

export default page