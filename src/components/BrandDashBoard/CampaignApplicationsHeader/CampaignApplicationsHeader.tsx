"use client";

import styles from "./CampaignApplicationsHeader.module.scss";
import { Download } from "lucide-react";

export default function CampaignApplicationsHeader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h2>Campaign Applications</h2>
        <p>
          You have <span>124 total pending</span> requests from creators.
        </p>
      </div>

      <button className={styles.exportBtn}>
        <Download size={16} />
        Export CSV
      </button>
    </div>
  );
}