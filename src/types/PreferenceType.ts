export interface CheckPreferenceResponse {
  isFavourite: boolean;
}

export interface UserPreferenceRequest {
  userId?: string;
  movieId?: number;
}
