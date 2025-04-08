import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ["Videos"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600,
      providesTags: ["Videos"],
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        if (!title || title.trim() === "") {
          return "";
        }

        // Remove punctuation & convert to lowercase for better match
        const tags = title
          .split(" ")
          .map((tag) => tag.replace(/[^\w]/g, "").toLowerCase()); // optional: .toLowerCase()

        // Optional: filter out common short words (stop words)
        const stopWords = [
          "with",
          "your",
          "and",
          "the",
          "for",
          "to",
          "in",
          "on",
          "vs",
          "v6",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
        ];
        const filteredTags = tags.filter(
          (tag) => tag && !stopWords.includes(tag)
        );

        const likes = filteredTags.map(
          (tag) => `title_like=${encodeURIComponent(tag)}`
        );
        const queryString = `/videos?${likes.join("&")}&id_ne=${id}&_limit=4`;
        return queryString;
      },
    }),

    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
  useDeleteVideoMutation,
} = apiSlice;
