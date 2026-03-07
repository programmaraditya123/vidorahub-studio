import { configureStore } from "@reduxjs/toolkit";
import { creatorApi } from "./api/creatorApi";

export const store = configureStore({
  reducer: {
    [creatorApi.reducerPath]: creatorApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(creatorApi.middleware),
});