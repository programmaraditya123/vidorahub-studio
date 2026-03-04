import ProfileCard from "@/src/components/Creator/ProfileCard/ProfileCard"
import Showcase from "@/src/components/Creator/Showcase/Showcase"
import SocialAudience from "@/src/components/Creator/SocialAudience/SocialAudience"
import styles from '../../page.module.css'
import BrandExperience from "@/src/components/Creator/BrandExperience/BrandExperience"
import Footer from "@/src/components/Creator/Footer/Footer"
import PageHeader from "@/src/components/Brand/PageHeader/PageHeader"
import BrandProfileCard from "@/src/components/Brand/BrandProfileCard/BrandProfileCard"
import StatsCards from "@/src/components/Brand/StatsCards/StatsCards"



const page = () => {
    return (
        <>
            <div className={styles.page}>
                <PageHeader
                    title="Creator Dashboard"
                    subtitle="Manage your Creator identity and assets."
                />
                <ProfileCard />
                <SocialAudience />
                <Showcase />
                <BrandExperience />
                
                <PageHeader
                    title="Brand Dashboard"
                    subtitle="Manage your studio's brand identity and assets."
                />
                <BrandProfileCard/>
                <StatsCards/>
                <Footer />

            </div>
        </>
    )
}

export default page