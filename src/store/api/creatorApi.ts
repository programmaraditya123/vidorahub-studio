import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { Delete } from "lucide-react";

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

    addShowcaseContent : builder.mutation({
      query: (form) => ({
        url: "/api/v1/addShowcaseContent",
        method: "POST",
        data: form,
      }),
      invalidatesTags: ["Creator"],
    }),
    deleteShowcaseContent : builder.mutation({
      query: (id) => ({
        url: `/api/v1/deleteShowcaseContent/${id}`, 
        method: "DELETE"
      }),
      invalidatesTags: ["Creator"],
    }),
    AddExperience : builder.mutation({
      query: (form) => ({
        url: "/api/v1/addExperience",       
        method: "POST",
        data: form,
      }),
        invalidatesTags: ["Creator"],
    }),
    DeleteExperience : builder.mutation({
      query: (id) => ({
        url: `/api/v1/deleteExperience/${id}`,  
        method: "DELETE"
        }),
        invalidatesTags: ["Creator"],
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
  useDeleteExperienceMutation
} = creatorApi;
