import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "./api/AuthApi";
import AuthSlice from "./api/AuthSlice";

export const store = configureStore({
    reducer: {
        [AuthApi.reducerPath]: AuthApi.reducer,
        auth: AuthSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AuthApi.middleware),
})