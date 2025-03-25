import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from '../features/counter/counterSlice';
import videosReducer from "../features/videos/VideosSlice";


export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    videos: videosReducer
  },
});
