import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const RestApi = createApi({
    reducerPath: "restApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8001"
    }),
    endpoints: (builder) => ({
        GetAll: builder.query({
            query: () => "/rest",
            method: "GET",
        }),

        GetAllById: builder.query({
            query: () => `/rest/${id}`,
            method: "GET",
        }),
    })
});

export const { useGetAllQuery, useGetAllByIdQuery } = RestApi;