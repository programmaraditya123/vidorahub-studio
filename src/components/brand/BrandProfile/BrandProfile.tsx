"use client";

import styles from "./BrandProfile.module.scss";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetBrandByIdQuery } from "@/store/api/creatorApi";

import {
  CheckCircle,
  Mail,
  Share2,
  MapPin,
  Globe,
  Briefcase,
  Users,
  X,
  Copy,
} from "lucide-react";

export default function BrandProfile() {
  const params = useParams();
  const brandId = params?.slug as string;
 
  // console.log("Brand ID from URL:", brandId);
  // console.log("params:", params)
  const { data, isLoading, isError } = useGetBrandByIdQuery(brandId);

  const brand = data?.brand;

  const [shareOpen, setShareOpen] = useState(false);

  const profileUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/brand/${brandId}`
      : "";

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl);
  };

  if (isLoading) return <p className={styles.loading}>Loading brand...</p>;
  if (isError || !brand)
    return <p className={styles.error}>Brand not found</p>;

  return (
    <div className={styles.wrapper}>
      {/* COVER */}

      <div className={styles.cover}></div>

      <div className={styles.container}>
        {/* HEADER */}

        <div className={styles.header}>
          <div className={styles.brandInfo}>
            <div className={styles.logoWrapper}>
              <Image
                src={brand.profilePicUrl || "/brand-logo.png"}
                alt={brand.name}
                width={80}
                height={80}
                className={styles.logo}
              />

              <CheckCircle size={18} className={styles.verify} />
            </div>

            <div>
              <h1>{brand.name}</h1>

              <p className={styles.tagline}>
                {brand.category || "Brand on VidoraHub"}
              </p>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.contactBtn}>
              <Mail size={16} />
              Contact Brand
            </button>

            <button
              className={styles.shareBtn}
              onClick={() => setShareOpen(true)}
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* CONTENT */}

        <div className={styles.content}>
          {/* BIO */}

          <div className={styles.mission}>
            <h3>About</h3>

            <p>{brand.bio || "This brand hasn't added a bio yet."}</p>
          </div>

          {/* BRAND INFO */}

          <div className={styles.card}>
            <h4>BRAND INFO</h4>

            <div className={styles.item}>
              <MapPin size={16} />
              <div>
                <span>Location</span>
                <strong>{brand.location || "Not provided"}</strong>
              </div>
            </div>

            <div className={styles.item}>
              <Briefcase size={16} />
              <div>
                <span>Industry</span>
                <strong>{brand.category}</strong>
              </div>
            </div>

            <div className={styles.item}>
              <Users size={16} />
              <div>
                <span>Partnerships</span>
                <strong>Open for Creator Collaborations</strong>
              </div>
            </div>

            <div className={styles.item}>
              <Globe size={16} />
              <div>
                <span>Platform</span>
                <strong>VidoraHub</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SHARE MODAL */}

      {shareOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Share Brand Profile</h3>

              <button
                onClick={() => setShareOpen(false)}
                className={styles.close}
              >
                <X size={18} />
              </button>
            </div>

            <p className={styles.modalText}>
              Share this brand with creators and collaborators.
            </p>

            <div className={styles.linkBox}>
              <input value={profileUrl} readOnly />

              <button onClick={copyLink}>
                <Copy size={16} />
                Copy
              </button>
            </div>

            <div className={styles.socials}>
              <a
                href={`https://twitter.com/intent/tweet?url=${profileUrl}`}
                target="_blank"
              >
                Twitter
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${profileUrl}`}
                target="_blank"
              >
                LinkedIn
              </a>

              <a
                href={`https://wa.me/?text=${profileUrl}`}
                target="_blank"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}