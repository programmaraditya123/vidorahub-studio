const STOREFRONT_ORIGIN =
  process.env.NEXT_PUBLIC_VIDORAHUB_URL ?? "https://www.vidorahub.com";

export function buildStorefrontUrl(creatorId: string): string {
  return `${STOREFRONT_ORIGIN}/channel/${creatorId}?tab=store`;
}

export function getCreatorIdFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("userid");
}
