// import CreatorProfileCard from "@/src/components/CreatorProfile/CreatorProfileCard/CreatorProfileCard";
// import BrandExperience from "@/src/components/CreatorProfile/FeaturedContent/BrandExperience";
// import FeaturedContent from "@/src/components/CreatorProfile/FeaturedContent/FeaturedContent";
import CreatorProfileCard from '@/components/CreatorProfile/CreatorProfileCard/CreatorProfileCard';
import styles from '../../page.module.css'
import FeaturedContent from '@/components/CreatorProfile/FeaturedContent/FeaturedContent';
import BrandExperience from '@/components/CreatorProfile/FeaturedContent/BrandExperience';
import Footer from '@/components/Creator/Footer/Footer';
// import Footer from "@/src/components/Creator/Footer/Footer";

const page = () => {
  return (
    <>
    <div className={styles.page}>
      <div className={styles.ProfileContainer}>
      <CreatorProfileCard />
      <div className={styles.secondContainer}>
      <FeaturedContent
        content={[
          {
            title: "Next-Gen Workspace Setup",
            description:
              "A deep dive into the minimalist setup that boosted productivity.",
            image: "/content1.jpg",
            views: "45K",
            likes: "12K",
          },
          {
            title: "The Future of Wearables",
            description:
              "Reviewing the latest smart accessories and their impact.",
            image: "/content2.jpg",
            views: "62K",
            likes: "18K",
          },
        ]}
      />

      <BrandExperience />
      </div>
      </div>
      <Footer/>
      </div>
    </>
  );
};

export default page;
