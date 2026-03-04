"use client";

import styles from "./AddPlatformModal.module.scss";

export default function AddPlatformModal({ close }: { close: () => void }) {
  return (
    <div className={styles.overlay} onClick={close}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Add Platform</h3>

        <div className={styles.form}>
          <div className={styles.field}>
            <label>Platform</label>
            <select>
              <option>Instagram</option>
              <option>YouTube</option>
              <option>TikTok</option>
              <option>LinkedIn</option>
              <option>Facebook</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Profile Link</label>
            <input placeholder="https://..." />
          </div>

          <div className={styles.field}>
            <label>Audience Count</label>
            <input placeholder="120K / 2.3M" />
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={close}>Cancel</button>
          <button className={styles.save}>Add Platform</button>
        </div>
      </div>
    </div>
  );
}