import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchVideos from "./videosApi";

const initialState = {
    videos: [],
    isLoading: false,
    isError: false,
    error: ''
}


export const fetchVideosAsync = createAsyncThunk("videos/fetchVideos", async ({tags, searchValue}) => {
    const videos = await fetchVideos({tags, searchValue});
    return videos
})


const videosSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchVideosAsync.pending, (state) => {
            state.isError = false,
            state.isLoading = true
        })
        .addCase(fetchVideosAsync.fulfilled, (state, action) => {
            state.isError = false,
            state.isLoading = false,
            state.videos = action.payload
        })
        .addCase(fetchVideosAsync.rejected, (state, action) => {
            state.isLoading = false,
            state.videos = [],
            state.isError = true,
            state.error = action.error?.message
        })
    }
})


export default videosSlice.reducer