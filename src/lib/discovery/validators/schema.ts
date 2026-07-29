export function isJsonLdObject(input: unknown): boolean {
  return Boolean(input && typeof input === "object");
}
