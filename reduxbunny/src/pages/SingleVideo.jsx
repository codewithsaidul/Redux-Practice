import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Shared/Loading";
import RelatedVideos from "../components/SingleVideo/RelatedVideos";
import VideoDescription from "../components/SingleVideo/VideoDescription";
import VideoPlayer from "../components/SingleVideo/VideoPlayer";
import { fetchVideoAsync } from "../redux/features/video/videoSlice";

const SingleVideo = () => {

  const { videoId } = useParams()
  const dispatch = useDispatch()
  const { video, isLoading, isError, error } = useSelector(state => state.video)

  console.log(video)

  useEffect(() => {
    dispatch(fetchVideoAsync(videoId))
  }, [videoId, dispatch])


  if (isLoading) return <Loading />
  
  if (!isLoading && isError) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-170px)]">
        <p className="text-4xl text-red-500 font-bold">{error}</p>
      </div>
    )
  }


  if (!isLoading && !isError && Object.keys(video).length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-170px)]">
        <p className="text-4xl text-gray-500 font-bold">No Videos Found!</p>
      </div>
    )
  }



  return (
    <section className="pt-6 pb-20 px-4 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {/* <!-- video player --> */}

            <VideoPlayer videoLink={video.link} />
            {/* <!-- video description --> */}
            <VideoDescription title={video.title} date={video.date} likes={video.likes} unlikes={video.unlikes} description={video.description} />
          </div>

          {/* <!-- related videos --> */}
          <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {/* <!-- single related video --> */}
            <RelatedVideos />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleVideo;
