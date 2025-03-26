import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tags: [],
    search: ""
}



const filtersSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        tagSelected: (state, action) => {
            state.tags.push(action.payload)
        },
        tagRemove: (state, action) => {
            const indexOfRemove = state.tags.indexOf(action.payload)
            if (indexOfRemove !== -1) {
                state.tags.splice(indexOfRemove, 1)
            }
        },
        searched: (state, acton) => {
            state.search = acton.payload
        }
    },
})


export default filtersSlice.reducer;

export const { tagSelected, tagRemove, searched } = filtersSlice.actions