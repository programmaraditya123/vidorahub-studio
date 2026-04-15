"use client";

import styles from "./FeaturedContent.module.scss";
import Image from "next/image";
import { Eye, Heart } from "lucide-react";

type Content = {
  title: string;
  description: string;
  image: string;
  views: string;
  likes: string;
  link ?: string;
};

type Props = {
  content: Content[];
};

export default function FeaturedContent({ content }: Props) {
  if (!content?.length) return null;

  const count = content.length;

  // 1 item → 100%, 2 → 50%, 3 → 33%, 4 → 25%, 5+ → 20%
  const colPercent = Math.max(20, Math.floor(100 / count));
  
  const handleVisit = (link : string) => {
    return window.open(link, "_blank")


  }
  return (
    <section className={styles.wrapper}>
      <h3 className={styles.sectionTitle}>Featured Content</h3>

      <div
        className={styles.grid}
        style={{ "--col-percent": `${colPercent}%` } as React.CSSProperties}
      >
        {content.map((item, i) => (
          <article key={i} className={styles.card}>
            <div className={styles.imageWrapper} onClick={() => handleVisit(item?.link!)}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={styles.image}
              />
              <div className={styles.imageOverlay} />
            </div>

            <div className={styles.body}>
              <h4 className={styles.cardTitle}>{item.title}</h4>
              <p className={styles.cardDesc}>{item.description}</p>

              <div className={styles.stats}>
                <span className={styles.stat}>
                  <Eye size={13} strokeWidth={2} />
                  {item.views}
                </span>
                {/* <span className={styles.stat}>
                  <Heart size={13} strokeWidth={2} />
                  {item.likes}
                </span> */}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


// "use client";

// import styles from "./FeaturedContent.module.scss";
// import Image from "next/image";
// import { Eye } from "lucide-react";

// type Content = {
//   title: string;
//   description: string;
//   image: string;
//   views: string;
//   likes: string;
// };

// type Props = {
//   content: Content[];
// };

// export default function FeaturedContent({ content }: Props) {
//   return (
//     <div className={styles.wrapper}>
//       <h3 className={styles.title}>Featured Content</h3>

//       <div className={styles.grid}>
//         {content.map((item, i) => (
//           <div key={i} className={styles.card}>
//             <div className={styles.imageWrapper}>
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 fill
//                 className={styles.image}
//               />
//             </div>

//             <div className={styles.body}>
//               <h4>{item.title}</h4>

//               <p>{item.description}</p>

//               <div className={styles.stats}>
//                 <span>
//                   <Eye size={14} /> {item.views}
//                 </span>

//                 <span>❤ {item.likes}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }