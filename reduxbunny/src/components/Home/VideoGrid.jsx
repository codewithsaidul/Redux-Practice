import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideosAsync } from "../../redux/features/videos/VideosSlice";
import Loading from "../Shared/Loading";
import Pagination from "./Pagination";
import Video from "./Video";

const VideoGrid = () => {
  const { videos, isLoading, isError, error } = useSelector(state => state.videos)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchVideosAsync())
  }, [dispatch])


  if (isLoading) return <Loading />
  
  if (!isLoading && isError) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-170px)]">
        <p className="text-4xl text-red-500 font-bold">{error}</p>
      </div>
    )
  }


  if (!isLoading && !isError && videos.length <= 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-170px)]">
        <p className="text-4xl text-gray-500 font-bold">No Videos Found!</p>
      </div>
    )
  }

  return (
    <section className="pt-12">
      <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
        {
          videos.map(video => <Video key={video.id} video={video} />)
        }
      </div>
      <Pagination />
    </section>
  );
};

export default VideoGrid;
