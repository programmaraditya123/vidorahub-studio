const OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i;

export function slugify(input: unknown): string {
  const value = String(input || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return value || "profile";
}

export function extractObjectId(slugOrId: string): string | null {
  const value = String(slugOrId || "").trim();
  if (OBJECT_ID_PATTERN.test(value)) return value;

  const match = value.match(/([a-f\d]{24})$/i);
  return match?.[1] || null;
}

export function buildEntitySlug(name: unknown, id: string): string {
  return `${slugify(name)}-${id}`;
}

export function isCanonicalEntitySlug(slugOrId: string, name: unknown): boolean {
  const id = extractObjectId(slugOrId);
  return Boolean(id && slugOrId === buildEntitySlug(name, id));
}

export function titleizeSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
