"use client";

import { useEffect, useState } from "react";
import styles from "./LoginSlug.module.scss";
import { useParams, useRouter } from "next/navigation";

const floatingItems = [
  "Find Brands",
  "Find Creators",
  "Find Deals",
  "Collaborate",
  "Grow Faster",
];

type Box = {
  text: string;
  top: number;
  left: number;
};

const LoginSlug = () => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const params = useParams()
  const router = useRouter()
//   console.log("params",params?.slug)

  useEffect(() => {
    const generated: Box[] = floatingItems.map((text) => {
      let top = Math.random() * 80;   // keep inside screen
      let left = Math.random() * 80;

      if (top > 30 && top < 70 && left > 30 && left < 70) {
        top += 20;
        left += 20;
      }

      return { text, top, left };
    });

    setBoxes(generated);
  }, []);

  useEffect(() => {
    if(!params?.slug) return;

    const token = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug;
    if(params?.slug){
        localStorage.setItem("token",token)
    } else {
        router.push('/')
    }

    router.push('/')


  },[params,router])

  return (
    <div className={styles.wrapper}>
      {/* FLOATING BOXES */}
      <div className={styles.floatingLayer}>
        {boxes.map((box, i) => (
          <div
            key={i}
            className={styles.floatBox}
            style={{
              top: `${box.top}%`,
              left: `${box.left}%`,
              animationDelay: `${i * 1.5}s`,
            }}
          >
            {box.text}
          </div>
        ))}
      </div>

      {/* MAIN BOX */}
      <div className={styles.container}>
        <div className={styles.windBox}>
          <div className={styles.windBorder}></div>

          <div className={styles.content}>
            <h2 className={styles.title}>
              Preparing your journey...
            </h2>

            <p className={styles.subtitle}>
              We’re checking your credentials and getting things ready ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSlug;