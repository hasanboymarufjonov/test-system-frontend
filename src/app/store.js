import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { apiSlice } from "../features/auth/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true,
});

export default store;
