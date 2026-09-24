import { cache } from "react";
import type { BrandEntity, CreatorEntity, PaginatedCreators } from "../types";

async function apiGet<T>(path: string, tag: string): Promise<T | null> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new Error("NEXT_PUBLIC_API_BASE_URL is required for public discovery data");
  const response = await fetch(new URL(path, base), {
    next: { revalidate: 900, tags: [tag] },
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Public discovery API failed: " + response.status);
  return await response.json() as T;
}

export const getCreatorById = cache(async (id: string): Promise<CreatorEntity | null> => {
  const data = await apiGet<{ creator?: CreatorEntity }>("/api/v1/getOneCreator/" + id, "discovery:creators");
  return data?.creator || null;
});

export const getBrandById = cache(async (id: string): Promise<BrandEntity | null> => {
  const data = await apiGet<{ brand?: BrandEntity }>("/api/v1/getBrand/" + id, "discovery:brands");
  return data?.brand || null;
});

export const getAllCreators = cache(async (limit?: number): Promise<CreatorEntity[]> => {
  const found = new Map<string, CreatorEntity>();
  const pageSize = Math.min(limit || 100, 100);
  for (let page = 1; page <= 10000; page++) {
    const data = await apiGet<PaginatedCreators>(
      "/api/v1/getAllCreators?page=" + page + "&limit=" + pageSize, "discovery:creators",
    );
    if (!data || !Array.isArray(data.creators)) throw new Error("Invalid creator listing response");
    const before = found.size;
    for (const creator of data.creators) {
      if (/^[a-f\d]{24}$/i.test(creator._id)) found.set(creator._id, creator);
    }
    if (limit && found.size >= limit) return [...found.values()].slice(0, limit);
    const totalPages = data.pagination?.totalPages;
    if (totalPages !== undefined && page >= totalPages) return [...found.values()];
    if (!data.creators.length || (totalPages === undefined && data.creators.length < pageSize)) return [...found.values()];
    if (found.size === before) throw new Error("Creator pagination did not advance");
  }
  throw new Error("Creator pagination exceeded its safety limit");
});

export const getAllBrands = cache(async (): Promise<BrandEntity[]> => {
  const data = await apiGet<{ brands?: BrandEntity[]; data?: BrandEntity[] }>("/api/v1/allBrands", "discovery:brands");
  const brands = data?.brands || data?.data;
  if (!Array.isArray(brands)) throw new Error("Invalid brand listing response");
  return [...new Map(brands.filter(brand => /^[a-f\d]{24}$/i.test(brand._id)).map(brand => [brand._id, brand])).values()];
});
