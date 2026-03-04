"use client";

import styles from "./AddBrandModal.module.scss";
import { X } from "lucide-react";

type AddBrandModalProps = { close: () => void; }

export default function AddBrandModal({ close } : AddBrandModalProps) {
  return (
    <div className={styles.overlay} onClick={close}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3>Add Brand Experience</h3>

          <button onClick={close} className={styles.close}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <label>Brand Name</label>
            <input placeholder="Samsung, Nike..." />
          </div>

          <div className={styles.field}>
            <label>Campaign Type</label>
            <input placeholder="Review / Sponsorship" />
          </div>

          <div className={styles.field}>
            <label>Status</label>
            <select>
              <option>Completed</option>
              <option>In Progress</option>
              <option>Active</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Deliverables</label>
            <input placeholder="2x YT video, 1x reel" />
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={close}>Cancel</button>
          <button className={styles.save}>Add Brand</button>
        </div>
      </div>
    </div>
  );
}
