import React, { useEffect } from "react";
import { MovieOverviewType } from "../../types/MovieType";
import AutoSwiper from "./AutoSwiper";
import MovieItem from "./MovieItem";
import { SwiperSlide } from "swiper/react";
import { Typography } from "@mui/material";

type ActorMovieSlideProps = {
  movies: MovieOverviewType[];
};

const ActorMovieSlide = ({ movies }: ActorMovieSlideProps) => {
  useEffect(() => {
    console.log(movies);
  }, []);

  return (
    <>
      {movies && (
        <AutoSwiper>
          {movies &&
            movies?.map((movie, index) => (
              <SwiperSlide key={index}>
                <MovieItem movie={movie} />
              </SwiperSlide>
            ))}
        </AutoSwiper>
      )}

      {!movies && (
        <Typography
          fontSize={{ xs: "0.5rem", md: "0.5rem", lg: "1rem" }}
          fontStyle="italic"
          sx={{ opacity: 0.6 }}
        >
          There no media to display
        </Typography>
      )}
    </>
  );
};

export default ActorMovieSlide;
