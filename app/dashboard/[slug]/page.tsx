"use client";

import PageHeader from "@/components/brand/PageHeader/PageHeader";
import styles from "../../page.module.css";
import ProfileCard from "@/components/Creator/ProfileCard/ProfileCard";
import SocialAudience from "@/components/Creator/SocialAudience/SocialAudience";
import Showcase from "@/components/Creator/Showcase/Showcase";
import BrandExperience from "@/components/Creator/BrandExperience/BrandExperience";
import BrandProfileCard from "@/components/brand/BrandProfileCard/BrandProfileCard";
import StatsCards from "@/components/brand/StatsCards/StatsCards";
import Footer from "@/components/Creator/Footer/Footer";
import { useEffect, useState } from "react";
import UnlockAccess from "@/components/Dashboard/UnlockAccess/UnlockAccess";
// import { getCreator } from "@/lib/CreatorInfo";

import { useGetCreatorQuery } from "@/store/api/creatorApi";
type CreatorInfo = {
  name: string;
  bio: string;
  tags: string[];
  location: string;
  profilePicUrl?: string;
  platforms: {
    platform: string;
    audience: string;
    url: string;
  }[];
};
const page = () => {
  const { data: creator, isLoading } = useGetCreatorQuery();
  console.log("creator", creator);
  // const [creatorInfo, setCreatorInfo] = useState<CreatorInfo | null>(null);
  const [role, setRole] = useState("0");
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== null) {
      setRole(role!);
    }
  }, [role]);

  return (
    <>
      <div className={styles.page}>
        {role === "1" && (
          <>
            <PageHeader
              title="Creator Dashboard"
              subtitle="Manage your Creator identity and assets."
            />
            <ProfileCard
              name={creator?.creator?.name}
              bio={creator?.creator?.bio}
              tags={creator?.creator?.tags ?? []}
              location={creator?.creator?.location}
              profilePicUrl={creator?.creator?.profilePicUrl}
            />
            <SocialAudience data={creator?.creator?.platforms ?? []} />
            <Showcase data={creator?.creator?.showCaseContent ?? []} />
            <BrandExperience
              data={creator?.creator?.experience ?? []}
            />
          </>
        )}
        {role === "3" && (
          <>
            <PageHeader
              title="Brand Dashboard"
              subtitle="Manage your studio's brand identity and assets."
            />
            <BrandProfileCard />
            <StatsCards />
          </>
        )}

        {role === "0" && <UnlockAccess />}
        <Footer />
      </div>
    </>
  );
};

export default page;
