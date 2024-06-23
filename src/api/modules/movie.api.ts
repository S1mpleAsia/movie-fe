import {
  AddMovieRequest,
  LockMovieRequest,
  MovieModifiedResponse,
  MovieSearchRequestType,
} from "../../types/MovieType";
import publicClient from "../client/public.client";
import { apiErrorHandling } from "../configs/apiErrorHandling";

const movieEndpoints = {
  getMovieList: "movie",
  getMovieDetail: (id: number) => `movie/${id}`,
  getGenreList: "genre",
  getTopratedMovieList: "movie/top-rated",
  getRecommendMovieList: "movie/recommend",
  getMovieSearch: "movie/search",
  getTotalMovie: "movie/summary",
  saveMovie: "movie",
  getAllMovie: "movie/all",
  updateMovie: "movie/modified",
  getBasicInfo: "movie/basic-info",
  lockMovie: "movie/lock",
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

  getTopratedMovieList: apiErrorHandling(async () => {
    const response = publicClient.get(movieEndpoints.getTopratedMovieList);

    return response;
  }),

  getRecommendMovieList: apiErrorHandling(async (query: string) => {
    const response = publicClient.get(movieEndpoints.getRecommendMovieList, {
      params: {
        query: query,
        limit: 10,
      },
    });

    return response;
  }),

  getMovieSearch: apiErrorHandling(
    async (request: MovieSearchRequestType | null) => {
      const response = publicClient.post(
        movieEndpoints.getMovieSearch,
        request
      );

      return response;
    }
  ),

  getTotalMovie: apiErrorHandling(async () => {
    const response = publicClient.get(movieEndpoints.getTotalMovie);

    return response;
  }),

  saveMovie: apiErrorHandling(async (request: AddMovieRequest) => {
    const response = publicClient.post(movieEndpoints.saveMovie, request);

    return response;
  }),

  getAllMovie: apiErrorHandling(async () => {
    const response = publicClient.get(movieEndpoints.getAllMovie);
    return response;
  }),

  updateMovie: apiErrorHandling(
    async (request: MovieModifiedResponse | null) => {
      const response = publicClient.post(movieEndpoints.updateMovie, request);

      return response;
    }
  ),

  getBasicInfo: apiErrorHandling(async (id: number) => {
    const response = publicClient.get(movieEndpoints.getBasicInfo, {
      params: {
        id: id,
      },
    });

    return response;
  }),

  lockMovie: apiErrorHandling(async (request: LockMovieRequest | null) => {
    const response = publicClient.post(movieEndpoints.lockMovie, request);

    return response;
  }),
};

export default movieEndpoints;
