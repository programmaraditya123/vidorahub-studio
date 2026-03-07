import { http } from "@/lib/http";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError } from "axios";

type AxiosBaseQueryArgs = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: any;
  params?: any;
};

export const axiosBaseQuery =
  (): BaseQueryFn<
    AxiosBaseQueryArgs,
    unknown,
    { status?: number; message?: string }
  > =>
  async ({ url, method = "GET", data, params }) => {
    try {
      const result = await http({
        url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError<any>;

      return {
        error: {
          status: err.response?.status,
          message: err.response?.data?.message || err.message,
        },
      };
    }
  };