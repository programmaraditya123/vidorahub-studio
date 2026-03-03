import BrandDashBoard from "@/src/pages/BrandDashboard/BrandDashBoard";
import styles from "./page.module.css";
// import CreatorDashBoard from "@/src/pages/CreatorDashboard/CreatorDashBoard";

export default function Home() {
  return (
    <div className={styles.page}>
       <BrandDashBoard/>
       {/* <CreatorDashBoard/> */}
      
    </div>
  );
}
