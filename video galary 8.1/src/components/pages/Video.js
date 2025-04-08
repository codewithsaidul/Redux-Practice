import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../feature/api/apiSlice";
import Error from "../ui/Error";
import PlayerLoader from "../ui/loaders/PlayerLoader";
import RelatedVideoLoader from "../ui/loaders/RelatedVideoLoader";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";

export default function Video() {
  const { videoId } = useParams();
  const { data: video, isLoading, isError } = useGetVideoQuery(videoId);
  const { id, title, description, date, link } = video || {}

  // check if video object empty or not
  let isVideoAvailable =
    video && typeof video === "object" && Object.keys(video).length !== 0;

  // check what to render
  let content = null;

  if (isLoading) {
    content = <PlayerLoader />;
  }

  if (!isLoading && isError) {
    content = <Error message={"There was an error occured!"} />;
  }

  if (!isLoading && !isError && isVideoAvailable) {
    content = (
      <>
        <Player title={title} videoPlayer={link} />
        <Description id={id} title={title} description={description} date={date} isLoading={isLoading} />
      </>
    );
  }

  return (
    <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {content}
          </div>

          {isVideoAvailable ? (
            <RelatedVideos id={id} title={title} />
          ) : isLoading ? (
            <>
              {" "}
              <RelatedVideoLoader />{" "}
              <RelatedVideoLoader />{" "}
              <RelatedVideoLoader />{" "}
            </>
          ) : (
            <Error message={"There was an error occured!"} />
          )}
        </div>
      </div>
    </section>
  );
}
