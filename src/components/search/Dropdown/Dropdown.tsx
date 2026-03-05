"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";
import { ChevronDown } from "lucide-react";

type Props = {
  options: string[];
  value: string;
  onChange: (val: string) => void;
};

export default function Dropdown({ options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* close on outside click */

  useEffect(() => {
    const handler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
      >
        {value}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className={styles.menu}>
          {options.map((opt) => (
            <div
              key={opt}
              className={styles.option}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}