import { MovieOverviewType } from "./MovieType";

export interface ActorType {
  actorId: number;
  name: string;
  profilePath: string;
  biography: string;
  birthday: string;
  gender: string;
}

export interface DetailActorInfoResponse {
  actor: ActorType;
  movies: MovieOverviewType[];
}
