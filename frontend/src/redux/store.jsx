import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "./api/AuthApi";
import AuthSlice from "./api/AuthSlice";
import { RestApi } from "./api/RestApi";

export const store = configureStore({
    reducer: {
        [AuthApi.reducerPath]: AuthApi.reducer,
        [RestApi.reducerPath]: RestApi.reducer,
        auth: AuthSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AuthApi.middleware, RestApi.middleware),
})