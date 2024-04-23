import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { movieAPI } from "../../api/modules/movie.api";
import { GeneralType } from "../../types/GeneralType";
import { GenreType, MovieOverviewType } from "../../types/MovieType";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import uiConfigs from "../../configs/ui.config";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getImage, storageImage } from "../../utils/constant";
import CircularRate from "./CircularRate";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link } from "react-router-dom";
import { routesGen } from "../../routes/route";

const HeroSlide = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState<GeneralType<MovieOverviewType[]>>();
  const [genres, setGenres] = useState<GeneralType<GenreType[]>>();

  useEffect(() => {
    const getMovieList = async () => {
      const response: GeneralType<MovieOverviewType[]> = (
        await movieAPI.getMovieList()
      ).data;

      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else {
        setMovies(response);
        dispatch(setGlobalLoading(false));
      }
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const response: GeneralType<GenreType[]> = (await movieAPI.getGenreList())
        .data;

      if (response.status.statusCode !== 200) {
        toast.error(response.status.message);
        setGlobalLoading(false);
      } else {
        setGenres(response);
        getMovieList();
      }
    };

    getGenres();
  }, [dispatch]);

  return (
    <Box
      className="bottom-bg-layout"
      sx={{
        position: "relative",
        color: "primary.contrastText",
        "&::before": {
          content: '""',
          width: "100%",
          height: "30%",
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: "none",
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
        },
      }}
    >
      <Swiper
        grabCursor={true}
        loop={true}
        // modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        // autoplay={{
        //   delay: 2000,
        //   disableOnInteraction: false,
        // }}
      >
        {movies?.data.slice(0, 5).map((movie, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                paddingTop: {
                  xs: "130%",
                  sm: "80%",
                  md: "60%",
                  lg: "45%",
                },
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundImage: `url(${getImage(
                  storageImage.originalPath,
                  movie.backdropPath || movie.posterPath
                )})`,
              }}
            />

            <Box
              className="horizontal-bg-layout"
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                ...uiConfigs.style.horizontalGradientBgImage[
                  theme.palette.mode
                ],
              }}
            />

            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                paddingX: { sm: "10px", md: "5rem", lg: "10rem" },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "30px",
                  color: "text.primary",
                  width: { sm: "unset", md: "30%", lg: "40%" },
                }}
              >
                <Stack spacing={4} direction="column">
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

                  <Stack direction="row" spacing={1}>
                    <CircularRate value={movie.voteAverage} />

                    <Divider orientation="vertical" />
                    {/* Genre */}
                    {[...movie.genres.split(",")]
                      .splice(0, 2)
                      .map((genreId, index) => (
                        <Chip
                          variant="filled"
                          color="primary"
                          key={index}
                          label={
                            genres?.data.find(
                              (e) => e.id === parseInt(genreId)
                            ) &&
                            genres?.data.find((e) => e.id === parseInt(genreId))
                              ?.name
                          }
                        />
                      ))}
                    {/* Genre */}
                  </Stack>

                  {/* Overview */}
                  <Typography
                    variant="body1"
                    sx={{
                      ...uiConfigs.style.typoLines(3),
                    }}
                  >
                    {movie.overview}
                  </Typography>
                  {/* Overview */}

                  {/* Button */}
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    to={routesGen.movieDetail("" + movie.id)}
                    sx={{ width: "max-content" }}
                  >
                    Watch now
                  </Button>
                  {/* Button */}
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
