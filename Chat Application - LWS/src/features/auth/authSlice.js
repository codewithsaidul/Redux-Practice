import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    accessToken: undefined,
    user: undefined
}


const authsSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.user = action.payload.user
        },
        userLoggedOut: (state, action) => {
            state.accessToken = undefined
            state.user = undefined
        },
    }
})


export default authsSlice.reducer

export const { userLoggedIn, userLoggedOut } = authsSlice.actions