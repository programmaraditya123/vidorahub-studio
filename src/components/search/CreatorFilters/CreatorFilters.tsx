"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./CreatorFilters.module.scss";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import Dropdown from "../Dropdown/Dropdown";

export default function CreatorFilters() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [niche, setNiche] = useState("All Niches");

  /* outside click close */

  useEffect(() => {
    const handleClick = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleApply = () => {
    setOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      {/* DESKTOP FILTERS */}

      <div className={styles.desktopFilters}>
        <div className={styles.field}>
          <label>SEARCH</label>
          <div className={styles.input}>
            <Search size={16} />
            <input placeholder="Name, handle..." />
          </div>
        </div>

        <div className={styles.field}>
          {/* <label>NICHE</label>
          <select>
            <option>All Niches</option>
          </select> */}
          <Dropdown
            value={niche}
            onChange={setNiche}
            options={[
              "All Niches",
              "Technology",
              "Fitness",
              "Gaming",
              "Travel",
            ]}
          />
        </div>

        <div className={styles.field}>
          <label>LOCATION</label>
          <div className={styles.input}>
            <MapPin size={16} />
            <input placeholder="Any city..." />
          </div>
        </div>

        <button className={styles.apply}>Apply</button>
      </div>

      {/* MOBILE BUTTON */}

      <button className={styles.mobileButton} onClick={() => setOpen(true)}>
        <SlidersHorizontal size={18} />
        Filters
      </button>

      {/* MOBILE FILTER PANEL */}

      {open && (
        <div className={styles.mobilePanel}>
          <div className={styles.mobileFilters}>
            <div className={styles.field}>
              <label>SEARCH</label>
              <div className={styles.input}>
                <Search size={16} />
                <input placeholder="Name, handle..." />
              </div>
            </div>

            <div className={styles.field}>
             <Dropdown
            value={niche}
            onChange={setNiche}
            options={[
              "All Niches",
              "Technology",
              "Fitness",
              "Gaming",
              "Travel",
            ]}
          />
            </div>

            <div className={styles.field}>
              <label>LOCATION</label>
              <div className={styles.input}>
                <MapPin size={16} />
                <input placeholder="Any city..." />
              </div>
            </div>

            <button className={styles.applyMobile} onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
