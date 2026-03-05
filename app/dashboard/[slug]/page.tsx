// import ProfileCard from "@/src/components/Creator/ProfileCard/ProfileCard"
// import Showcase from "@/src/components/Creator/Showcase/Showcase"
// import SocialAudience from "@/src/components/Creator/SocialAudience/SocialAudience"
import PageHeader from '@/components/brand/PageHeader/PageHeader'
import styles from '../../page.module.css'
import ProfileCard from '@/components/Creator/ProfileCard/ProfileCard'
import SocialAudience from '@/components/Creator/SocialAudience/SocialAudience'
import Showcase from '@/components/Creator/Showcase/Showcase'
import BrandExperience from '@/components/Creator/BrandExperience/BrandExperience'
import BrandProfileCard from '@/components/brand/BrandProfileCard/BrandProfileCard'
import StatsCards from '@/components/brand/StatsCards/StatsCards'
import Footer from '@/components/Creator/Footer/Footer'
// import BrandExperience from "@/src/components/Creator/BrandExperience/BrandExperience"
// import Footer from "@/src/components/Creator/Footer/Footer"
// import PageHeader from "@/src/components/brand/PageHeader/PageHeader"
// import BrandProfileCard from "@/src/components/brand/BrandProfileCard/BrandProfileCard"
// import StatsCards from "@/src/components/brand/StatsCards/StatsCards"

 



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