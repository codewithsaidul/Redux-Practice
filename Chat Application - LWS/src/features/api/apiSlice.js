import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL
    }),
    tagTypes: [],
    endpoints: (builder) => ({
        // Example of defining an endpoint
        fetchData: builder.query({
            query: () => 'some-endpoint',  // Define the API endpoint you want to hit
        }),
    }),
})


