export function searchPath(filters: Record<string, string | undefined> = {}): string {
  const usefulFilters = Object.entries(filters).filter(([, value]) => Boolean(value));
  const query = new URLSearchParams();
  usefulFilters.forEach(([key, value]) => query.set(key, value || ""));
  return query.size ? `/search?${query.toString()}` : "/search";
}
