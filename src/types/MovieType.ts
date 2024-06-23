import { MovieCreditType } from "./CreditType";
import { FeedbackType } from "./FeedbackType";

export interface MovieOverviewType {
  id: number;
  language: string;
  title: string;
  genres: string;
  overview: string;
  runtime: string;
  backdropPath: string;
  posterPath: string;
  releaseDate: string;
  popularity: number;
  voteAverage: number;
  voteCount: number;
  status: string;
  credits: MovieCreditType[];
  genreList: GenreType[];
  imageList: MovieImageType[];
  feedbacks: FeedbackType[];
  trailer: VideoType;
  videos: VideoType[];
  createdAt: string;
  updatedAt: string;
}

export interface GenreType {
  id: number;
  name: string;
}

export interface MovieImageType {
  id: number;
  movieId: number;
  imagePath: string;
}

export interface VideoType {
  videoId: string;
  videoKey: string;
  movieId: number;
  videoName: string;
  official: boolean;
  publishedAt: Date;
  site: string;
  videoType: string;
}

export interface MovieSearchRequestType {
  query: string;
  limit: number;
  filter: number[];
  order: OrderType;
}

interface OrderType {
  label: string;
  value: string;
}

export interface AddMovieRequest {
  title?: string;
  overview?: string;
  runtime?: string;
  genres?: string[];
  language?: string;
  status?: "Released";
  releaseDate?: string;
  posterPath: string | null;
  videoPath: string | null;
  backdropPath: string | null;
}

export interface MovieModifiedResponse {
  id?: number;
  title?: string;
  overview?: string;
  runtime?: string;
  genres?: string[];
  language?: string;
  status?: "Released";
  releaseDate?: string;
  posterPath: string | null;
  videoPath: string | null;
  backdropPath: string | null;
  videoSite?: string;
}

export interface LockMovieRequest {
  movieId?: number;
  status: string;
}
