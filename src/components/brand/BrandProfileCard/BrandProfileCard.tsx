"use client";

import styles from "./BrandProfileCard.module.scss";
import Image from "next/image";
import { Pencil, User } from "lucide-react";
import { useState, useRef } from "react";
import EditBrandModal from "../EditBrandModal/EditBrandModal";
import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";
import UploadLoader from "@/components/ui/UploadLoader/UploadLoader";

type Brand = {
  name: string;
  category: string;
  description: string;
  established: number;
  logo?: string;
};

export default function BrandProfileCard({
  name,
  category,
  description,
  established,
  logo,
}: Brand) {

  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { imageUrl, isUploading, handleImageChange } = useProfileImageUpload(logo);

  const handleImageClick = () => {
    if (!isUploading) fileRef.current?.click();
  };

  return (
    <>
      <div className={styles.card}>

        {/* EDIT PROFILE BUTTON */}
        <button
          className={styles.editBtn}
          onClick={() => setOpen(true)}
        >
          <Pencil size={14} />
          Edit
        </button>

        <div className={styles.watermark}></div>

        <div className={styles.content}>

          {/* LOGO */}

          <div className={styles.logoWrapper} aria-busy={isUploading}>

            <div className={styles.logo}>

              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="brand"
                  width={64}
                  height={64}
                />
              ) : (
                <User size={48} />
              )}

            </div>
            {isUploading && <UploadLoader />}

            {/* IMAGE EDIT BUTTON */}

            <button
              className={styles.logoEdit}
              onClick={handleImageClick}
              type="button"
              disabled={isUploading}
              aria-label="Change profile picture"
            >
              <Pencil size={14} />
            </button>

            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={handleImageChange}
              disabled={isUploading}
            />

          </div>

          <h2>{name}</h2>

          <p className={styles.category}>{category}</p>

          <p className={styles.description}>{description}</p>

          <div className={styles.badges}>
            <span className={styles.established}>
              Established {established}
            </span>

            <span className={styles.verified}>
              Verified Brand
            </span>
          </div>

        </div>
      </div>

      {open && (
        <EditBrandModal
          close={() => setOpen(false)}
          name={name}
          category={category}
          description={description}
          established={established}
        />
      )}
    </>
  );
}
