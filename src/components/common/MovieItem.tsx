import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { MovieOverviewType } from "../../types/MovieType";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { routesGen } from "../../routes/route";
import { Box, Button, Stack, Typography } from "@mui/material";
import uiConfigs from "../../configs/ui.config";
import { getImage, storageImage } from "../../utils/constant";
import favouriteUtils from "../../utils/favourite.utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CircularRate from "./CircularRate";
import timeUtils from "../../utils/time.utils";

type MovieItemProps = {
  movie: MovieOverviewType;
};

const MovieItem = ({ movie }: MovieItemProps) => {
  const { listFavourites } = useSelector((state: RootState) => state.user);
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState<string | null>(null);
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    setTitle(movie.title);
    setPosterPath(movie.posterPath);
    setReleaseDate(movie.releaseDate);
    setRate(movie.voteAverage);
  }, [movie]);

  return (
    <Link to={routesGen.movieDetail("" + movie.id)}>
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(
            getImage(storageImage.w500Path, posterPath)
          ),
          paddingTop: "160%",
          "&:hover .media-info": { opacity: 1, bottom: 0 },
          "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
          color: "primary.contrastText",
        }}
      >
        <>
          {favouriteUtils.check({ listFavourites, movieId: movie.id }) && (
            <FavoriteIcon
              color="primary"
              sx={{
                position: "absolute",
                top: 2,
                right: 2,
                fontSize: "2rem",
              }}
            />
          )}

          <Box
            className="media-back-drop"
            sx={{
              opacity: { xs: 1, md: 0 },
              transition: "all 0.3s ease",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundImage:
                "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
            }}
          />

          <Button
            className="media-play-btn"
            variant="contained"
            startIcon={<PlayArrowIcon />}
            sx={{
              display: { xs: "none", md: "flex" },
              opacity: 0,
              transition: "all 0.3s ease",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              "& .MuiButton-startIcon": { marginRight: "-4px" },
            }}
          />

          <Box
            className="media-info"
            sx={{
              transition: "all 0.3s ease",
              opacity: { xs: 1, md: 0 },
              position: "absolute",
              bottom: { xs: 0, md: "-20px" },
              width: "100%",
              height: "max-content",
              boxSizing: "border-box",
              padding: { xs: "10px", md: "2rem 1rem" },
            }}
          >
            <Stack spacing={{ xs: 1, md: 2 }}>
              {rate && <CircularRate value={rate} />}
              <Typography>
                {timeUtils.convertTimestampToYear(releaseDate)}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="700"
                sx={{
                  fontSize: "1rem",
                  ...uiConfigs.style.typoLines(1, "left"),
                }}
              >
                {title}
              </Typography>
            </Stack>
          </Box>
        </>
      </Box>
    </Link>
  );
};

export default MovieItem;
