import styles from "./FeaturedCreators.module.scss";
import Image from "next/image";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const creators = [
  {
    name: "Arjun Mehta",
    desc: "Tech & Gadgets Reviewer",
    tag: "TECH",
    image: "/creators/1.jpg",
    socials: {
      instagram: "320K",
      youtube: "420K",
      linkedin: "80K",
      facebook: "150K",
      whatsapp: "25K",
    },
  },
  {
    name: "Priya Sharma",
    desc: "Sustainable Fashion Expert",
    tag: "FASHION",
    image: "/creators/2.jpg",
    socials: {
      instagram: "820K",
      youtube: "150K",
      linkedin: "90K",
      facebook: "200K",
      whatsapp: "60K",
    },
  },
  {
    name: "Chef Kabir",
    desc: "Traditional Indian Fusion",
    tag: "FOOD",
    image: "/creators/3.jpg",
    socials: {
      instagram: "250K",
      youtube: "120K",
      linkedin: "20K",
      facebook: "100K",
      whatsapp: "15K",
    },
  },
  {
    name: "Rohan Das",
    desc: "Solo Travel Adventure",
    tag: "TRAVEL",
    image: "/creators/4.jpg",
    socials: {
      instagram: "640K",
      youtube: "310K",
      linkedin: "40K",
      facebook: "180K",
      whatsapp: "35K",
    },
  },
  
];

export default function FeaturedCreators() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2>Featured Creators</h2>
          <p>Discover the top trending voices on VidoraHub</p>
        </div>
        
        <Link href={'/search'}>
        <button className={styles.viewAll}>View All →</button>
        </Link>
      </div>

      <div className={styles.grid}>
        {creators.map((creator) => (
          <div key={creator.name} className={styles.card}>
            <div className={styles.imageBox}>
              <Image
                src={creator.image}
                alt={creator.name}
                fill
                className={styles.image}
              />

              <span className={styles.tag}>{creator.tag}</span>
            </div>

            <div className={styles.content}>
              <h3>{creator.name}</h3>
              <p>{creator.desc}</p>

              <div className={styles.socials}>
                <div>
                  <Instagram size={14} />
                  <span>{creator.socials.instagram}</span>
                </div>

                <div>
                  <Youtube size={14} />
                  <span>{creator.socials.youtube}</span>
                </div>

                <div>
                  <Linkedin size={14} />
                  <span>{creator.socials.linkedin}</span>
                </div>

                <div>
                  <Facebook size={14} />
                  <span>{creator.socials.facebook}</span>
                </div>

                <div>
                  <MessageCircle size={14} />
                  <span>{creator.socials.whatsapp}</span>
                </div>
              </div>
              
              <Link href={`/creator/${creator.name}`}>
              <button className={styles.profileBtn}>View Profile</button>
              </Link> 
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}