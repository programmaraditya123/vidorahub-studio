"use client";

import styles from "./BrandExperience.module.scss";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import AddBrandModal from "../AddBrandModal/AddBrandModal";
import { useDeleteExperienceMutation } from "@/store/api/creatorApi";

export type BrandItem = {
  _id: string;
  name: string;
  short: string;
  campaign: string;
  status: "completed" | "progress" | "active";
  deliverables: string;
};

type Props = {
  data: BrandItem[];
};

export default function BrandExperience({ data }: Props) {
  const [open, setOpen] = useState(false);

  const [deleteBrandExperience, { isLoading }] =
    useDeleteExperienceMutation();

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this brand experience?");
    if (!confirmDelete) return;

    try {
      await deleteBrandExperience(id).unwrap();
    } catch (err) {
      console.error("Failed to delete brand experience", err);
    }
  };

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

          {data?.map((brand) => (
            <div key={brand._id} className={styles.row}>
              <div className={styles.brand}>
                {/* <div className={styles.avatar}>
                  // {brand.short}
                </div> */}
                <span>{brand.name}</span>
              </div>

              <span>{brand.campaign}</span>

              <span
                className={`${styles.status} ${styles[brand.status]}`}
              >
                {brand.status.replace("_", " ")}
              </span>

              <span>{brand.deliverables}</span>

              <button
                className={styles.delete}
                disabled={isLoading}
                onClick={() => handleDelete(brand._id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <AddBrandModal close={() => setOpen(false)} />
      )}
    </>
  );
}