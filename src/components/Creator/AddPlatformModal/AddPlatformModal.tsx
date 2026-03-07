"use client";

import { addCreatorPlatform } from "@/lib/CreatorInfo";
import styles from "./AddPlatformModal.module.scss";
import { useState, useEffect } from "react";
import { useAddCreatorPlatformMutation } from '@/store/api/creatorApi';

export default function AddPlatformModal({
  close,
  editData,
}: {
  close: () => void;
  editData?: any;
}) {
  const [platform, setPlatform] = useState("VidoraHub");
  const [link, setLink] = useState("");
  const [audience, setAudience] = useState("");
  const [addPlatform] = useAddCreatorPlatformMutation();

  useEffect(() => {
    if (editData) {
      setPlatform(editData.platform);
      setLink(editData.url);
      setAudience(editData.audience);
    }
  }, [editData]);

  // console.log("88888888",{
  //     platform,
  //     link,
  //     audience,
  //   })

  const handleSave = async () => {
    const payload = {
      platform,
      link,
      audience,
    };

    // console.log(payload);
    // await addCreatorPlatform(payload);
    
    await addPlatform(payload);

    close();
  };

  return (
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>{editData ? "Update Platform" : "Add Platform"}</h3>

        <div className={styles.form}>
          <div className={styles.field}>
            <label>Platform</label>

            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              disabled={!!editData}
            >
              <option>VidoraHub</option>
              <option>Instagram</option>
              <option>YouTube</option>
              <option>TikTok</option>
              <option>LinkedIn</option>
              <option>Facebook</option>
              <option>Twitter/X</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Profile Link</label>

            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className={styles.field}>
            <label>Audience Count</label>

            <input
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="120K / 2.3M"
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={close}>Cancel</button>

          <button className={styles.save} onClick={handleSave}>
            {editData ? "Update" : "Add Platform"}
          </button>
        </div>
      </div>
    </div>
  );
}
