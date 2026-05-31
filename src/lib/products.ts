import {
  PRODUCT_IMAGE_UPLOAD,
  uploadViaSignedUrl,
} from "./gcsUpload";

export type ProductAnalytics = {
  views: number;
  clicks: number;
  purchases: number;
};

export type ProductRating = {
  average: number;
  count: number;
};

export type ApiProduct = {
  _id: string;
  creatorId: string;
  name: string;
  description?: string;
  category?: string;
  tags?: string[];
  price: number;
  currency: string;
  images: string[];
  status: string;
  brand?: string;
  stock?: number;
  analytics?: ProductAnalytics;
  rating?: ProductRating;
  shippingRequired?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type GetProductsResponse = {
  success: boolean;
  count: number;
  products: ApiProduct[];
};

export type AddProductResponse = {
  success: boolean;
  message: string;
  product: ApiProduct;
};

export type ProductFormPayload = {
  name: string;
  description?: string;
  category?: string;
  price: number;
  stock?: number;
  images: string[];
  brand?: string;
  currency: string;
};

export type AddProductPayload = ProductFormPayload;

export type UpdateProductPayload = ProductFormPayload;

export type ProductMutationResponse = {
  success: boolean;
  message: string;
};

/** @deprecated Use ApiProduct */
export type ProductRecord = ApiProduct;

export type StoreProductView = {
  id: string;
  name: string;
  priceLabel: string;
  currency: string;
  statusLabel: string;
  statusKind: "active" | "draft" | "inactive";
  sales: number;
  imageUrl?: string;
  category?: string;
};

const CURRENCY_SYMBOL: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

export function formatProductPrice(price: number, currency: string): string {
  const symbol = CURRENCY_SYMBOL[currency] ?? `${currency} `;

  if (currency === "INR") {
    const formatted = price.toLocaleString("en-IN", {
      maximumFractionDigits: price % 1 === 0 ? 0 : 2,
    });
    return `${symbol}${formatted}`;
  }

  const formatted =
    price % 1 === 0 ? String(price) : price.toFixed(2);
  return `${symbol}${formatted}`;
}

export function formatProductStatus(status: string): {
  label: string;
  kind: StoreProductView["statusKind"];
} {
  const key = status.toLowerCase();

  if (key === "active") {
    return { label: "Active", kind: "active" };
  }
  if (key === "draft") {
    return { label: "Draft", kind: "draft" };
  }

  return {
    label: status.charAt(0).toUpperCase() + status.slice(1),
    kind: "inactive",
  };
}

export function mapProductToStoreView(product: ApiProduct): StoreProductView {
  const { label, kind } = formatProductStatus(product.status);

  return {
    id: product._id,
    name: product.name,
    priceLabel: formatProductPrice(product.price, product.currency),
    currency: product.currency,
    statusLabel: label,
    statusKind: kind,
    sales: product.analytics?.purchases ?? 0,
    imageUrl: product.images[0],
    category: product.category,
  };
}

/** Uploads to thumbnails/{contentCategory}s/ via signed URL, returns public GCS URL. */
export async function uploadProductImage(file: File): Promise<string> {
  return uploadViaSignedUrl(file, PRODUCT_IMAGE_UPLOAD);
}
