"use client";

import styles from "./BrandExperience.module.scss";
import { Plus, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import AddBrandModal from "../AddBrandModal/AddBrandModal";

const brands = [
  {
    name: "Samsung Global",
    short: "SAM",
    campaign: "Unboxing & Review",
    status: "completed",
    deliverables: "2x YT Video, 1x Reel",
  },
  {
    name: "Razer Gaming",
    short: "RAZ",
    campaign: "Sponsorship",
    status: "progress",
    deliverables: "3x IG Stories",
  },
  {
    name: "Logitech G",
    short: "LOG",
    campaign: "Affiliate",
    status: "active",
    deliverables: "Monthly Recap",
  },
];

export default function BrandExperience() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3>Brand Experience</h3>

          <button
            className={styles.addBtn}
            onClick={() => setOpen(true)}
          >
            <Plus size={16} />
            Add Brand
          </button>
        </div>

        <div className={styles.table}>
          <div className={styles.head}>
            <span>Brand</span>
            <span>Campaign Type</span>
            <span>Status</span>
            <span>Deliverables</span>
            <span>Actions</span>
          </div>

          {brands.map((brand, i) => (
            <div key={i} className={styles.row}>
              <div className={styles.brand}>
                <div className={styles.avatar}>
                  {brand.short}
                </div>
                <span>{brand.name}</span>
              </div>

              <span>{brand.campaign}</span>

              <span className={`${styles.status} ${styles[brand.status]}`}>
                {brand.status.replace("_", " ")}
              </span>

              <span>{brand.deliverables}</span>

              <button className={styles.action}>
                <MoreHorizontal size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {open && <AddBrandModal close={() => setOpen(false)} />}
    </>
  );
}
