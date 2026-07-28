"use client";

import { useGetCreatorByIdQuery } from "@/store/api/creatorApi";
import CreatorProfileCard from "@/components/CreatorProfile/CreatorProfileCard/CreatorProfileCard";
import FeaturedContent from "@/components/CreatorProfile/FeaturedContent/FeaturedContent";
import BrandExperience from "@/components/CreatorProfile/FeaturedContent/BrandExperience";
import Footer from "@/components/Creator/Footer/Footer";
import type { BrandExperience as BrandExperienceEntity, ShowcaseContent, SocialPlatform } from "@/lib/seo/types";
import styles from "../../page.module.css";

type Props = {
  creatorId: string;
};

export default function CreatorProfileClient({ creatorId }: Props) {
  const { data, isLoading, isError } = useGetCreatorByIdQuery(creatorId);

  if (isLoading) return <p>Loading creator...</p>;
  if (isError) return <p>Creator not found</p>;

  const creator = data?.creator;

  const instagram = creator?.platforms?.find(
    (p: SocialPlatform) => p.platform?.toLowerCase() === "instagram",
  );

  const youtube = creator?.platforms?.find(
    (p: SocialPlatform) => p.platform?.toLowerCase() === "youtube",
  );

  const whatsapp = creator?.platforms?.find(
    (p: SocialPlatform) => p.platform?.toLowerCase() === "whatsapp",
  );

  const showcase =
    creator?.showCaseContent?.map((item: ShowcaseContent) => ({
      title: item.title,
      description: item.platform,
      image: item.thumbnailUrl,
      views: item.views,
      likes: "",
      link: item?.link,
    })) || [];

  const brands = creator?.experience?.map((exp: BrandExperienceEntity) => exp.name) || [];

  const collaborations =
    creator?.experience?.map((exp: BrandExperienceEntity) => ({
      title: `${exp.name} (${exp.campaign})`,
      description: `${exp.deliverables} - ${exp.status}`,
    })) || [];

  return (
    <div className={styles.page}>
      <article className={styles.ProfileContainer}>
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
          platforms={creator?.platforms || []}
        />

        <div className={styles.secondContainer}>
          {showcase.length > 0 && <FeaturedContent content={showcase} />}

          {brands.length > 0 && (
            <BrandExperience
              brandExperienceTitle="Brand Experience"
              brands={brands}
              collaborationsTitle="Previous Collaborations"
              collaborations={collaborations}
            />
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}
