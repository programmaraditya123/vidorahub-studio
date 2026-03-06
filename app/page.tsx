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
 

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      const verify = async () => {
    const session = await CheckSession();
    
    if(session){
      localStorage.setItem("userid",session?.user?._id!)
      localStorage.setItem("username",session?.user?.name!)
      localStorage.setItem("role",session?.user?.role?.toString()!)
      localStorage.setItem("email",session?.user?.email!)
      

    }
    

    if (!session?.ok) {
      router.replace("/login");
    }
  };

  verify();

    }
  
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
