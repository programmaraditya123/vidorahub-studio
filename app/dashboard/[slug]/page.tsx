'use client'

import PageHeader from '@/components/brand/PageHeader/PageHeader'
import styles from '../../page.module.css'
import ProfileCard from '@/components/Creator/ProfileCard/ProfileCard'
import SocialAudience from '@/components/Creator/SocialAudience/SocialAudience'
import Showcase from '@/components/Creator/Showcase/Showcase'
import BrandExperience from '@/components/Creator/BrandExperience/BrandExperience'
import BrandProfileCard from '@/components/brand/BrandProfileCard/BrandProfileCard'
import StatsCards from '@/components/brand/StatsCards/StatsCards'
import Footer from '@/components/Creator/Footer/Footer'
import { useEffect, useState } from 'react'
import UnlockAccess from '@/components/Dashboard/UnlockAccess/UnlockAccess'
 

 



const page = () => {
    const [role,setRole] = useState("0")
    useEffect(() => {
        const role = localStorage.getItem("role")
        setRole(role!)

    },[role])
    return (
        <>
            <div className={styles.page}>
                {role === "1" && (
                    <>
                    <PageHeader
                    title="Creator Dashboard"
                    subtitle="Manage your Creator identity and assets."
                />
                <ProfileCard />
                <SocialAudience />
                <Showcase />
                <BrandExperience />
                </>
            )}
             {role === "3"  && (<>
                
                <PageHeader
                    title="Brand Dashboard"
                    subtitle="Manage your studio's brand identity and assets."
                />
                <BrandProfileCard/>
                <StatsCards/>
                </>)}

                {role === "0" && <UnlockAccess/>}
                <Footer />

            </div>
        </>
    )
}

export default page