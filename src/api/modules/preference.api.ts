import { UserPreferenceRequest } from "../../types/PreferenceType";
import privateClient from "../client/private.client";
import { apiErrorHandling } from "../configs/apiErrorHandling";

const preferenceEndpoint = {
  getPreferenceList: "preference",
  checkPreference: "preference/check",
  togglePreference: "preference",
};

export const preferenceAPI = {
  getPreferenceList: apiErrorHandling(async (userId: string | null) => {
    const response = privateClient.get(preferenceEndpoint.getPreferenceList, {
      params: {
        userId: userId,
      },
    });

    return response;
  }),

  checkPreference: apiErrorHandling(
    async (userId: string | null, movieId: number | null) => {
      const response = privateClient.get(preferenceEndpoint.checkPreference, {
        params: {
          userId: userId,
          movieId: movieId,
        },
      });

      return response;
    }
  ),

  togglePreference: apiErrorHandling(async (request: UserPreferenceRequest) => {
    const response = privateClient.post(
      preferenceEndpoint.togglePreference,
      request
    );

    return response;
  }),
};
