export interface CredentialType {
  id?: string;
  email: string;
  birthday?: string;
  gender: string;
  password: string;
  fullName: string;
  imagePath?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  token?: string;
  role?: string;
  region?: string;
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

export interface BannedUserRequestType {
  id: string;
}

export interface CheckExistedCredentialType {
  email: string;
  existed: boolean;
}

export interface ResendOTPRequestType {
  email: string;
}

export interface CredentialUpdateRequestType {
  id: string;
  fullName?: string;
  birthday?: string;
  gender?: string;
  region?: string;
}

export interface AvatarUpdateRequest {
  id: string;
  path: string;
}
