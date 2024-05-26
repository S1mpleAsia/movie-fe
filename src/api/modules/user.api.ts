import {
  CredentialType,
  SignInRequestType,
  VerifyOTPType,
} from "../../types/CredentialType";
import privateClient from "../client/private.client";
import publicClient from "../client/public.client";
import { apiErrorHandling } from "../configs/apiErrorHandling";

const userEndpoints = {
  initRegister: "auth",
  registerStatus: "auth",
  verifyOTP: "auth/verify",
  signin: "auth/sign-in",
  getInfo: "auth/info",
  passwordUpdate: "auth/update-password",
  getFavourites: "auth/favourites",
  addFavourites: "auth/favourites",
  getAllUser: "auth/user",
};

export const userAPI = {
  initRegister: apiErrorHandling(async (request: CredentialType | null) => {
    const response = publicClient.post(userEndpoints.initRegister, request);

    return response;
  }),

  registerStatus: apiErrorHandling(async (orderId: string | null) => {
    const response = publicClient.get(userEndpoints.initRegister, {
      params: {
        orderId: orderId,
      },
    });

    return response;
  }),

  verifyOTP: apiErrorHandling(async (request: VerifyOTPType | null) => {
    const response = publicClient.post(userEndpoints.verifyOTP, request);

    return response;
  }),

  signIn: apiErrorHandling(async (request: SignInRequestType | null) => {
    const response = publicClient.post(userEndpoints.signin, request);

    return response;
  }),

  getAllUser: apiErrorHandling(async () => {
    const response = privateClient.get(userEndpoints.getAllUser);

    return response;
  }),
};

export default userEndpoints;
