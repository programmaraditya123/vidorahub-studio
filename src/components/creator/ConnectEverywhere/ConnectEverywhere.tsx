import SocialCard from "../SocialCard/SocialCard";
import styles from "./ConnectEverywhere.module.scss";
import {
  Instagram,
  Youtube,
  Music2,
  Mail,
} from "lucide-react";

export default function ConnectEverywhere() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Connect Everywhere</h2>

      <div className={styles.grid}>
        <SocialCard
          platform="Instagram"
          value="1.2M Fans"
          href="#"
          icon={
            <div style={{ background: "#E1306C" }} className={styles.iconBox}>
              <Instagram size={18} color="white" />
            </div>
          }
        />

        <SocialCard
          platform="YouTube"
          value="850K Subs"
          href="#"
          icon={
            <div style={{ background: "#FF0000" }} className={styles.iconBox}>
              <Youtube size={18} color="white" />
            </div>
          }
        />

        <SocialCard
          platform="TikTok"
          value="2.1M Likes"
          href="#"
          icon={
            <div style={{ background: "#000000" }} className={styles.iconBox}>
              <Music2 size={18} color="white" />
            </div>
          }
        />

        <SocialCard
          platform="Newsletter"
          value="15K Weekly"
          href="#"
          icon={
            <div style={{ background: "#2563eb" }} className={styles.iconBox}>
              <Mail size={18} color="white" />
            </div>
          }
        />
      </div>
    </section>
  );
}