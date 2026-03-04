import DashboardNavbar from "@/src/components/BrandDashBoard/DashboardNavbar/DashboardNavbar"
import styles from '../CreatorOverview/CreatorOverview.module.scss';
import SavedCreators from "@/src/components/BrandDashBoard/SavedCreators/SavedCreators";

const Creatorsaved = () => {
  return (
    <>
    <DashboardNavbar/>
    <div className={styles.mainContainer}>
      <SavedCreators/>

    </div>
    </>
  )
}

export default Creatorsaved