import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchTags from "./tagAPI";

const initialState = {
    tags: [],
    isLoading: false,
    isError: false,
    error: ''
}



export const fetchTagsAsync = createAsyncThunk("tags/fetchTags", async () => {
    const tags = await fetchTags();
    return tags
})


const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTagsAsync.pending, (state) => {
            state.isError = false,
            state.isLoading = true
        })
        .addCase(fetchTagsAsync.fulfilled, (state, action) => {
            state.isError = false,
            state.isLoading = false,
            state.tags = action.payload
        })
        .addCase(fetchTagsAsync.rejected, (state, action) => {
            state.isError = true,
            state.isLoading = false,
            state.tags = [],
            state.error = action.error?.message
        })
    }
})

export default tagsSlice.reducer