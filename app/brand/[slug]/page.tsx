 

import BrandProfile from "@/components/brand/BrandProfile/BrandProfile";
import Footer from "@/components/Creator/Footer/Footer";
import styles from '../../page.module.css'

const page = () => {
  return (
    <>
    <div className={styles.page}>
    <BrandProfile/>
    <Footer/>
    </div>
    </>
  )
}

export default page;