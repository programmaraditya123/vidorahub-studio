"use client";

import { useId, useRef, useState } from "react";
import { Check, ChevronDown, FolderTree, LoaderCircle, Search, Tags } from "lucide-react";
import type { ProductTaxonomy } from "@/lib/products";
import styles from "./TaxonomyDropdown.module.scss";

type Props = {
  id: string;
  value: string;
  options: ProductTaxonomy[];
  placeholder: string;
  emptyMessage: string;
  loading?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  kind: "category" | "subcategory";
  onChange: (value: string) => void;
};

export default function TaxonomyDropdown({
  id, value, options, placeholder, emptyMessage, loading, disabled, invalid, kind, onChange,
}: Props) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const expanded = open && !disabled && !loading;
  const selected = options.find((option) => option._id === value);
  const filtered = options.filter((option) => option.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()));
  const active = filtered[activeIndex];
  const Icon = kind === "category" ? Tags : FolderTree;

  const reveal = () => {
    setSearch("");
    setActiveIndex(Math.max(0, options.findIndex((option) => option._id === value)));
    setOpen(true);
  };
  const choose = (next: string) => {
    onChange(next);
    inputRef.current?.focus();
    setOpen(false);
    setSearch("");
  };

  return (
    <div className={styles.dropdown} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <div className={`${styles.control} ${expanded ? styles.expanded : ""} ${invalid ? styles.invalid : ""} ${disabled || loading ? styles.disabled : ""}`}>
        {expanded ? <Search size={17} aria-hidden /> : <Icon size={17} aria-hidden />}
        <input
          ref={inputRef}
          id={id}
          className={styles.input}
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={expanded}
          aria-controls={expanded ? listId : undefined}
          aria-activedescendant={expanded && active ? `${listId}-${active._id}` : undefined}
          aria-invalid={invalid}
          aria-required="true"
          disabled={disabled || loading}
          value={expanded ? search : selected?.name ?? ""}
          placeholder={loading ? "Loading options..." : expanded ? "Search options..." : placeholder}
          onFocus={reveal}
          onClick={() => { if (!expanded) reveal(); }}
          onChange={(event) => {
            setSearch(event.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape" && expanded) {
              event.preventDefault();
              event.stopPropagation();
              setOpen(false);
            } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              if (!expanded) reveal();
              else setActiveIndex((index) => {
                const next = (index + (event.key === "ArrowDown" ? 1 : -1) + filtered.length) % filtered.length;
                requestAnimationFrame(() => document.getElementById(`${listId}-${filtered[next]?._id}`)?.scrollIntoView({ block: "nearest" }));
                return Number.isFinite(next) ? next : 0;
              });
            } else if (event.key === "Enter") {
              event.preventDefault();
              if (!expanded) reveal();
              else if (active) choose(active._id);
            }
          }}
        />
        <button type="button" tabIndex={-1} aria-label={expanded ? "Close options" : "Open options"}
          disabled={disabled || loading}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            if (expanded) setOpen(false);
            else reveal();
            inputRef.current?.focus();
          }}>
          {loading ? <LoaderCircle size={16} className={styles.spinner} /> : <ChevronDown size={16} className={expanded ? styles.rotated : undefined} />}
        </button>
      </div>
      {expanded && (
        <div className={styles.panel}>
          <div className={styles.caption}>{kind === "category" ? "Categories" : "Subcategories"}<span>{filtered.length}</span></div>
          <div id={listId} role="listbox" aria-label={kind === "category" ? "Categories" : "Subcategories"} className={styles.options}>
            {filtered.map((option, index) => (
              <button key={option._id} id={`${listId}-${option._id}`} type="button" role="option"
                aria-selected={option._id === value} tabIndex={-1}
                className={`${styles.option} ${index === activeIndex ? styles.highlighted : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(option._id)}>
                <span>{option.name}</span>{option._id === value && <Check size={16} aria-hidden />}
              </button>
            ))}
          </div>
          {filtered.length === 0 && <p className={styles.empty} role="status">{search ? "No matching options. Try another search." : emptyMessage}</p>}
        </div>
      )}
    </div>
  );
}
