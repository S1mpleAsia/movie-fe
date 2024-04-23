import publicClient from "../client/public.client";
import { apiErrorHandling } from "../configs/apiErrorHandling";

const movieEndpoints = {
  getMovieList: "movie",
  getMovieDetail: (id: number) => `movie/${id}`,
  getGenreList: "genre",
};

export const movieAPI = {
  getMovieList: apiErrorHandling(async (page?: number | null) => {
    const response = publicClient.get(movieEndpoints.getMovieList, {
      params: { page: page },
    });

    return response;
  }),

  getMovieDetail: apiErrorHandling(async (id: number) => {
    const response = publicClient.get(movieEndpoints.getMovieDetail(id));

    return response;
  }),

  getGenreList: apiErrorHandling(async () => {
    const response = publicClient.get(movieEndpoints.getGenreList);

    return response;
  }),
};

export default movieEndpoints;
