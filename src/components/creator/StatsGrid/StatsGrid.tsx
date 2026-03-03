import StatsCard from "../StatsCard/StatsCard";
import styles from "./StatsGrid.module.scss";

type Stat = {
  label: string;
  value: string;
};

type StatsGridProps = {
  stats: Stat[];
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className={styles.grid}>
      {stats.map((stat, index) => (
        <StatsCard key={index} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
}