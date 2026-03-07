"use client";

import { useAddExperienceMutation } from "@/store/api/creatorApi";
import styles from "./AddBrandModal.module.scss";
import { X } from "lucide-react";
import { useState } from "react";

type AddBrandModalProps = {
  close: () => void;
};

type BrandForm = {
  name: string;
  campaign: string;
  status: "completed" | "progress" | "active";
  deliverables: string;
};

export default function AddBrandModal({ close }: AddBrandModalProps) {
  const [form, setForm] = useState<BrandForm>({
    name: "",
    campaign: "",
    status: "active",
    deliverables: "",
  });

  const [error, setError] = useState("");

  const [addBrand, { isLoading }] = useAddExperienceMutation();

  const updateField = (key: keyof BrandForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.name.trim()) {
      setError("Brand name is required");
      return;
    }

    if (!form.campaign.trim()) {
      setError("Campaign type is required");
      return;
    }

    try {
      await addBrand(form).unwrap();

      close();
    } catch (err: any) {
      setError(err?.message || "Failed to add brand experience");
    }
  };

  return (
    <div className={styles.overlay} onClick={close}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className={styles.header}>
          <h3>Add Brand Experience</h3>

          <button
            onClick={close}
            className={styles.close}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className={styles.form}>
          <div className={styles.field}>
            <label>Brand Name</label>
            <input
              value={form.name}
              placeholder="Samsung, Nike..."
              onChange={(e) =>
                updateField("name", e.target.value)
              }
            />
          </div>

          <div className={styles.field}>
            <label>Campaign Type</label>
            <input
              value={form.campaign}
              placeholder="Review / Sponsorship"
              onChange={(e) =>
                updateField("campaign", e.target.value)
              }
            />
          </div>

          <div className={styles.field}>
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                updateField(
                  "status",
                  e.target.value as BrandForm["status"]
                )
              }
            >
              <option value="completed">Completed</option>
              <option value="progress">In Progress</option>
              <option value="active">Active</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Deliverables</label>
            <input
              value={form.deliverables}
              placeholder="2x YT video, 1x reel"
              onChange={(e) =>
                updateField("deliverables", e.target.value)
              }
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}
        </div>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <button onClick={close} disabled={isLoading}>
            Cancel
          </button>

          <button
            className={styles.save}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Brand"}
          </button>
        </div>
      </div>
    </div>
  );
}