import { apiSlice } from "../api/apiSlice";


export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder => ({
        getMessages: builder.query({
            query: (id) => `/messages?conversationId=${id}&_sort=timestamp&order=desc&page=1&limit=5`
        })
    }))
})


export const { useGetMessagesQuery } = messagesApi