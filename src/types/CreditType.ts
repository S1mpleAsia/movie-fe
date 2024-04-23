export interface CreditType {
  creditId: number;
  movieId: number;
  casting: string;
  actorId: number;
  role: string;
}

export interface MovieCreditType {
  creditId: number;
  actorId: number;
  name: string;
  profilePath: string;
  biography: string;
  birthday: string;
  gender: string;
  role: string;
  casting: string;
}
