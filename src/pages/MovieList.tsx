import { useEffect, useState } from "react";
import { MovieOverviewType } from "../types/MovieType";
import { Box } from "@mui/material";
import uiConfigs from "../configs/ui.config";
import Container from "../components/common/Container";
import MovieGrid from "../components/common/MovieGrid";
import { LoadingButton } from "@mui/lab";

const MovieList = () => {
  const [movies, setMovies] = useState<MovieOverviewType[]>();
  const [movieLoading, setMovieLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const onLoadMore = () => setCurrentPage(currentPage + 1);

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
