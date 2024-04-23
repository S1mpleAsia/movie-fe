import { useEffect, useState } from "react";
import { movieAPI } from "../../api/modules/movie.api";
import AutoSwiper from "./AutoSwiper";
import { GeneralType } from "../../types/GeneralType";
import { MovieOverviewType } from "../../types/MovieType";
import { toast } from "react-toastify";
import { SwiperSlide } from "swiper/react";
import MovieItem from "./MovieItem";

type MovieSlideProps = {
  type?: string;
};

const MovieSlide = ({ type }: MovieSlideProps) => {
  const [movies, setMovies] = useState<GeneralType<MovieOverviewType[]>>();

  useEffect(() => {
    const getMovies = async () => {
      const response: GeneralType<MovieOverviewType[]> = (
        await movieAPI.getMovieList()
      ).data;

      if (response.status.statusCode !== 200) {
        toast.error(response.status.message);
      } else {
        setMovies(response);
      }
    };

    getMovies();
  }, [type]);

  return (
    <AutoSwiper>
      {movies?.data.map((movie, index) => (
        <SwiperSlide key={index}>
          <MovieItem movie={movie} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MovieSlide;
