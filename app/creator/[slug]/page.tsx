"use client";

import BrandExperience from "@/src/components/creator/BrandExperience/BrandExperience";
import CollaborationPortfolio from "@/src/components/creator/CollaborationPortfolio/CollaborationPortfolio";
import ConnectEverywhere from "@/src/components/creator/ConnectEverywhere/ConnectEverywhere";
import CreatorHeroCard from "@/src/components/creator/CreatorHeroCard/CreatorHeroCard";
import CreatorNavbar from "@/src/components/creator/CreatorNavbar/CreatorNavbar";
import StatsGrid from "@/src/components/creator/StatsGrid/StatsGrid";
import styles from '../creator.module.scss'

const page = () => {
  const stats = [
    { label: "Instagram Followers", value: "1.2M" },
    { label: "YouTube Subscribers", value: "850K" },
    { label: "Linkedin", value: "4.8%" },
    { label: "Facebook", value: "120+" },
  ];
  return (
    <div className={styles.main}>
      <CreatorNavbar
        profileImage="/images/avatar.jpg"
        onShare={() => console.log("Share clicked")}
      />
      <div className={styles.scrollContainer}>
      <CreatorHeroCard
        name="Alex Rivera"
        niche="Tech & Lifestyle Visionary"
        location="Los Angeles, CA"
        bio="Empowering brands through high-impact visual storytelling and authentic tech integrations. Bridging the gap between innovation and lifestyle."
        profileImage="/images/alex.jpg"
      />
      <StatsGrid stats={stats} />

      <CollaborationPortfolio
        collaborations={[
          {
            brand: "TechQuest Gaming",
            title: "TechQuest RPG Launch",
            description:
              "Global integrated launch campaign featuring custom cinematic gameplay integration.",
            thumbnail: "/images/collab1.jpg",
          },
          {
            brand: "ZenKitchen Foods",
            title: "ZenKitchen Organic Series",
            description:
              "8-part recipe series showcasing premium organic tools and ingredients.",
            thumbnail: "/images/collab2.jpg",
          },
          {
            brand: "Lumina Tech",
            title: "Lumina Wireless Experience",
            description:
              "In-depth technical review and desk setup aesthetic for the Lumina Pro line.",
            thumbnail: "/images/collab3.jpg",
          },
        ]}
      />

      <BrandExperience
        experiences={[
          {
            brand: "Samsung Mobile",
            campaignType: "Product Launch / YouTube Integration",
            duration: "6 Months",
            status: "completed",
          },
          {
            brand: "Adobe Creative",
            campaignType: "Software Tutorial / IG Reels",
            duration: "Annual Partner",
            status: "ongoing",
          },
          {
            brand: "Logitech G",
            campaignType: "Setup Showcase / TikTok Series",
            duration: "3 Months",
            status: "completed",
          },
        ]}
      />
      <ConnectEverywhere />
      </div>
    </div>
  );
};

export default page;
