import { BrandEntity, CreatorEntity, PaginatedCreators } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type FetchOptions = {
  revalidate?: number;
};

async function apiGet<T>(path: string, options: FetchOptions = {}): Promise<T | null> {
  if (!API_BASE_URL) return null;

  try {
    const response = await fetch(new URL(path, API_BASE_URL), {
      next: { revalidate: options.revalidate ?? 3600 },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getCreatorById(id: string): Promise<CreatorEntity | null> {
  const data = await apiGet<{ creator?: CreatorEntity }>(`/api/v1/getOneCreator/${id}`, {
    revalidate: 900,
  });
  return data?.creator || null;
}

export async function getBrandById(id: string): Promise<BrandEntity | null> {
  const data = await apiGet<{ brand?: BrandEntity }>(`/api/v1/getBrand/${id}`, {
    revalidate: 900,
  });
  return data?.brand || null;
}

export async function getAllCreators(limit = 5000): Promise<CreatorEntity[]> {
  const data = await apiGet<PaginatedCreators>(
    `/api/v1/getAllCreators?page=1&limit=${limit}`,
    { revalidate: 1800 },
  );
  return data?.creators || [];
}

export async function getAllBrands(): Promise<BrandEntity[]> {
  const data = await apiGet<{ brands?: BrandEntity[]; data?: BrandEntity[] }>(
    "/api/v1/allBrands",
    { revalidate: 1800 },
  );
  return data?.brands || data?.data || [];
}
