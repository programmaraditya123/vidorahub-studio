import CreatorCard from "../CreatorCard/CreatorCard";
import styles from "./CreatorsGrid.module.scss";

/* platform types */

type PlatformName = "Instagram" | "TikTok" | "YouTube";

type Platform = {
  name: PlatformName;
  followers: string;
};

type Creator = {
  name: string;
  avatar: string;
  niche: string;
  location: string;
  platforms: Platform[];
};

/* creators data */

const creators: Creator[] = [
  {
    name: "Elena Vance",
    avatar: "/avatars/1.png",
    niche: "Lifestyle",
    location: "Los Angeles, US",
    platforms: [
      { name: "Instagram", followers: "1.2M" },
      { name: "TikTok", followers: "850K" },
      { name: "YouTube", followers: "420K" },
    ],
  },
  {
    name: "Marcus Chen",
    avatar: "/avatars/2.png",
    niche: "Tech",
    location: "Singapore",
    platforms: [
      { name: "Instagram", followers: "842K" },
      { name: "TikTok", followers: "1.5M" },
      { name: "YouTube", followers: "2.1M" },
    ],
  },
  {
    name: "Marcus Chen",
    avatar: "/avatars/2.png",
    niche: "Tech",
    location: "Singapore",
    platforms: [
      { name: "Instagram", followers: "842K" },
      { name: "TikTok", followers: "1.5M" },
      { name: "YouTube", followers: "2.1M" },
    ],
  },
  {
    name: "Marcus Chen",
    avatar: "/avatars/2.png",
    niche: "Tech",
    location: "Singapore",
    platforms: [
      { name: "Instagram", followers: "842K" },
      { name: "TikTok", followers: "1.5M" },
      { name: "YouTube", followers: "2.1M" },
    ],
  },
  {
    name: "Marcus Chen",
    avatar: "/avatars/2.png",
    niche: "Tech",
    location: "Singapore",
    platforms: [
      { name: "Instagram", followers: "842K" },
      { name: "TikTok", followers: "1.5M" },
      { name: "YouTube", followers: "2.1M" },
    ],
  },
  {
    name: "Marcus Chen",
    avatar: "/avatars/2.png",
    niche: "Tech",
    location: "Singapore",
    platforms: [
      { name: "Instagram", followers: "842K" },
      { name: "TikTok", followers: "1.5M" },
      { name: "YouTube", followers: "2.1M" },
    ],
  },
   {
    name: "Marcus Chen",
    avatar: "/avatars/2.png",
    niche: "Tech",
    location: "Singapore",
    platforms: [
      { name: "Instagram", followers: "842K" },
      { name: "TikTok", followers: "1.5M" },
      { name: "YouTube", followers: "2.1M" },
    ],
  },
  
  
];

export default function CreatorsGrid() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Recommended Creators</h2>
        <p>Showing 1,284 results based on your preferences</p>
      </div>

      <div className={styles.grid}>
        {creators.map((creator, index) => (
          <CreatorCard key={index} {...creator} />
        ))}
      </div>

      <div className={styles.loadMore}>
        <button>Load More Creators</button>
      </div>
    </section>
  );
}