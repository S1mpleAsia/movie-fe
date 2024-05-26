import { Box } from "@mui/material";
import { useEffect } from "react";
import ReactPlayer from "react-player/youtube";

type TrailerPopupProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  videoId: string | null;
  setVideoId: React.Dispatch<React.SetStateAction<string | null>>;
};

const TrailerPopup = ({
  show,
  setShow,
  videoId,
  setVideoId,
}: TrailerPopupProps) => {
  useEffect(() => {
    console.log(videoId);
  }, [videoId]);

  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };

  return (
    <Box
      className={`videoPopup ${show ? "visible" : ""}`}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        opacity: 0,
        visibility: "hidden",
        zIndex: 9999,
      }}
    >
      <Box
        className="opacityLayer"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(3.5px)",
          WebkitBackdropFilter: "blur(3.5px)",
          opacity: 0,
          transition: "opacity 400ms",
        }}
        onClick={hidePopup}
      ></Box>
      <Box
        className="videoPlayer"
        sx={{
          position: "relative",
          width: "800px",
          aspectRatio: "16 / 9",
          backgroundColor: "white",
          transform: "scale(0.2)",
          transition: "transform 250ms",
        }}
      >
        <Box
          component="span"
          className="closeBtn"
          sx={{
            position: "absolute",
            top: "-20px",
            right: 0,
            color: "white",
            cursor: "pointer",
          }}
          onClick={hidePopup}
        >
          Close
        </Box>

        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
        />
      </Box>
    </Box>
  );
};

export default TrailerPopup;
