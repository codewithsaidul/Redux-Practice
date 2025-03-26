import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedVideoAsync } from "../../redux/features/relatedVideos/relatedVideosSlice.js";
import Loading from "../Shared/Loading.jsx";
import RelatedVideo from "./RelatedVideo.jsx";

const RelatedVideos = (id, tags) => {
  const dispatch = useDispatch();
  const { relatedVideos, isLoading, isError, error } = useSelector(
    (state) => state.relatedVideos
  );

  useEffect(() => {
    dispatch(fetchRelatedVideoAsync(id, tags));
  }, [id, tags, dispatch]);

  if (isLoading) return <Loading />;

  if (!isLoading && isError) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-170px)]">
        <p className="text-4xl text-red-500 font-bold">{error}</p>
      </div>
    );
  }

  if (!isLoading && !isError && relatedVideos.length <= 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-170px)]">
        <p className="text-4xl text-gray-500 font-bold">No Videos Found!</p>
      </div>
    );
  }

  // const { id: videoId, title, avatar, duration, thubmnail, views, date } = relatedVideos

  return (
    <>
      {relatedVideos.map((video) => (
        <RelatedVideo
          id={video.Id}
          title={video.title}
          avatar={video.avatar}
          duration={video.duration}
          thumbnail={video.thumbnail}
          views={video.views}
          date={video.date}
        />
      ))}
    </>
  );
};

export default RelatedVideos;
