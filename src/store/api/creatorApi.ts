import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  AddProductPayload,
  AddProductResponse,
  GetProductsResponse,
  ProductMutationResponse,
  UpdateProductPayload,
  UpdateProductResponse,
  ProductTaxonomyResponse,
} from "@/lib/products";
import { axiosBaseQuery } from "./axiosBaseQuery";

type Creator = {
  name: string;
  profilePicUrl?: string;
  location?: string;
  tags: string[];
  bio?: string;
};

type CreatorResponse = {
  creators: Creator[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const creatorApi = createApi({
  reducerPath: "creatorApi",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["Creator", "Product"],

  endpoints: (builder) => ({
    getCreator: builder.query<any, void>({
      query: () => ({
        url: "/api/v1/getcreator",
      }),
      providesTags: ["Creator"],
    }),

    addCreatorBasicInfo: builder.mutation({
      query: (form) => ({
        url: "/api/v1/addCreatorBasicInfo",
        method: "POST",
        data: form,
      }),
      invalidatesTags: ["Creator"],
    }),

    addCreatorPlatform: builder.mutation({
      query: (form) => ({
        url: "/api/v1/addCreatorPlatform",
        method: "POST",
        data: {
          platform: form.platform,
          url: form.link,
          audience: form.audience,
        },
      }),
      invalidatesTags: ["Creator"],
    }),

    addShowcaseContent: builder.mutation({
      query: (form) => ({
        url: "/api/v1/addShowcaseContent",
        method: "POST",
        data: form,
      }),
      invalidatesTags: ["Creator"],
    }),
    deleteShowcaseContent: builder.mutation({
      query: (id) => ({
        url: `/api/v1/deleteShowcaseContent/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Creator"],
    }),
    AddExperience: builder.mutation({
      query: (form) => ({
        url: "/api/v1/addExperience",
        method: "POST",
        data: form,
      }),
      invalidatesTags: ["Creator"],
    }),
    DeleteExperience: builder.mutation({
      query: (id) => ({
        url: `/api/v1/deleteExperience/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Creator"],
    }),
    getAllCreators: builder.query<
      CreatorResponse,
      {
        page?: number;
        limit?: number;
        name?: string;
        niche?: string;
        location?: string;
      }
    >({
      query: ({ page = 1, limit = 10, name, niche, location }) => {
        const params = new URLSearchParams();

        params.set("page", String(page));
        params.set("limit", String(limit));

        if (name) params.set("name", name);
        if (niche && niche !== "All Niches") params.set("niche", niche);
        if (location) params.set("location", location);

        return {
          url: `/api/v1/getAllCreators?${params.toString()}`,
        };
      },

      /* keep one cache for pagination */
      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newItems, { arg }) => {
        /* reset list when page = 1 (new filters) */
        if (arg.page === 1) {
          currentCache.creators = newItems.creators;
        } else {
          /* remove duplicates using _id */
          const existingIds = new Set(
            currentCache.creators.map((c: any) => c._id),
          );

          const filtered = newItems.creators.filter(
            (c: any) => !existingIds.has(c._id),
          );

          currentCache.creators.push(...filtered);
        }

        currentCache.pagination = newItems.pagination;
      },

      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.name !== previousArg?.name ||
          currentArg?.niche !== previousArg?.niche ||
          currentArg?.location !== previousArg?.location
        );
      },

      providesTags: ["Creator"],
    }),
    addBrand: builder.mutation({
      query: (form) => ({
        url: "/api/v1/addBrand",
        method: "POST",
        data: form,
      }),

      invalidatesTags: ["Creator"],
    }),
    getAllBrands: builder.query({
      query: () => ({
        url: "/api/v1/allBrands",
      }),
      providesTags: ["Creator"],
    }),
    getBrandById: builder.query({
      query: (id) => ({
        url: `/api/v1/getBrand/${id}`,
      }),
      providesTags: ["Creator"],
    }),
    getCreatorById: builder.query({
      query: (id) => ({
        url: `/api/v1/getOneCreator/${id}`,
      }),
      providesTags: ["Creator"],
    }),

    getProductCategories: builder.query<ProductTaxonomyResponse, void>({
      query: () => ({ url: "/api/v1/categories", params: { isActive: true } }),
    }),

    getProductSubcategories: builder.query<ProductTaxonomyResponse, string>({
      query: (categoryId) => ({
        url: `/api/v1/categories/${encodeURIComponent(categoryId)}/subcategories`,
      }),
    }),

    getAllProducts: builder.query<GetProductsResponse, string>({
      query: (creatorId) => ({ url: `/api/v1/allProducts/${encodeURIComponent(creatorId)}` }),
      providesTags: [{ type: "Product", id: "LIST" }],
    }),

    getProducts: builder.query<GetProductsResponse, void>({
      query: () => ({
        url: "/api/v1/getProducts",
      }),
      providesTags: (result) =>
        result?.products?.length
          ? [
              { type: "Product", id: "LIST" },
              ...result.products.map((p) => ({
                type: "Product" as const,
                id: p._id,
              })),
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    addProduct: builder.mutation<AddProductResponse, AddProductPayload>({
      query: (body) => ({
        url: "/api/v1/addProduct",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [
        { type: "Product", id: "LIST" },
        "Creator",
      ],
    }),

    updateProduct: builder.mutation<
      UpdateProductResponse,
      { productId: string; body: UpdateProductPayload }
    >({
      query: ({ productId, body }) => ({
        url: `/api/v1/updateProduct/${productId}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: (_result, _error, { productId }) => [
        { type: "Product", id: "LIST" },
        { type: "Product", id: productId },
      ],
    }),

    deleteProduct: builder.mutation<ProductMutationResponse, string>({
      query: (productId) => ({
        url: `/api/v1/deleteProduct/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, productId) => [
        { type: "Product", id: "LIST" },
        { type: "Product", id: productId },
      ],
    }),
  }),
  
});

export const {
  useGetCreatorQuery,
  useAddCreatorBasicInfoMutation,
  useAddCreatorPlatformMutation,
  useAddShowcaseContentMutation,
  useDeleteShowcaseContentMutation,
  useAddExperienceMutation,
  useDeleteExperienceMutation,
  useGetAllCreatorsQuery,
  useAddBrandMutation,
  useGetAllBrandsQuery,
  useGetBrandByIdQuery,
  useGetCreatorByIdQuery,
  useGetProductsQuery,
  useGetAllProductsQuery,
  useGetProductCategoriesQuery,
  useGetProductSubcategoriesQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = creatorApi;
