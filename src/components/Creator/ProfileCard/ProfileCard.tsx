"use client";

import styles from "./ProfileCard.module.scss";
import Image from "next/image";
import { useState, useRef } from "react";
import { Pencil, MapPin, User2Icon } from "lucide-react";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { uploadProfileImage } from "@/lib/CreatorInfo";

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
  const [preview, setPreview] = useState<string | null>(profilePicUrl || null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    await uploadProfileImage(file);
    

    // later upload API here
    // uploadProfileImage(file)
  };
//   console.log("preview", preview);
//  console.log("profilePicUrl", profilePicUrl);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.avatarBox}>
            {profilePicUrl ? (
              <Image
                src={profilePicUrl}
                alt="avatar"
                width={84}
                height={84}
                className={styles.avatar}
              />
            ) : (
              <User2Icon size={84} />
            )}

            {/* EDIT IMAGE BUTTON */}
            <button
              className={styles.avatarEdit}
              onClick={openFilePicker}
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