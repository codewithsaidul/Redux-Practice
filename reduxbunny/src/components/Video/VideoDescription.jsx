import RelatedVideo from "./RelatedVideo";

const Video = () => {
  return (
    <section class="pt-6 pb-20 px-4 md:px-12 lg:px-20">
      <div class="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div class="grid grid-cols-3 gap-2 lg:gap-8">
          <div class="col-span-full w-full space-y-8 lg:col-span-2">
            {/* <!-- video player --> */}
            <iframe
              width="100%"
              class="aspect-video"
              src="https://www.youtube-nocookie.com/embed/6O4s7v28nlw"
              title="Some video title"
              frameborder=""
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>

            {/* <!-- video description --> */}
            <div>
              <h1 class="text-lg font-semibold tracking-tight text-slate-800">
                Some video title
              </h1>
              <div class="pb-4 flex items-center space-between border-b">
                <h2 class="text-sm leading-[1.7142857] text-slate-600 w-full">
                  Uploaded on 23 Nov 2022
                </h2>

                {/* <!-- like/unlike --> */}
                <div class="flex gap-10 w-48">
                  <div class="flex gap-1">
                    <div class="shrink-0">
                      <img
                        class="w-5 block"
                        src="./assets/like.svg"
                        alt="Like"
                      />
                    </div>
                    <div class="text-sm leading-[1.7142857] text-slate-600">
                      100K
                    </div>
                  </div>
                  <div class="flex gap-1">
                    <div class="shrink-0">
                      <img
                        class="w-5 block"
                        src="./assets/unlike.svg"
                        alt="Unlike"
                      />
                    </div>
                    <div class="text-sm leading-[1.7142857] text-slate-600">
                      100K
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4 text-sm text-[#334155] dark:text-slate-400">
                Some video description here
              </div>
            </div>
          </div>

          {/* <!-- related videos --> */}
          <div class="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {/* <!-- single related video --> */}
           <RelatedVideo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;
