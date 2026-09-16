import { http3 } from "./http3";

export const STORE_CURRENCIES = ["dollar", "rupee", "euro", "yen"] as const;
export type StoreCurrency = (typeof STORE_CURRENCIES)[number];

export type StorePayload = {
  name: string;
  description: string;
  category: string[];
  // This spelling is required by the FastAPI request model.
  subCatgories: string[];
  currency: StoreCurrency;
  rating: number;
  review_count: number;
  isAvailable: boolean;
  policies: { shipping: string; returns: string };
  location: string;
  websiteurl: string;
};

export type StoreForm = Omit<StorePayload, "category" | "subCatgories" | "policies"> & {
  categories: string;
  subcategories: string;
  shipping: string;
  returns: string;
};
export type StoreFieldErrors = Partial<Record<keyof StoreForm, string>>;

function record(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown> : undefined;
}

export function storeErrorMessage(error: unknown, fallback = "Could not save your store. Please try again."): string {
  const value = record(error);
  if (value?.status === 401) return "Your session has expired. Please sign in again.";
  if (value?.status === 403) return "You do not have permission to manage this store.";
  return typeof value?.message === "string" && value.message.trim() ? value.message : fallback;
}

function responseMessage(data: Record<string, unknown> | undefined, fallback: string) {
  return typeof data?.message === "string" && data.message.trim() ? data.message : fallback;
}

export async function getStoreStatus(signal?: AbortSignal): Promise<boolean> {
  const { data } = await http3.get<unknown>("/api/store/status", { signal });
  // The supplied route returns JSON null when the owner has no store.
  if (data === null) return false;
  const body = record(data);
  if (body?.success === true) return true;
  if (body?.success === false && (body.exists === false || body.message === "No store found")) return false;
  throw new Error(responseMessage(body, "Could not determine your store status. Please try again."));
}

/** Validate persisted data before editing so a malformed response cannot overwrite it. */
export function parseStoreDetails(value: unknown): StorePayload {
  const store = record(value);
  const policies = record(store?.policies);
  const subcategories = store?.subCategory ?? store?.subCatgories;
  const stringList = (list: unknown): list is string[] => Array.isArray(list) && list.every(item => typeof item === "string");
  if (!store || !policies
    || ![store.name, store.description, store.location, store.websiteurl, policies.shipping, policies.returns].every(item => typeof item === "string")
    || !stringList(store.category) || !stringList(subcategories)
    || !STORE_CURRENCIES.includes(store.currency as StoreCurrency)
    || !Number.isSafeInteger(store.rating) || (store.rating as number) < 0
    || !Number.isSafeInteger(store.review_count) || (store.review_count as number) < 0
    || typeof store.isAvailable !== "boolean") {
    throw new Error("Your store details could not be read. Please reload them before editing.");
  }
  return {
    name: store.name as string, description: store.description as string,
    category: store.category, subCatgories: subcategories,
    currency: store.currency as StoreCurrency,
    rating: store.rating as number, review_count: store.review_count as number,
    isAvailable: store.isAvailable,
    policies: { shipping: policies.shipping as string, returns: policies.returns as string },
    location: store.location as string, websiteurl: store.websiteurl as string,
  };
}

export async function getStoreDetails(signal?: AbortSignal): Promise<StorePayload | null> {
  const { data } = await http3.get<unknown>("/api/store/store_details", { signal });
  const body = record(data);
  if (body?.success === false && body.message === "No store found") return null;
  if (body?.success !== true) throw new Error(responseMessage(body, "Could not load your store details."));
  return parseStoreDetails(body.store);
}

async function saveStore(action: "create" | "update", payload: StorePayload) {
  const { data } = await http3.post<unknown>(`/api/store/${action}`, payload);
  const body = record(data);
  if (body?.success !== true) throw new Error(responseMessage(body, "Could not save your store. Please try again."));
  const message = responseMessage(body, action === "create" ? "Store created successfully." : "Store updated successfully.");
  const alreadyExists = /already created/i.test(message);
  if (action === "update" && alreadyExists) {
    throw new Error("Your store was not updated. Close this window and refresh your store status before trying again.");
  }
  return { message, alreadyExists };
}

export const createStore = (payload: StorePayload) => saveStore("create", payload);
export const updateStore = (payload: StorePayload) => saveStore("update", payload);

export function storeToForm(store?: StorePayload): StoreForm {
  return {
    name: store?.name ?? "", description: store?.description ?? "",
    categories: store?.category.join(", ") ?? "", subcategories: store?.subCatgories.join(", ") ?? "",
    currency: store?.currency ?? "rupee", rating: store?.rating ?? 0,
    review_count: store?.review_count ?? 0, isAvailable: store?.isAvailable ?? true,
    shipping: store?.policies.shipping ?? "", returns: store?.policies.returns ?? "",
    location: store?.location ?? "", websiteurl: store?.websiteurl ?? "",
  };
}

function splitCategories(value: string): string[] {
  const seen = new Set<string>();
  return value.split(",").map(item => item.trim()).filter(item => {
    const key = item.toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function validateStoreForm(form: StoreForm): StoreFieldErrors {
  const errors: StoreFieldErrors = {};
  for (const [field, label] of [["name", "Store name"], ["description", "Description"], ["location", "Location"], ["shipping", "Shipping policy"], ["returns", "Return policy"]] as const) {
    if (!form[field].trim()) errors[field] = `${label} is required.`;
  }
  if (!splitCategories(form.categories).length) errors.categories = "Add at least one category.";
  if (!STORE_CURRENCIES.includes(form.currency)) errors.currency = "Select a supported currency.";
  if (form.websiteurl.trim()) {
    try {
      const url = new URL(form.websiteurl.trim());
      if (!["http:", "https:"].includes(url.protocol) || !url.hostname || url.username || url.password) throw new Error();
    } catch {
      errors.websiteurl = "Enter a valid website URL starting with https:// or http://.";
    }
  }
  return errors;
}

export function storeFormToPayload(form: StoreForm): StorePayload {
  if (Object.keys(validateStoreForm(form)).length) throw new Error("Please correct the highlighted fields.");
  return {
    name: form.name.trim(), description: form.description.trim(),
    category: splitCategories(form.categories), subCatgories: splitCategories(form.subcategories),
    currency: form.currency, rating: form.rating, review_count: form.review_count,
    isAvailable: form.isAvailable,
    policies: { shipping: form.shipping.trim(), returns: form.returns.trim() },
    location: form.location.trim(), websiteurl: form.websiteurl.trim(),
  };
}
