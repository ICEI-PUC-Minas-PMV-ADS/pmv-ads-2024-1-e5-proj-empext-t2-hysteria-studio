import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { endpointsApi } from "./endpoins";

export const store = configureStore({
  reducer: {
    [endpointsApi.reducerPath]: endpointsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(endpointsApi.middleware),
});

setupListeners(store.dispatch);
