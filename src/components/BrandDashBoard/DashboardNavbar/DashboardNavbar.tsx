"use client";

import styles from "./DashboardNavbar.module.scss";
import { Search, Bell, Plus } from "lucide-react";

export default function DashboardNavbar() {
  return (
    <div className={styles.navbar}>
      
      {/* LEFT SECTION */}
      <div className={styles.left}>
        <h1>
          Dashboard 
          {/* <span>/ Overview</span> */}
        </h1>
      </div>

      {/* RIGHT SECTION */}
      <div className={styles.right}>
        
        {/* Search */}
        {/* <div className={styles.searchBox}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search campaigns, creators..."
          />
        </div> */}

        {/* Notification */}
        <button className={styles.iconBtn}>
          <Bell size={18} />
          <span className={styles.dot}></span>
        </button>

        {/* CTA Button */}
        <button className={styles.createBtn}>
          <Plus size={18} />
          Create Campaign
        </button>
      </div>
    </div>
  );
}