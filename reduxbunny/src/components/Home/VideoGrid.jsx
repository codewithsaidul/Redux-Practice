import Pagination from "./Pagination";
import Video from "./Video";

const VideoGrid = () => {
  return (
    <section className="pt-12">
      <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
        <Video />
      </div>
      <Pagination />
    </section>
  );
};

export default VideoGrid;
