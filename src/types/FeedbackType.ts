import { CredentialType } from "./CredentialType";

export interface FeedbackType {
  id: string;
  userId: string;
  movieId: number;
  feedback: string;
  vote: number;
  userCredential: CredentialType;
}

export interface FeedbackDeleteResponse {
  status: string;
}

export interface FeedbackOverallResponse {
  movieId: number;
  voteAverage: number;
  voteCount: number;
  voteOverall: string;
  feedbackComponentList: FeedbackComponent[];
}

export interface FeedbackRequest {
  movieId: number;
  userId: string;
  feedback: string;
  vote: number;
}

export interface FeedbackResponse {
  id: string;
  movieId: number;
  feedback: string;
  vote: number;
  userId: string;
}

export interface FeedbackComponent {
  rating: number;
  total: number;
  percentage: number;
}
