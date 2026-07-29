export function compactDescription(value: string, fallback: string): string {
  const text = value.replace(/\s+/g, " ").trim() || fallback;
  return text.length > 155 ? `${text.slice(0, 152).trim()}...` : text;
}

export function escapeXml(value: unknown): string {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function escapeFeedText(value: unknown): string {
  return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
