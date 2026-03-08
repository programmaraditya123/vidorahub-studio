'use client'

import Hero from "@/components/Home/Hero/Hero";
import styles from "./page.module.css";
import TrustedBrands from "@/components/Home/TrustedBrands/TrustedBrands";
import FeaturedCreators from "@/components/Home/FeaturedCreators/FeaturedCreators";
import HowItWorks from "@/components/Home/HowItWorks/HowItWorks";
import Footer from "@/components/Home/Footer/Footer";
import { useEffect } from "react";
import { CheckSession } from "@/lib/LoginRegisterApis";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";

 

export default function Home() {
  const router = useRouter();
  const { setUsername } = useAuth();
  const { token } = useAuth();
  
  useEffect(() => {

  const verify = async () => {

    try {
      const session = await CheckSession();
      // console.log("session", session);

      if (session?.ok) {

        localStorage.setItem("userid", session?.user?._id || "");
        localStorage.setItem("username", session?.user?.name ?? "");
        localStorage.setItem("role", String(session?.user?.role ?? ""));
        localStorage.setItem("email", session?.user?.email ?? "");
        localStorage.setItem("profilePicUrl", session?.user?.profilePicUrl ?? "");

        setUsername(session?.user?.name ?? "");

      } else {
        localStorage.removeItem("token");
        router.replace("/login");
      }

    } catch (err) {
      localStorage.removeItem("token");
      router.replace("/login");
    }

  };

  const token = localStorage.getItem("token");

  if (token) verify();

}, []);
  return (
     
    <>
    <div className={styles.page}>
      <Hero/>
      <TrustedBrands/>
      <FeaturedCreators/>
      <HowItWorks/>
      <Footer/>
        
      
    </div>
    </>
     
  );
}
