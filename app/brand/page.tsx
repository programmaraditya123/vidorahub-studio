import DiscoverBrands from "@/src/components/brand/DiscoverBrands/DiscoverBrands";
import styles from "../page.module.css";

const page = () => {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.brandsContainer}>
          <DiscoverBrands />
        </div>
      </div>
    </>
  );
};

export default page;
