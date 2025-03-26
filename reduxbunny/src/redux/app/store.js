import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from '../features/counter/counterSlice';
import relatedvideosReducer from "../features/relatedVideos/relatedVideosSlice";
import tagsReducer from '../features/tags/tagSlice';
import videoReducer from "../features/video/videoSlice";
import videosReducer from "../features/videos/VideosSlice";


export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    videos: videosReducer,
    tags: tagsReducer,
    video: videoReducer,
    relatedVideos: relatedvideosReducer
  },
});
