"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./CreatorFilters.module.scss";
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react";
import Dropdown from "../Dropdown/Dropdown";
import CreatorsGrid from "../CreatorsGrid/CreatorsGrid";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllCreatorsQuery } from "@/store/api/creatorApi";

export default function CreatorFilters() {

  const router = useRouter();
  const params = useSearchParams();

  const ref = useRef<HTMLDivElement>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  /* UI STATE */

  const [name, setName] = useState(params.get("name") || "");
  const [niche, setNiche] = useState(params.get("niche") || "All Niches");
  const [location, setLocation] = useState(params.get("location") || "");

  /* APPLIED FILTERS */

  const [filters, setFilters] = useState({
    name: params.get("name") || "",
    niche: params.get("niche") || "All Niches",
    location: params.get("location") || "",
  });

  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllCreatorsQuery({
    page,
    limit: 12,
    name: filters.name,
    niche: filters.niche,
    location: filters.location,
  });

  const handleApply = () => {

    const newFilters = { name, niche, location };

    setFilters(newFilters);
    setPage(1);

    const query = new URLSearchParams();

    if (name) query.set("name", name);
    if (niche !== "All Niches") query.set("niche", niche);
    if (location) query.set("location", location);

    router.push(`/search?${query.toString()}`);

    setMobileOpen(false);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <div className={styles.wrapper} ref={ref}>

        {/* DESKTOP FILTERS */}

        <div className={styles.desktopFilters}>

          <div className={styles.field}>
            <label>SEARCH</label>
            <div className={styles.input}>
              <Search size={16} />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name, handle..."
              />
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
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Any city..."
              />
            </div>
          </div>

          <button className={styles.apply} onClick={handleApply}>
            Apply
          </button>

        </div>

        {/* MOBILE FILTER BUTTON */}

        <button
          className={styles.mobileButton}
          onClick={() => setMobileOpen(true)}
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>

      </div>

      {/* MOBILE FILTER PANEL */}

      {mobileOpen && (
        <div className={styles.mobilePanel}>
          <button
              onClick={() => setMobileOpen(false)}
              className={styles.closeBtn}
              style={{ marginTop: "10px" }}
            >
              <X size={18} />
            </button>

          <div className={styles.mobileFilters}>

            <div className={styles.field}>
              <label>SEARCH</label>
              <div className={styles.input}>
                <Search size={16} />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name..."
                />
              </div>
            </div>

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

            <div className={styles.field}>
              <label>LOCATION</label>
              <div className={styles.input}>
                <MapPin size={16} />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City..."
                />
              </div>
            </div>

            <button className={styles.applyMobile} onClick={handleApply}>
              Apply Filters
            </button>

            

          </div>

        </div>
      )}

      <CreatorsGrid
        creators={data?.creators || []}
        total={data?.pagination?.total || 0}
        loadMore={loadMore}
        loading={isLoading}
      />
    </>
  );
}