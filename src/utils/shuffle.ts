import { MovieOverviewType } from "../types/MovieType";

export const shuffle = (array: MovieOverviewType[] | undefined) => {
  if (array === undefined) return array;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
