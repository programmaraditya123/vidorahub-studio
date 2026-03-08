import { createApi } from "@reduxjs/toolkit/query/react";
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

  tagTypes: ["Creator"],

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
    })
  
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
  useGetCreatorByIdQuery
} = creatorApi;
