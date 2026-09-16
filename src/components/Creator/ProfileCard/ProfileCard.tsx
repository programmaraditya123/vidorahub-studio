"use client";

import styles from "./ProfileCard.module.scss";
import Image from "next/image";
import { useState, useRef } from "react";
import { Pencil, MapPin, User2Icon } from "lucide-react";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";
import UploadLoader from "@/components/ui/UploadLoader/UploadLoader";

type profileProp = {
  name: string;
  bio: string;
  tags: string[];
  location?: string;
  profilePicUrl?: string;
};

export default function ProfileCard({
  name,
  bio,
  tags,
  location,
  profilePicUrl,
}: profileProp) {
  const [open, setOpen] = useState(false);
  const { imageUrl, isUploading, handleImageChange } = useProfileImageUpload(profilePicUrl);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    if (!isUploading) fileInputRef.current?.click();
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.avatarBox} aria-busy={isUploading}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="avatar"
                width={84}
                height={84}
                className={styles.avatar}
              />
            ) : (
              <User2Icon size={84} />
            )}
            {isUploading && <UploadLoader />}

            {/* EDIT IMAGE BUTTON */}
            <button
              className={styles.avatarEdit}
              onClick={openFilePicker}
              type="button"
              disabled={isUploading}
              aria-label="Change profile picture"
            >
              <Pencil size={12} />
            </button>

            {/* HIDDEN INPUT */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
              disabled={isUploading}
            />
          </div>

          <div className={styles.info}>
            <div className={styles.nameRow}>
              <h2>{name}</h2>
              <span className={styles.badge}>Creator</span>
            </div>

            {location && (
              <div className={styles.location}>
                <MapPin size={14} />
                <span>{location}</span>
              </div>
            )}

            <p className={styles.bio}>{bio}</p>

            <div className={styles.tags}>
              {tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <button className={styles.editBtn} onClick={() => setOpen(true)}>
          <Pencil size={14} />
          Edit Profile
        </button>
      </div>

      {open && (
        <EditProfileModal
          close={() => setOpen(false)}
          bio={bio}
          name={name}
          tags={tags}
          location={location}
        />
      )}
    </>
  );
}
