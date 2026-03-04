import Navbar from "@/src/components/Home/Navbar/Navbar";
import styles from "./page.module.css";
import Hero from "@/src/components/Home/Hero/Hero";
import TrustedBrands from "@/src/components/Home/TrustedBrands/TrustedBrands";
import FeaturedCreators from "@/src/components/Home/FeaturedCreators/FeaturedCreators";
import HowItWorks from "@/src/components/Home/HowItWorks/HowItWorks";
import Footer from "@/src/components/Home/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.main}>
    <Navbar/>
    <div className={styles.page}>
      <Hero/>
      <TrustedBrands/>
      <FeaturedCreators/>
      <HowItWorks/>
      <Footer/>
        
      
    </div>
    </div>
  );
}
