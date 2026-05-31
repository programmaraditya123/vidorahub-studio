export const PRODUCT_CATEGORIES = [
  "Digital download",
  "Template",
  "Course",
  "Service",
  "Merchandise",
  "Preset / Pack",
  "Other",
] as const;

export const PRODUCT_CURRENCIES = [
  { code: "USD", label: "USD ($)" },
  { code: "EUR", label: "EUR (€)" },
  { code: "GBP", label: "GBP (£)" },
  { code: "INR", label: "INR (₹)" },
] as const;

export const MAX_PRODUCT_IMAGES = 6;
export const MAX_PRODUCT_DESCRIPTION = 500;

export type ProductImageItem = {
  id: string;
  preview: string;
  file?: File;
  url?: string;
  uploading?: boolean;
  error?: string;
};

export type ProductFieldErrors = Partial<
  Record<"name" | "price" | "currency" | "images", string>
>;

export function imagesFromUrls(urls: string[]): ProductImageItem[] {
  return urls.map((url, index) => ({
    id: `existing-${index}-${url.slice(-12)}`,
    preview: url,
    url,
  }));
}
