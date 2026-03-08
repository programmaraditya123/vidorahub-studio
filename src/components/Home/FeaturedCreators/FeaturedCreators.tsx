"use client";

import styles from "./FeaturedCreators.module.scss";
import Image from "next/image";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useGetAllCreatorsQuery } from "@/store/api/creatorApi";
import vidoraicon from '../../../../app/favicon.ico'

export default function FeaturedCreators() {

  const { data, isLoading } = useGetAllCreatorsQuery({
    page: 1,
    limit: 4
  });

  const creators = data?.creators || [];

  if (isLoading) {
    return <p className={styles.loading}>Loading creators...</p>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2>Featured Creators</h2>
          <p>Discover the top trending voices on VidoraHub</p>
        </div>

        <Link href="/search">
          <button className={styles.viewAll}>View All →</button>
        </Link>
      </div>

      <div className={styles.grid}>
        {creators.map((creator: any) => {

          const instagram = creator.platforms?.find(
            (p: any) => p.platform === "Instagram"
          )?.audience;

          const youtube = creator.platforms?.find(
            (p: any) => p.platform === "YouTube"
          )?.audience;

          const linkedin = creator.platforms?.find(
            (p: any) => p.platform === "LinkedIn"
          )?.audience;

          const facebook = creator.platforms?.find(
            (p: any) => p.platform === "Facebook"
          )?.audience;

          const vidorahub = creator.platforms?.find(
            (p: any) => p.platform === "VidoraHub"
          )?.audience;

          return (
            <div key={creator._id} className={styles.card}>
              <div className={styles.imageBox}>
                <Image
                  src={creator.profilePicUrl || "/creators/default.jpg"}
                  alt={creator.name}
                  fill
                  className={styles.image}
                />

                <span className={styles.tag}>
                  {creator.tags?.[0] || "CREATOR"}
                </span>
              </div>

              <div className={styles.content}>
                <h3>{creator.name}</h3>
                <p>{creator.bio}</p>

                <div className={styles.socials}>
                  {instagram && (
                    <div>
                      <Instagram size={14} />
                      <span>{instagram}</span>
                    </div>
                  )}

                  {youtube && (
                    <div>
                      <Youtube size={14} />
                      <span>{youtube}</span>
                    </div>
                  )}

                  {linkedin && (
                    <div>
                      <Linkedin size={14} />
                      <span>{linkedin}</span>
                    </div>
                  )}

                  {facebook && (
                    <div>
                      <Facebook size={14} />
                      <span>{facebook}</span>
                    </div>
                  )}
                  {vidorahub && (
                    <div>
                      <Image src={vidoraicon} alt="VidoraHub" width={14} height={14} />
                      <span>{vidorahub}</span>
                    </div>
                  )}
                </div>

                <Link href={`/creator/${creator._id}`}>
                  <button className={styles.profileBtn}>
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}