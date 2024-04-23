import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { videoPath } from "../../utils/constant";
import { VideoType } from "../../types/MovieType";
import NavigationSwiper from "./NavigationSwiper";
import { SwiperSlide } from "swiper/react";

type MovieVideoProps = {
  videos: VideoType[];
};

type VideoProps = {
  video: VideoType;
};

const MovieVideo = ({ video }: VideoProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const height = (iframeRef.current!.offsetWidth * 9) / 16 + "px";
    iframeRef.current?.setAttribute("height", height);
  }, [video]);

  return (
    <Box sx={{ height: "max-content" }}>
      <iframe
        key={video.videoKey}
        src={videoPath(video.videoKey)}
        ref={iframeRef}
        width="100%"
        title={video.videoName}
        style={{ border: "0" }}
      ></iframe>
    </Box>
  );
};

const MovieVideoSlide = ({ videos }: MovieVideoProps) => {
  return (
    <NavigationSwiper>
      {videos.map((video, index) => (
        <SwiperSlide key={index}>
          <MovieVideo video={video} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default MovieVideoSlide;
