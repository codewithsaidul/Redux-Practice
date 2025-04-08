import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ["Videos", "Video", "RelatedVideos"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600,
      providesTags: ["Videos"],
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: (result, error, arg) => [
        { type: "Video", id: arg },
    ],
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
      providesTags: (result, error, arg) => [
        { type: "RelatedVideos", id: arg.id },
    ],
    }),

    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
          "Videos",
          {
            type: "Video",
            id: arg.id,
          },
          {
            type: "RelatedVideos",
            id: arg.id,
          },
      ],
      
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
  useEditVideoMutation,
  useDeleteVideoMutation,
} = apiSlice;
