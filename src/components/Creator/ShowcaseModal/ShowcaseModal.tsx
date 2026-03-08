"use client";

import { useAddShowcaseContentMutation } from "@/store/api/creatorApi";
import styles from "./ShowcaseModal.module.scss";
import { X } from "lucide-react";
import { useState } from "react";

export default function ShowcaseModal({ close }: { close: () => void }) {

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("YouTube");
  const [link, setLink] = useState("");
  const [views, setViews] = useState("");

  const [error, setError] = useState("");

  const [addShowcase, { isLoading }] = useAddShowcaseContentMutation();

  const handleSubmit = async () => {

    if (!thumbnail) {
      setError("Thumbnail is required");
      return;
    }

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!platform.trim()) {
      setError("Platform is required");
      return;
    }

    if (!link.trim()) {
      setError("Content link is required");
      return;
    }

    if (!views.trim()) {
      setError("Views count is required");
      return;
    }

    try {

      setError("");

      const formData = new FormData();

      formData.append("thumbnail", thumbnail);
      formData.append("title", title);
      formData.append("platform", platform);
      formData.append("link", link);
      formData.append("views", views);

      await addShowcase(formData).unwrap();

      close();

    } catch (err: any) {
      setError(err?.message || "Failed to add showcase");
    }
  };

  return (
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <div className={styles.header}>
          <h3>Add Portfolio Item</h3>

          <button onClick={close} className={styles.close}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.form}>

          <div className={styles.field}>
            <label>Thumbnail *</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setThumbnail(e.target.files?.[0] || null)
              }
            />
          </div>

          <div className={styles.field}>
            <label>Title *</label>

            <input
              value={title}
              placeholder="Video title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>Platform *</label>

            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option>YouTube</option>
              <option>VidoraHub</option>
              <option>Instagram</option>
              <option>TikTok</option>
              <option>LinkedIn</option>
              <option>Facebook</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Content Link *</label>

            <input
              value={link}
              placeholder="https://..."
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>Views *</label>

            <input
              value={views}
              placeholder="120K / 2.3M"
              onChange={(e) => setViews(e.target.value)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

        </div>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={close}>
            Cancel
          </button>

          <button
            className={styles.save}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Showcase"}
          </button>
        </div>

      </div>
    </div>
  );
}