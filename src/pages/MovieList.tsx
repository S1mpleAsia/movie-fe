import { useEffect, useState } from "react";
import { MovieOverviewType } from "../types/MovieType";
import { Box } from "@mui/material";
import uiConfigs from "../configs/ui.config";
import Container from "../components/common/Container";
import MovieGrid from "../components/common/MovieGrid";
import { LoadingButton } from "@mui/lab";
import { movieAPI } from "../api/modules/movie.api";
import { GeneralType } from "../types/GeneralType";
import { toast } from "react-toastify";

const MovieList = () => {
  const [movies, setMovies] = useState<MovieOverviewType[]>([]);
  const [movieLoading, setMovieLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const onLoadMore = () => setCurrentPage(currentPage + 1);

  useEffect(() => {
    setMovieLoading(true);

    const getMovieList = async () => {
      const response: GeneralType<MovieOverviewType[]> = (
        await movieAPI.getMovieList(currentPage)
      ).data;

      if (response.status.statusCode !== 200) {
        toast.error(response.status.message);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response.data]);
      }
    };

    getMovieList();
    setMovieLoading(false);
  }, [currentPage]);

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="Exploring">
        <>
          {movies && (
            <>
              <MovieGrid movies={movies}></MovieGrid>
              <LoadingButton
                sx={{ marginTop: 8 }}
                fullWidth
                color="primary"
                loading={movieLoading}
                onClick={onLoadMore}
              >
                Load more
              </LoadingButton>
            </>
          )}
        </>
      </Container>
    </Box>
  );
};

export default MovieList;
