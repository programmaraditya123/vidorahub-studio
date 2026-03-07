export function formatAudience(num: number | string) {
  const n = typeof num === "string" ? Number(num) : num;

  if (isNaN(n)) return num;

  if (n >= 1000000) {
    return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + "M";
  }

  if (n >= 1000) {
    return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K";
  }

  return n;
}