"use client";

import styles from "./EditBrandModal.module.scss";
import { X } from "lucide-react";

type Props = {
  close: () => void;
};

export default function EditBrandModal({ close }: Props) {
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
          <input placeholder="Brand Name" />

          <input placeholder="Category" />

          <textarea
            rows={4}
            placeholder="Brand Description"
          />

          <input placeholder="Established Year" />
        </div>

        <div className={styles.actions}>
          <button onClick={close}>Cancel</button>

          <button className={styles.save}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}