

function formatLikes(number) {
  if (number >= 1_000_000) {
      return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + "M";
  } else if (number >= 1_000) {
      return (number / 1_000).toFixed(1).replace(/\.0$/, '') + "K";
  }
  return number.toString();
}

const VideoDescription = ({ title, date, likes, unlikes, description }) => {
  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-800">
        {title}
      </h1>
      <div className="pb-4 flex items-center space-between border-b">
        <h2 className="text-sm leading-[1.7142857] text-slate-600 w-full">
          Uploaded on {date}
        </h2>

        {/* <!-- like/unlike --> */}
        <div className="flex gap-10 w-48">
          <div className="flex gap-1">
            <div className="shrink-0">
              <img className="w-5 block" src="/assets/like.svg" alt="Like" />
            </div>
            <div className="text-sm leading-[1.7142857] text-slate-600">
              {formatLikes(likes)}
            </div>
          </div>
          <div className="flex gap-1">
            <div className="shrink-0">
              <img
                className="w-5 block"
                src="/assets/unlike.svg"
                alt="Unlike"
              />
            </div>
            <div className="text-sm leading-[1.7142857] text-slate-600">
              {formatLikes(unlikes)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-[#334155] dark:text-slate-400">
        {description}
      </div>
    </div>
  );
};

export default VideoDescription;
