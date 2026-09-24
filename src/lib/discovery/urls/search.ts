export function searchPath(filters: Record<string, string | undefined> = {}): string {
  const query = new URLSearchParams();
  for (const key of ["name", "niche", "location"]) {
    const value = (key === "niche" ? filters.niche || filters.category : filters[key])?.trim();
    if (value && value !== "All Niches") query.set(key, value);
  }
  return query.size ? "/search?" + query.toString() : "/search";
}
