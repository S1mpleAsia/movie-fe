import { SwiperSlide } from "swiper/react";
import { MovieOverviewType } from "../../types/MovieType";
import AutoSwiper from "./AutoSwiper";
import MovieItem from "./MovieItem";

type RecommendationSlideProp = {
  movies: MovieOverviewType[] | undefined;
};

const RecommendationSlide = ({ movies }: RecommendationSlideProp) => {
  return (
    <AutoSwiper>
      {movies?.map((movie, index) => (
        <SwiperSlide key={index}>
          <MovieItem movie={movie} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommendationSlide;
