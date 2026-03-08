"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./DiscoverBrands.module.scss";
import { useGetAllBrandsQuery } from "@/store/api/creatorApi";

type Brand = {
  _id: string;
  name: string;
  profilePicUrl: string;
  category: string;
  location: string;
  bio: string;
};

export default function DiscoverBrands() {
  const { data, isLoading, isError } = useGetAllBrandsQuery({});

  const brands: Brand[] = data?.brands || [];

  if (isLoading) {
    return <p className={styles.loading}>Loading brands...</p>;
  }

  if (isError) {
    return <p className={styles.error}>Failed to load brands</p>;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Discover Brands</h2>
        <p>
          Explore brands collaborating with creators for sponsorships,
          promotions, and partnerships.
        </p>
      </div>

      <div className={styles.grid}>
        {brands.map((brand) => (
          <div key={brand._id} className={styles.card}>
            
            <div className={styles.imageBox}>
              {brand.profilePicUrl ? (
                <Image
                  src={brand.profilePicUrl}
                  alt={brand.name}
                  width={60}
                  height={60}
                />
              ) : (
                <div className={styles.placeholder}>
                  {brand.name.charAt(0)}
                </div>
              )}
            </div>

            <h3>{brand.name}</h3>

            <span className={styles.category}>{brand.category}</span>

            {brand.location && (
              <span className={styles.location}>{brand.location}</span>
            )}

            <p className={styles.desc}>
              {brand.bio || "No description available."}
            </p>

            <Link href={`/brand/${brand._id}`}>
              <button className={styles.button}>Visit Brand</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}