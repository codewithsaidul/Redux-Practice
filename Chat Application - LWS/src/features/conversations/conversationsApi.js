import { apiSlice } from "../api/apiSlice";


export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder => ({
        getConversions: builder.query({
            query: (email) => `/conversations?participants_like=${email}&_sort=timestamp&order=desc&page=1&limit=5`
        })
    }))
})


export const { useGetConversionsQuery } = conversationsApi