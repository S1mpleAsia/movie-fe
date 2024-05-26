import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import uiConfigs from "../configs/ui.config";
import Container from "../components/common/Container";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MovieOverviewType } from "../types/MovieType";
import { useNavigate, useParams } from "react-router-dom";
import { GeneralType } from "../types/GeneralType";
import { movieAPI } from "../api/modules/movie.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import ReactPlayer from "react-player";

const WatchingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieOverviewType>();

  useEffect(() => {
    const getMovie = async () => {
      dispatch(setGlobalLoading(true));
      const response: GeneralType<MovieOverviewType> = (
        await movieAPI.getMovieDetail(parseInt(movieId || "-1"))
      ).data;

      if (response.status.statusCode !== 200) {
        toast.error(response.status.message);
      } else {
        setMovie(response.data);
        dispatch(setGlobalLoading(false));
      }
    };

    getMovie();
  }, []);

  return movie ? (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="Watching">
        <>
          {/* Header */}
          <Box display="flex" alignItems="center" gap={2}>
            <ArrowBackIcon
              fontSize="medium"
              sx={{
                cursor: "pointer",
              }}
              onClick={() => navigate(`/movie/${movieId}`)}
            />
            <Typography fontSize="1.5rem" fontWeight="700">
              {movie.title}
            </Typography>
          </Box>
          {/* Header */}

          {/* Watching */}
          <Box
            className="watchingPlayer"
            sx={{
              width: "100%",
              aspectRatio: "16 / 9",
              backgroundCOlor: "white",
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${movie.trailer.videoKey}`}
              controls
              width="100%"
              height="100%"
            />
          </Box>
          {/* Watching */}
        </>
      </Container>
    </Box>
  ) : (
    <Box></Box>
  );
};

export default WatchingPage;
