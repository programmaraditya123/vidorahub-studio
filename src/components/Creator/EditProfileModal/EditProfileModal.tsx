"use client";

import { useState } from "react";
import styles from "./EditProfileModal.module.scss";
import { X } from "lucide-react";
import { addCreatorBasicInfo } from "@/lib/CreatorInfo";
import { useRouter } from "next/navigation";
import { useAddCreatorBasicInfoMutation } from "@/store/api/creatorApi";

type ProfileProps = {
  name: string;
  bio: string;
  tags: string[];
  location?: string;
  close: () => void;
};

type FormState = {
  name: string;
  bio: string;
  tags: string[];
  location?: string;
};

export default function EditProfileModal({
  name,
  bio,
  tags,
  location,
  close,
}: ProfileProps) {
  const [form, setForm] = useState<FormState>({
    name,
    bio,
    tags,
    location,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data] =   useAddCreatorBasicInfoMutation();

  const updateField = (field: keyof FormState, value: string | string[]) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // const res = await addCreatorBasicInfo({ name: form.name, bio: form.bio, tags: form.tags, location: form.location || "" });
      
      await data({
        name: form.name,
        bio: form.bio,
        tags: form.tags,
        location: form.location || "",
      });

      close();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className={styles.header}>
          <h3>Edit Profile</h3>

          <button className={styles.closeBtn} onClick={close}>
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className={styles.form}>
          <div className={styles.field}>
            <label>Name</label>
            <input
              value={form.name}
              placeholder="Enter your name"
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>Location</label>
            <input
              value={form.location || ""}
              placeholder="City, Country"
              onChange={(e) => updateField("location", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <input
              value={form.tags.join(", ")}
              placeholder="Tech, Travel, Food..."
              onChange={(e) =>
                updateField(
                  "tags",
                  e.target.value.split(",").map((t) => t.trim())
                )
              }
            />
          </div>

          <div className={styles.field}>
            <label>Bio</label>
            <textarea
              rows={3}
              value={form.bio}
              placeholder="Tell about yourself"
              onChange={(e) => updateField("bio", e.target.value)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={close}>
            Cancel
          </button>

          <button
            className={styles.save}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
}