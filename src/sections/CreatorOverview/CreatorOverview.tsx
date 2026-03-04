import ActiveCampaigns from "@/src/components/BrandDashBoard/ActiveCampaigns/ActiveCampaigns"
import BookmarkedCreators from "@/src/components/BrandDashBoard/BookmarkedCreators/BookmarkedCreators"
import BrandIdentity from "@/src/components/BrandDashBoard/BrandIdentity/BrandIdentity"
import DashboardNavbar from "@/src/components/BrandDashBoard/DashboardNavbar/DashboardNavbar"
import styles from './CreatorOverview.module.scss'

 

const CreatorOverview = () => {
  return (
    <>
    <DashboardNavbar/>
    <div className={styles.mainContainer}>
    <BrandIdentity/>
    <ActiveCampaigns/>
    <BookmarkedCreators/>
    </div>
    </>
  )
}

export default CreatorOverview