import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchVideos from "./videosApi";

const initialState = {
    videos: [],
    isLoading: false,
    isError: false,
    error: ''
}


export const fetchVideoAsync = createAsyncThunk("videos/fetchVideos", async () => {
    const videos = await fetchVideos();
    return videos
})


const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchVideoAsync.pending, (state) => {
            state.isError = false,
            state.isLoading = true
        })
        .addCase(fetchVideoAsync.fulfilled, (state, action) => {
            state.isError = false,
            state.isLoading = false,
            state.videos = action.payload
        })
        .addCase(fetchVideoAsync.rejected, (state, action) => {
            state.isLoading = false,
            state.videos = [],
            state.isError = true,
            state.error = action.error?.message
        })
    }
})


export default videoSlice.reducer