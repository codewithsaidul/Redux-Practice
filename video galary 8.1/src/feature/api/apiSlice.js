import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000"
    }),
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "/videos"
        }),
        getVideo: builder.query({
            query: (id) => `/videos/${id}`
        }),
        getRelatedVideos: builder.query({
            query: (title) => {
                if (!title || title.trim() === "") {
                    return "";  // যদি title না থাকে, তবে কোডটি কিছু রিটার্ন করবে না
                }
                const tags = title.split(" ").map(tag =>
                    tag.replace(/[^\w]/g, "")  // শুধু অক্ষর, সংখ্যা আর আন্ডারস্কোর রাখো
                );
                const likes = tags.map(tag => `title_like=${encodeURIComponent(tag)}`);
                const queryString = `/videos?${likes.join("&")}&_limit=3`;
                return queryString
            }
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: data
            })
        }),
    })
})


export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery, useAddVideoMutation } = apiSlice