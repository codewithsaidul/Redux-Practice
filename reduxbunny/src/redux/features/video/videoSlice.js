import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchVideo from "./videoApi";

const initialState = {
    video: {},
    isLoading: false,
    isError: false,
    error: ''
}


export const fetchVideoAsync = createAsyncThunk("video/fetchVideo", async (id) => {
    const video = await fetchVideo(id);
    return video
})


const videoSlice = createSlice({
    name: "video",
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
            state.video = action.payload
        })
        .addCase(fetchVideoAsync.rejected, (state, action) => {
            state.isLoading = false,
            state.video = {},
            state.isError = true,
            state.error = action.error?.message
        })
    }
})


export default videoSlice.reducer