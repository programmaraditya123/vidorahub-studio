"use client";

import Link from "next/link";
import styles from "./DiscoverBrands.module.scss";
import {
  Gem,
  Monitor,
  Leaf,
  Sofa,
  Zap,
  Smartphone,
  Utensils,
  Dumbbell,
} from "lucide-react";

type Brand = {
  name: string;
  category: string;
  description: string;
  icon: React.ElementType;
};

const brands: Brand[] = [
  {
    name: "Luxe Style",
    category: "Fashion & Apparel",
    description:
      "High-end designer clothing and luxury accessories for the modern aesthetic.",
    icon: Gem,
  },
  {
    name: "TechFlow",
    category: "Technology",
    description:
      "Scalable infrastructure solutions and developer-first productivity tools.",
    icon: Monitor,
  },
  {
    name: "Pure Wellness",
    category: "Health & Wellness",
    description:
      "Holistic self-care products and nutritional supplements for a balanced life.",
    icon: Leaf,
  },
  {
    name: "EcoHome",
    category: "Interior Design",
    description:
      "Sustainable and minimalist home decor that prioritizes environmental impact.",
    icon: Sofa,
  },
  {
    name: "Urban Gear",
    category: "Streetwear",
    description:
      "Edgy urban apparel designed for performance and city exploration.",
    icon: Zap,
  },
  {
    name: "DevPulse",
    category: "SaaS & Tech",
    description:
      "Real-time monitoring and analytics for high-traffic web applications.",
    icon: Smartphone,
  },
  {
    name: "Taste Collective",
    category: "Food & Dining",
    description:
      "Premium artisanal food delivery service from the world's best chefs.",
    icon: Utensils,
  },
  {
    name: "ActiveLife",
    category: "Fitness Gear",
    description:
      "Advanced fitness tracking and smart equipment for elite athletes.",
    icon: Dumbbell,
  },
  {
    name: "Luxe Style",
    category: "Fashion & Apparel",
    description:
      "High-end designer clothing and luxury accessories for the modern aesthetic.",
    icon: Gem,
  },
  {
    name: "TechFlow",
    category: "Technology",
    description:
      "Scalable infrastructure solutions and developer-first productivity tools.",
    icon: Monitor,
  },
  {
    name: "Pure Wellness",
    category: "Health & Wellness",
    description:
      "Holistic self-care products and nutritional supplements for a balanced life.",
    icon: Leaf,
  },
  {
    name: "EcoHome",
    category: "Interior Design",
    description:
      "Sustainable and minimalist home decor that prioritizes environmental impact.",
    icon: Sofa,
  },
  {
    name: "Urban Gear",
    category: "Streetwear",
    description:
      "Edgy urban apparel designed for performance and city exploration.",
    icon: Zap,
  },
  {
    name: "DevPulse",
    category: "SaaS & Tech",
    description:
      "Real-time monitoring and analytics for high-traffic web applications.",
    icon: Smartphone,
  },
  {
    name: "Taste Collective",
    category: "Food & Dining",
    description:
      "Premium artisanal food delivery service from the world's best chefs.",
    icon: Utensils,
  },
  {
    name: "ActiveLife",
    category: "Fitness Gear",
    description:
      "Advanced fitness tracking and smart equipment for elite athletes.",
    icon: Dumbbell,
  },
];

export default function DiscoverBrands() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Discover Brands</h2>
        <p>
          Explore our curated selection of premium partners across technology,
          lifestyle, and design industries.
        </p>
      </div>

      <div className={styles.grid}>
        {brands.map((brand, i) => {
          const Icon = brand.icon;

          return (
            <div key={i} className={styles.card}>
              <div className={styles.iconBox}>
                <Icon size={22} />
              </div>

              <h3>{brand.name}</h3>

              <span className={styles.category}>{brand.category}</span>

              <p className={styles.desc}>{brand.description}</p>
              
              <Link href={`/brand/${brand.name}`}>
              <button className={styles.button}>Visit Brand</button>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}