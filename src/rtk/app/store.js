import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import counterSlice from "../features/counter/counterSlice";



const logger = createLogger()


const store = configureStore({
    reducer: {
        counter: counterSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})


export default store