import CollabCard from "../CollabCard/CollabCard";
import styles from "./CollaborationPortfolio.module.scss";

type Collab = {
  brand: string;
  title: string;
  description: string;
  thumbnail: string;
};

type Props = {
  collaborations: Collab[];
};

export default function CollaborationPortfolio({
  collaborations,
}: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Collaboration Portfolio</h2>
        <span className={styles.subText}>Selected Works</span>
      </div>

      <div className={styles.grid}>
        {collaborations.map((item, index) => (
          <CollabCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}