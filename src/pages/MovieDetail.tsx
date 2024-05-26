import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import { MovieOverviewType } from "../types/MovieType";
import { getImage, storageImage } from "../utils/constant";
import { toast } from "react-toastify";
import { PlayIcon } from "../components/common/PlayIcon";
import ShareIcon from "@mui/icons-material/Share";
import MovieVideoSlide from "../components/common/MovieVideoSlide";
import MovieGallery from "../components/common/MovieGallery";
import RecommendationSlide from "../components/common/RecommendationSlide";
import MovieReviews from "../components/common/MovieReviews";
import { preferenceAPI } from "../api/modules/preference.api";
import {
  CheckPreferenceResponse,
  UserPreferenceRequest,
} from "../types/PreferenceType";
import timeUtils from "../utils/time.utils";
import TrailerPopup from "../components/common/TrailerPopup";
import SharingPopup from "../components/common/SharingPopup";

const MovieDetail = () => {
  const { movieId } = useParams();
  const { user } = useSelector((state: RootState) => state.user);

  const [movie, setMovie] = useState<MovieOverviewType>();
  const [movieList, setMovieList] =
    useState<GeneralType<MovieOverviewType[]>>();
  const [isFavourite, setIsFavourite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showSharing, setShowSharing] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    const checkFavourite = async () => {
      const response: GeneralType<CheckPreferenceResponse> = (
        await preferenceAPI.checkPreference(
          user?.id || null,
          parseInt(movieId || "-1")
        )
      ).data;

      if (response.status.statusCode !== 200) {
        toast.error(response.status.message);
      } else {
        setIsFavourite(response.data.isFavourite);
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
        setMovie(response.data);
        dispatch(setGlobalLoading(false));
      }

      getMovieList();
      checkFavourite();
    };

    getMovie();
  }, [movieId, dispatch, user?.id]);

  const onFavouriteClick = async () => {
    if (!user) {
      setOnRequest(true);

      setTimeout(() => {
        navigate("/sign-in");
        setOnRequest(false);
      }, 1000);
    }

    if (onRequest) return;

    const request: UserPreferenceRequest = {
      userId: user?.id,
      movieId: parseInt(movieId || "-1"),
    };

    const response: GeneralType<string> = (
      await preferenceAPI.togglePreference(request)
    ).data;

    if (response.data) {
      setIsFavourite(!isFavourite);
      toast.success(response.data);
    } else toast.error("Update failed");
  };

  const onSharingClick = () => {
    setShowSharing(true);
  };

  return movie ? (
    <>
      <ImageHeader
        imgPath={getImage(storageImage.originalPath, movie.backdropPath)}
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
                    getImage(storageImage.w500Path, movie.posterPath)
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
                  {movie.title}
                </Typography>
                {/* Title */}

                {/* Rate and genres */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularRate value={movie.voteAverage} />
                  <Divider orientation="vertical" />
                  {movie &&
                    movie.genreList
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
                  {movie.overview}
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
                  className="playbtn"
                  onClick={() => {
                    console.log("Watch trailer", movie);
                    setShowTrailer(true);
                    setVideoId(movie.trailer.videoKey);
                  }}
                >
                  <PlayIcon />
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "1rem", md: "1rem", lg: "2rem" }}
                    fontWeight="700"
                    sx={{
                      transition: "all 0.7s ease-in-out",
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
                    onClick={onFavouriteClick}
                  />

                  <LoadingButton
                    variant="text"
                    sx={{
                      width: "max-content",
                      "& .MuiButton-startIcon": { marginRight: 0 },
                    }}
                    size="large"
                    startIcon={<ShareIcon />}
                    loadingPosition="start"
                    loading={onRequest}
                    onClick={onSharingClick}
                  />

                  <Button
                    variant="contained"
                    sx={{ width: "max-content" }}
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => navigate(`/movie/watch/${movieId}`)}
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
                        {movie.status}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>Release Date:</Typography>
                      <Typography
                        fontSize={{ xs: "1rem", md: "1rem", lg: "1rem" }}
                        sx={{ opacity: 0.6 }}
                      >
                        {timeUtils.formatDateToString(movie.releaseDate)}
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
                        {timeUtils.convertMovieRuntime(movie.runtime)}
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
          <CastSlide casts={movie.credits} />
        </Container>

        {/* Movie video */}
        <div ref={videoRef} style={{ paddingTop: "20px" }}>
          <Container header="Official Videos">
            {movie?.videos.length > 0 ? (
              <MovieVideoSlide
                videos={movie.videos.filter((movie, idx) => idx < 5)}
              />
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
          {movie?.imageList.length > 0 ? (
            <MovieGallery images={movie.imageList} />
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
          <MovieReviews movie={movie} />
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

      <SharingPopup
        show={showSharing}
        setShow={setShowSharing}
        movieId={parseInt(movieId || "-1")}
      />

      <TrailerPopup
        show={showTrailer}
        setShow={setShowTrailer}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </>
  ) : null;
};

export default MovieDetail;
