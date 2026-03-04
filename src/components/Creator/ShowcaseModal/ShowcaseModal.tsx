"use client";

import styles from "./ShowcaseModal.module.scss";
import { X } from "lucide-react";

export default function ShowcaseModal({ close }: { close: () => void }) {
  return (
    <div className={styles.overlay} onClick={close}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3>Add Portfolio Item</h3>

          <button onClick={close} className={styles.close}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <label>Thumbnail</label>
            <input type="file" />
          </div>

          <div className={styles.field}>
            <label>Title</label>
            <input placeholder="Video title" />
          </div>

          <div className={styles.field}>
            <label>Platform</label>
            <select>
              <option>YouTube</option>
              <option>Instagram</option>
              <option>TikTok</option>
              <option>LinkedIn</option>
              <option>Facebook</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Content Link</label>
            <input placeholder="https://..." />
          </div>

          <div className={styles.field}>
            <label>Views</label>
            <input placeholder="120K / 2.3M" />
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={close}>
            Cancel
          </button>

          <button className={styles.save}>
            Add Showcase
          </button>
        </div>
      </div>
    </div>
  );
}
