import { OBJECT_ID_PATTERN, slugify } from "../utils/slugify";

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

export function validate(slugOrId: string, name: unknown): boolean {
  return isCanonicalEntitySlug(slugOrId, name);
}
