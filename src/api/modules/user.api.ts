import {
  AvatarUpdateRequest,
  BannedUserRequestType,
  CredentialType,
  CredentialUpdateRequestType,
  ResendOTPRequestType,
  SignInRequestType,
  VerifyOTPType,
} from "../../types/CredentialType";
import { Period } from "../../types/time.type";
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
  bannedUser: "auth/user/banned",
  checkExisted: "auth/check-existed",
  resendOTP: "auth/resend-otp",
  updateInfo: "auth/user/update",
  changePwd: "auth/user/pwd",
  updateAvatar: "auth/user/avatar",
  getUserOverview: "auth/user/overview",
  getTotalUser: "auth/user/summary",
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

  bannedUser: apiErrorHandling(
    async (request: BannedUserRequestType | null) => {
      const response = privateClient.post(userEndpoints.bannedUser, request);

      return response;
    }
  ),

  checkExisted: apiErrorHandling(async (request: SignInRequestType | null) => {
    const response = publicClient.post(userEndpoints.checkExisted, request);

    return response;
  }),

  resendOTP: apiErrorHandling(async (request: ResendOTPRequestType | null) => {
    const response = publicClient.post(userEndpoints.resendOTP, request);

    return response;
  }),

  updateInfo: apiErrorHandling(
    async (request: CredentialUpdateRequestType | null) => {
      const response = publicClient.post(userEndpoints.updateInfo, request);

      return response;
    }
  ),

  changePwd: apiErrorHandling(async (request: SignInRequestType | null) => {
    const response = publicClient.post(userEndpoints.changePwd, request);

    return response;
  }),

  updateAvatar: apiErrorHandling(
    async (request: AvatarUpdateRequest | null) => {
      const response = publicClient.post(userEndpoints.updateAvatar, request);

      return response;
    }
  ),

  getUserOverview: apiErrorHandling(async (period: Period, date: string) => {
    const response = publicClient.get(userEndpoints.getUserOverview, {
      params: {
        period: period,
        date: date,
      },
    });

    return response;
  }),

  getTotalUser: apiErrorHandling(async () => {
    const response = publicClient.get(userEndpoints.getTotalUser);

    return response;
  }),
};

export default userEndpoints;
