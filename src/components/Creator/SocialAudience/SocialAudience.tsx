"use client";

import styles from "./SocialAudience.module.scss";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import AddPlatformModal from "../AddPlatformModal/AddPlatformModal";
import { platformConfig } from "@/components/utils/platformConfig";
import Image from "next/image";
import { formatAudience } from "@/components/utils/gloablFunctions";

interface Platform {
  platform: string;
  audience: string;
  url: string;
}

export default function SocialAudience({ data }: { data: Platform[] }) {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Platform | null>(null);

  const handleEdit = (p: Platform) => {
    setEditData(p);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3>Social & Audience</h3>

          <button className={styles.addBtn} onClick={handleAdd}>
            Add Platform
          </button>
        </div>

        <div className={styles.grid}>
          {data?.map((p, i) => {
            const config = platformConfig[p.platform];
            const Icon = config?.icon;

            return (
              <div key={i} className={styles.card}>
                <div className={styles.top}>
                  {config?.isImage ? (
                    <Image src={Icon} alt="vidorahub" width={24} height={24} />
                  ) : (
                    Icon && <Icon size={24} />
                  )}

                  <a href={p.url} target="_blank">
                    <ExternalLink size={18} />
                  </a>
                </div>

                <h2>{formatAudience(p.audience)}</h2>

                <p>
                  {p.platform} {config?.label}
                </p>

                <button
                  className={styles.updateBtn}
                  onClick={() => handleEdit(p)}
                >
                  Update
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {open && (
        <AddPlatformModal close={() => setOpen(false)} editData={editData} />
      )}
    </>
  );
}
