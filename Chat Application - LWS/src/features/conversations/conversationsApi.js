import { apiSlice } from "../api/apiSlice";

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversions: builder.query({
      query: (email) =>
        `/conversations?participants_like=${email}&_sort=timestamp&order=desc&page=1&limit=5`,
    }),
    getConversion: builder.query({
      query: ({ userEmail, participantEmail }) =>
        `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
    }),
    addConversion: builder.mutation({
      query: (data) => ({
        url: "/conversations",
        method: "POST",
        body: data
      })
    }),
    editConversion: builder.mutation({
      query: ({id, data}) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data
      })
    }),
  }),
});

export const { useGetConversionsQuery, useGetConversionQuery, useAddConversionMutation, useEditConversionMutation } = conversationsApi;
