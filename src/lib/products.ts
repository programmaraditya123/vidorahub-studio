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

export type ProductTaxonomy = { _id: string; name: string };
export type ProductTaxonomyReference = string | ProductTaxonomy | null;
export type ProductTaxonomyResponse = {
  success: boolean;
  count: number;
  data: ProductTaxonomy[];
};

export function productTaxonomyId(value?: ProductTaxonomyReference): string {
  return typeof value === "string" ? value : value?._id ?? "";
}

export function productTaxonomyName(value?: ProductTaxonomyReference): string | undefined {
  return typeof value === "object" && value ? value.name : undefined;
}

export type ApiProduct = {
  _id: string;
  creatorId: string;
  name: string;
  description?: string;
  category?: ProductTaxonomyReference;
  subcategory?: ProductTaxonomyReference;
  tags?: string[];
  price: number;
  currency: string;
  images: string[];
  status: string;
  brand?: string;
  stock?: number | null;
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
  category: string;
  subcategory: string;
  price: number;
  stock?: number | null;
  images: string[];
  brand?: string;
  currency: string;
};

export type AddProductPayload = ProductFormPayload;

export type UpdateProductPayload = Partial<ProductFormPayload>;
export type UpdateProductResponse = AddProductResponse;

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
  subcategory?: string;
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
    category: productTaxonomyName(product.category),
    subcategory: productTaxonomyName(product.subcategory),
  };
}

/** Uploads to thumbnails/{contentCategory}s/ via signed URL, returns public GCS URL. */
export async function uploadProductImage(file: File): Promise<string> {
  return uploadViaSignedUrl(file, PRODUCT_IMAGE_UPLOAD);
}
