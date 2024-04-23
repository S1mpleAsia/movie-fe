import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { movieAPI } from "../api/modules/movie.api";
import ImageHeader from "../components/common/ImageHeader";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.config";
import CircularRate from "../components/common/CircularRate";
import { LoadingButton } from "@mui/lab";
import Container from "../components/common/Container";
import CastSlide from "../components/common/CastSlide";
import { GeneralType } from "../types/GeneralType";
import { GenreType, MovieOverviewType } from "../types/MovieType";
import { getImage, storageImage } from "../utils/constant";
import { toast } from "react-toastify";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { PlayIcon } from "../components/common/PlayIcon";
import MovieVideoSlide from "../components/common/MovieVideoSlide";
import MovieGallery from "../components/common/MovieGallery";
import RecommendationSlide from "../components/common/RecommendationSlide";
import MovieReviews from "../components/common/MovieReviews";

const MovieDetail = () => {
  const { movieId } = useParams();

  const { user, listFavourites } = useSelector(
    (state: RootState) => state.user
  );
  const [movie, setMovie] = useState<GeneralType<MovieOverviewType>>();
  const [movieList, setMovieList] =
    useState<GeneralType<MovieOverviewType[]>>();
  const [isFavourite, setIsFavourite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);

  const dispatch = useDispatch();
  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getMovieList = async () => {
      const response: GeneralType<MovieOverviewType[]> = (
        await movieAPI.getMovieList()
      ).data;

      if (response.status.statusCode !== 200) {
        toast.error(response.status.message);
      } else {
        setMovieList(response);
      }
    };

    const getMovie = async () => {
      dispatch(setGlobalLoading(true));
      const response: GeneralType<MovieOverviewType> = (
        await movieAPI.getMovieDetail(parseInt(movieId || "-1"))
      ).data;

      if (response.status.statusCode !== 200) {
        toast.error(response.status.message);
      } else {
        setMovie(response);
        dispatch(setGlobalLoading(false));
      }

      getMovieList();
    };

    getMovie();
  }, [movieId, dispatch]);

  const onFavouriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequest) return;

    if (isFavourite) {
    }
  };

  return movie ? (
    <>
      <ImageHeader
        imgPath={getImage(storageImage.originalPath, movie.data.backdropPath)}
      />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* Movie content */}
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            {/* Poster */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(
                    getImage(storageImage.w500Path, movie.data.posterPath)
                  ),
                }}
              />
            </Box>
            {/* Poster */}

            {/* MediaInfo */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
              }}
            >
              <Stack spacing={5}>
                {/* Title */}
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                >
                  {movie.data.title}
                </Typography>
                {/* Title */}

                {/* Rate and genres */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularRate value={movie.data.voteAverage} />
                  <Divider orientation="vertical" />
                  {movie &&
                    movie.data.genreList
                      .slice(0, 2)
                      .map((genre, index) => (
                        <Chip
                          label={genre.name}
                          variant="filled"
                          color="primary"
                          key={index}
                        />
                      ))}
                </Stack>
                {/* Rate and genres */}

                {/* Overview */}
                <Typography
                  variant="h4"
                  fontSize={{ xs: "1.5rem", md: "1.5rem", lg: "3rem" }}
                  fontWeight="700"
                >
                  Overview
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ ...uiConfigs.style.typoLines(5) }}
                >
                  {movie.data.overview}
                </Typography>
                {/* Overview */}

                {/* Watch trailer */}
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "#da2f68",
                    },
                  }}
                >
                  <PlayIcon />
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "1rem", md: "1rem", lg: "2rem" }}
                    fontWeight="700"
                    sx={{
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    Watch Trailer
                  </Typography>
                </Stack>
                {/* Watch trailer */}

                <Stack direction="row" spacing={1}>
                  <LoadingButton
                    variant="text"
                    sx={{
                      width: "max-content",
                      "& .MuiButton-startIcon": { marginRight: 0 },
                    }}
                    size="large"
                    startIcon={
                      isFavourite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loadingPosition="start"
                    loading={onRequest}
                  />

                  <Button
                    variant="contained"
                    sx={{ width: "max-content" }}
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => {}}
                  >
                    Watch now
                  </Button>
                </Stack>

                {/* Detail Info */}
                <Stack direction="column" spacing={2}>
                  <Stack
                    direction={{ xs: "column", md: "row", lg: "row" }}
                    spacing={5}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography
                        fontSize={{ xs: "1rem", md: "1rem", lg: "1rem" }}
                        fontWeight="700"
                      >
                        Status:
                      </Typography>
                      <Typography
                        fontSize={{ xs: "1rem", md: "1rem", lg: "1rem" }}
                        sx={{ opacity: 0.6 }}
                      >
                        {movie.data.status}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>Release Date:</Typography>
                      <Typography
                        fontSize={{ xs: "1rem", md: "1rem", lg: "1rem" }}
                        sx={{ opacity: 0.6 }}
                      >
                        2024, October
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography
                        fontSize={{ xs: "1rem", md: "1rem", lg: "1rem" }}
                        fontWeight="700"
                      >
                        Runtime:
                      </Typography>
                      <Typography
                        fontSize={{ xs: "1rem", md: "1rem", lg: "1rem" }}
                        sx={{ opacity: 0.6 }}
                      >
                        {movie.data.runtime}
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider orientation="horizontal" />
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography>Language:</Typography>
                    <Typography
                      fontSize={{ xs: "1rem", md: "1rem", lg: "1rem" }}
                      sx={{ opacity: 0.6 }}
                    >
                      English
                    </Typography>
                  </Box>
                  <Divider orientation="horizontal" />
                </Stack>
                {/* Detail Info */}
              </Stack>
            </Box>
            {/* MediaInfo */}
          </Box>
        </Box>
        {/* Movie content */}

        <Container header="Cast">
          <CastSlide casts={movie.data.credits} />
        </Container>

        {/* Movie video */}
        <div ref={videoRef} style={{ paddingTop: "20px" }}>
          <Container header="Official Videos">
            {movie?.data.videos.length > 0 ? (
              <MovieVideoSlide videos={movie.data.videos.splice(0, 5)} />
            ) : (
              <Typography
                fontSize={{ xs: "0.5rem", md: "0.5rem", lg: "1rem" }}
                fontStyle="italic"
                sx={{ opacity: 0.6 }}
              >
                No official videos
              </Typography>
            )}
          </Container>
        </div>
        {/* Movie video */}

        {/* Movie Grid Image */}
        <Container header="Gallery">
          {movie?.data.imageList.length > 0 ? (
            <MovieGallery images={movie.data.imageList} />
          ) : (
            <Typography
              fontSize={{ xs: "0.5rem", md: "0.5rem", lg: "1rem" }}
              fontStyle="italic"
              sx={{ opacity: 0.6 }}
            >
              No images
            </Typography>
          )}
        </Container>
        {/* Movie Grid Image */}

        {/* Feedback */}
        <Container header="Reviews">
          <MovieReviews movie={movie.data} />
        </Container>
        {/* Feedback */}

        {/* Recommendation movie */}
        <Container header="You may also like">
          {movieList?.data && movieList.data.length > 0 ? (
            <RecommendationSlide movies={movieList?.data} />
          ) : (
            <Typography
              fontSize={{ xs: "0.5rem", md: "0.5rem", lg: "1rem" }}
              fontStyle="italic"
              sx={{ opacity: 0.6 }}
            >
              No recommendation movie
            </Typography>
          )}
        </Container>
        {/* Recommendation movie */}
      </Box>
    </>
  ) : null;
};

export default MovieDetail;
