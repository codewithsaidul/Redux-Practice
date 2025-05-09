export default function Player({title, videoPlayer}) {
    return (
        <iframe
            width="100%"
            className="aspect-video"
            src={videoPlayer}
            title={title}
            frameBorder=""
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
}
