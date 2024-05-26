import publicClient from "../client/public.client";
import { apiErrorHandling } from "../configs/apiErrorHandling";

const actorEndpoints = {
  getDetailActorInfo: (id: number) => `actor/info/${id}`,
};

export const actorAPI = {
  getDetailActorInfo: apiErrorHandling(async (id: number) => {
    const response = publicClient.get(actorEndpoints.getDetailActorInfo(id));

    return response;
  }),
};
