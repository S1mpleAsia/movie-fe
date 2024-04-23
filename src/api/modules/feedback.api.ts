import publicClient from "../client/public.client";
import { apiErrorHandling } from "../configs/apiErrorHandling";

const feedbackEndpoints = {
  addFeedback: "feedback/private",
  getFeedbackOverall: "feedback/public/overview",
  deleteFeedback: "feedback/private",
};

export const feedbackAPI = {
  getFeedbackOverall: apiErrorHandling(async (movieId: number | null) => {
    const response = publicClient.get(feedbackEndpoints.getFeedbackOverall, {
      params: { movieId: movieId },
    });

    return response;
  }),
};
