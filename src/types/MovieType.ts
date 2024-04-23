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
