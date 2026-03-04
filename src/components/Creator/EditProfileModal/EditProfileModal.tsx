"use client";

import styles from "./EditProfileModal.module.scss";
import { X } from "lucide-react";

export default function EditProfileModal({ close }: { close: () => void }) {
  return (
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Edit Profile</h3>

          <button className={styles.closeBtn} onClick={close}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <label>Name</label>
            <input placeholder="Enter your name" />
          </div>

          <div className={styles.field}>
            <label>Location</label>
            <input placeholder="City, Country" />
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <input placeholder="Tech, Travel, Food..." />
          </div>

          <div className={styles.field}>
            <label>Bio</label>
            <textarea rows={3} placeholder="Tell about yourself" />
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={close}>
            Cancel
          </button>

          <button className={styles.save}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}