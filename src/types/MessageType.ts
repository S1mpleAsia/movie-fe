import { CredentialType } from "./CredentialType";
import { MovieOverviewType } from "./MovieType";

export interface MessageType {
  id?: string;
  senderId: string;
  receiverId: string;
  content?: string;
  imagePath?: string | null;
  isSeen?: boolean;
  type: string;
  createdAt?: Date;
  movieId?: number;
  movie?: MovieOverviewType;
}

export interface UserMessageType {
  partnerId: string;
  userCredential: CredentialType;
  messageDtoList: MessageType[];
}

export enum Message {
  TEXT = "TEXt",
  NOTIFY = "NOTIFY",
  IMAGE = "IMAGE",
  LINK = "LINK",
}
