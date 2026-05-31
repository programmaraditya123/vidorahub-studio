"use client";

import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { useDeleteProductMutation } from "@/store/api/creatorApi";
import styles from "./DeleteProductModal.module.scss";

type DeleteProductModalProps = {
  productId: string;
  productName: string;
  close: () => void;
};

export default function DeleteProductModal({
  productId,
  productName,
  close,
}: DeleteProductModalProps) {
  const [deleteProduct, { isLoading, error }] = useDeleteProductMutation();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) close();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [close, isLoading]);

  const handleDelete = async () => {
    try {
      await deleteProduct(productId).unwrap();
      close();
    } catch {
      /* error shown below */
    }
  };

  return (
    <div className={styles.overlay} onClick={() => !isLoading && close()}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-labelledby="delete-product-title"
        aria-modal="true"
      >
        <button
          type="button"
          className={styles.close}
          onClick={close}
          disabled={isLoading}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className={styles.iconWrap}>
          <AlertTriangle size={24} />
        </div>

        <h3 id="delete-product-title">Remove product?</h3>
        <p>
          <strong>{productName}</strong> will be hidden from your store. You can
          list it again later if needed.
        </p>

        {(error as { message?: string })?.message && (
          <p className={styles.error}>
            {(error as { message?: string }).message}
          </p>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancel}
            onClick={close}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.delete}
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Removing…" : "Remove product"}
          </button>
        </div>
      </div>
    </div>
  );
}
