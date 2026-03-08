"use client";

import { useAddBrandMutation } from "@/store/api/creatorApi";
import styles from "./EditBrandModal.module.scss";
import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  close: () => void;
  name: string;
  category: string;
  description: string;
  established: number;
};

export default function EditBrandModal({
  close,
  name,
  category,
  description,
  established,
}: Props) {

  const [brandName, setBrandName] = useState(name);
  const [brandCategory, setBrandCategory] = useState(category);
  const [brandDescription, setBrandDescription] = useState(description);
  const [brandEstablished, setBrandEstablished] = useState(established);
 const [addBrand, { isLoading }] = useAddBrandMutation();

  const handleSave = async () => {
    const payload = {
      name: brandName,
      category: brandCategory,
      bio : brandDescription,
      established: brandEstablished,
    };

    // console.log("Updated brand:", payload);
    await addBrand(payload).unwrap();

    close();
  };

  return (
    <div className={styles.overlay} onClick={close}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3>Edit Brand Profile</h3>

          <button onClick={close}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.form}>
          <input
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Brand Name"
          />

          <input
            value={brandCategory}
            onChange={(e) => setBrandCategory(e.target.value)}
            placeholder="Category"
          />

          <textarea
            rows={4}
            value={brandDescription}
            onChange={(e) => setBrandDescription(e.target.value)}
            placeholder="Brand Description"
          />

          <input
            type="number"
            value={brandEstablished}
            onChange={(e) =>
              setBrandEstablished(Number(e.target.value))
            }
            placeholder="Established Year"
          />
        </div>

        <div className={styles.actions}>
          <button onClick={close}>Cancel</button>

          <button
            className={styles.save}
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}