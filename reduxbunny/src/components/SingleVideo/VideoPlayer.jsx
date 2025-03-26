

const VideoPlayer = ( { videoLink } ) => {
  return (
    <iframe
      width="100%"
      className="aspect-video"
      src={videoLink}
      title="Some video title"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default VideoPlayer;
