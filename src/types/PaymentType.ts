import { CredentialType } from "./CredentialType";

export interface CheckoutRequest {
  email: string;
  name: string;
  userId: string;
  type: PackageType;
}

export interface Purchase {
  id: string;
  userId: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PackageType {
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
}

export interface PaymentReponseWithCredential {
  userId: string;
  userCredential: CredentialType;
  purchase?: Purchase;
}
