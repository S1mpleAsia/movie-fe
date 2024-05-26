export interface CredentialType {
  id?: string;
  email: string;
  birthday: string;
  gender: string;
  password: string;
  fullName: string;
  imagePath?: string;
  backgroundPath?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  token?: string;
  role?: string;
}

export interface RegisterInitResponseType {
  orderId: string;
  status: string;
}

export interface VerifyOTPType {
  email: string;
  otp?: string;
}

export interface SignInRequestType {
  email: string;
  password: string;
}
