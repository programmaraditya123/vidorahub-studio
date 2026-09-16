import styles from "./UploadLoader.module.scss";

export default function UploadLoader() {
  return (
    <div className={styles.overlay} role="status" aria-label="Uploading profile picture">
      <span className={styles.spinner} aria-hidden="true" />
    </div>
  );
}
