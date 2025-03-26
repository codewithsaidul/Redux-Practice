import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchRelatedVideo from "./relatedVideosApi";


const initialState = {
    relatedVideos: [],
    isLoading: false,
    isError: false,
    error: ''
}


export const fetchRelatedVideoAsync = createAsyncThunk("video/fetchRelatedVideos", async (id, tags) => {
    const relatedVideo = await fetchRelatedVideo(id, tags);
    return relatedVideo
})


const relatedVideoSlice = createSlice({
    name: "relatedVideos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchRelatedVideoAsync.pending, (state) => {
            state.isError = false,
            state.isLoading = true
        })
        .addCase(fetchRelatedVideoAsync.fulfilled, (state, action) => {
            state.isError = false,
            state.isLoading = false,
            state.relatedVideos = action.payload
        })
        .addCase(fetchRelatedVideoAsync.rejected, (state, action) => {
            state.isLoading = false,
            state.relatedVideos = [],
            state.isError = true,
            state.error = action.error?.message
        })
    }
})


export default relatedVideoSlice.reducer