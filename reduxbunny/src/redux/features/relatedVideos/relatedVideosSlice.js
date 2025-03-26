import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchVideo from "./videoApi";

const initialState = {
    video: {},
    isLoading: false,
    isError: false,
    error: ''
}


export const fetchRelatedVideoAsync = createAsyncThunk("video/fetchRelatedVideo", async (id) => {
    const relatedVideo = await fetchVideo(id);
    return relatedVideo
})


const relatedVideoSlice = createSlice({
    name: "relatedVideo",
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
            state.video = action.payload
        })
        .addCase(fetchRelatedVideoAsync.rejected, (state, action) => {
            state.isLoading = false,
            state.video = {},
            state.isError = true,
            state.error = action.error?.message
        })
    }
})


export default relatedVideoSlice.reducer