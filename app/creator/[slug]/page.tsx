"use client";

import { useParams } from "next/navigation";
import { useGetCreatorByIdQuery } from "@/store/api/creatorApi";

import CreatorProfileCard from "@/components/CreatorProfile/CreatorProfileCard/CreatorProfileCard";
import FeaturedContent from "@/components/CreatorProfile/FeaturedContent/FeaturedContent";
import BrandExperience from "@/components/CreatorProfile/FeaturedContent/BrandExperience";
import Footer from "@/components/Creator/Footer/Footer";

import styles from "../../page.module.css";

export default function Page() {
  const params = useParams();
  const creatorId = params?.slug as string;

  const { data, isLoading, isError } = useGetCreatorByIdQuery(creatorId);

  if (isLoading) return <p>Loading creator...</p>;
  if (isError) return <p>Creator not found</p>;

  const creator = data?.creator;

  /* ================= PLATFORM EXTRACTION ================= */

  const instagram = creator?.platforms?.find(
    (p: any) => p.platform.toLowerCase() === "instagram"
  );

  const youtube = creator?.platforms?.find(
    (p: any) => p.platform.toLowerCase() === "youtube"
  );

  const whatsapp = creator?.platforms?.find(
    (p: any) => p.platform.toLowerCase() === "whatsapp"
  );

  /* ================= SHOWCASE CONTENT ================= */

  const showcase =
    creator?.showCaseContent?.map((item: any) => ({
      title: item.title,
      description: item.platform,
      image: item.thumbnailUrl,
      views: item.views,
      likes: "",
    })) || [];

  /* ================= BRAND EXPERIENCE ================= */

  const brands =
    creator?.experience?.map((exp: any) => exp.name) || [];

  const collaborations =
    creator?.experience?.map((exp: any) => ({
      title: `${exp.name} (${exp.campaign})`,
      description: `${exp.deliverables} • ${exp.status}`,
    })) || [];

  return (
    <div className={styles.page}>
      <div className={styles.ProfileContainer}>
        
        {/* CREATOR PROFILE */}

        <CreatorProfileCard
          name={creator?.name}
          avatar={creator?.profilePicUrl}
          role={creator?.tags?.join(", ")}
          location={creator?.location}
          bio={creator?.bio}
          instagram={instagram?.url}
          whatsapp={whatsapp?.url}
          igFollowers={instagram?.audience}
          ytSubs={youtube?.audience}
          // engagementRate={null}
        />

        <div className={styles.secondContainer}>
          
          {/* SHOWCASE CONTENT */}

          {showcase.length > 0 && (
            <FeaturedContent content={showcase} />
          )}

          {/* BRAND EXPERIENCE */}

          {brands.length > 0 && (
            <BrandExperience
              brandExperienceTitle="Brand Experience"
              brands={brands}
              collaborationsTitle="Previous Collaborations"
              collaborations={collaborations}
            />
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}