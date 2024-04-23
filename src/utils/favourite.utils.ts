import { MovieOverviewType } from "../types/MovieType";

type CheckFavouriteProps = {
  listFavourites: MovieOverviewType[];
  movieId: number;
};

const favouriteUtils = {
  check: ({ listFavourites, movieId }: CheckFavouriteProps) =>
    listFavourites &&
    listFavourites.find((movie) => movie.id === movieId) !== undefined,
};

export default favouriteUtils;
