"use client";

import styles from "./CreatorProfileCard.module.scss";
import Image from "next/image";
import {
  MapPin,
  Send,
  Instagram,
  MessageSquare,
  Users,
  Youtube,
  TrendingUp,
} from "lucide-react";

type Props = {
  name?: string;
  avatar?: string;
  role?: string;
  location?: string;
  bio?: string;
  instagram?: string;
  whatsapp?: string;
  igFollowers?: string | number;
  ytSubs?: string | number;
  engagementRate?: string | number;
};

export default function CreatorProfileCard({
  name,
  avatar,
  role,
  location,
  bio,
  instagram,
  whatsapp,
  igFollowers,
  ytSubs,
  engagementRate,
}: Props) {
  return (
    <div className={styles.card}>
      {/* Avatar */}

      {avatar && (
        <div className={styles.avatarWrapper}>
          <Image
            src={avatar}
            alt={name || "creator"}
            width={110}
            height={110}
            className={styles.avatar}
          />

          <span className={styles.online}></span>
        </div>
      )}

      {/* Name */}

      {name && <h2 className={styles.name}>{name}</h2>}

      {role && <p className={styles.role}>{role}</p>}

      {/* Location */}

      {location && (
        <p className={styles.location}>
          <MapPin size={14} /> {location}
        </p>
      )}

      {/* Bio */}

      {bio && <p className={styles.bio}>{bio}</p>}

      {/* Proposal */}

      {name && (
        <button className={styles.proposalBtn}>
          <Send size={16} />
          Send Proposal
        </button>
      )}

      {/* Social Links */}

      {(instagram || whatsapp) && (
        <div className={styles.links}>
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              className={styles.linkBtn}
            >
              <Instagram size={16} />
              Instagram Portfolio
            </a>
          )}

          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              className={styles.linkBtn}
            >
              <MessageSquare size={16} />
              WhatsApp Business
            </a>
          )}
        </div>
      )}

      {/* Stats */}

      {(igFollowers || ytSubs || engagementRate) && (
        <div className={styles.stats}>
          {igFollowers && (
            <div className={styles.stat}>
              <Users size={18} />
              <div>
                <span>IG FOLLOWERS</span>
                <strong>{igFollowers}</strong>
              </div>
            </div>
          )}

          {ytSubs && (
            <div className={styles.stat}>
              <Youtube size={18} />
              <div>
                <span>YT SUBS</span>
                <strong>{ytSubs}</strong>
              </div>
            </div>
          )}

          {engagementRate && (
            <div className={styles.stat}>
              <TrendingUp size={18} />
              <div>
                <span>ENG. RATE</span>
                <strong>{engagementRate}</strong>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}