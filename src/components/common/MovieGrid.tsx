import { Grid } from "@mui/material";
import React from "react";
import { MovieOverviewType } from "../../types/MovieType";
import MovieItem from "./MovieItem";

type MovieGridProps = {
  movies: MovieOverviewType[];
};

const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: "-8px !important" }}>
      {movies.map((movie, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <MovieItem movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
