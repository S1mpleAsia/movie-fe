import {
  FeedbackRequest,
  FeedbackUpdateRequest,
} from "../../types/FeedbackType";
import privateClient from "../client/private.client";
import publicClient from "../client/public.client";
import { apiErrorHandling } from "../configs/apiErrorHandling";

const feedbackEndpoints = {
  addFeedback: "feedback/private",
  getFeedbackOverall: "feedback/public/overview",
  deleteFeedback: "feedback/private",
  getFeedbackList: "feedback/public",
  getFeedbackTotalPage: "feedback/public/page",
  updateFeedback: "feedback/private",
  getFeedbackSummary: "feedback/private/summary",
};

export const feedbackAPI = {
  getFeedbackOverall: apiErrorHandling(async (movieId: number | null) => {
    const response = publicClient.get(feedbackEndpoints.getFeedbackOverall, {
      params: { movieId: movieId },
    });

    return response;
  }),

  addFeedback: apiErrorHandling(async (request: FeedbackRequest) => {
    const response = privateClient.post(feedbackEndpoints.addFeedback, request);

    return response;
  }),

  deleteFeedback: apiErrorHandling(async (feedbackId: string | null) => {
    const response = privateClient.delete(feedbackEndpoints.deleteFeedback, {
      params: {
        feedbackId: feedbackId,
      },
    });

    return response;
  }),

  getFeedbackList: apiErrorHandling(
    async (movieId: number | null, page: number) => {
      const response = privateClient.get(feedbackEndpoints.getFeedbackList, {
        params: {
          movieId: movieId,
          page: page,
        },
      });

      return response;
    }
  ),

  getFeedbackTotalPage: apiErrorHandling(async (movieId: number | null) => {
    const response = publicClient.get(feedbackEndpoints.getFeedbackTotalPage, {
      params: {
        movieId: movieId,
      },
    });

    return response;
  }),

  updateFeedback: apiErrorHandling(async (request: FeedbackUpdateRequest) => {
    const response = privateClient.put(
      feedbackEndpoints.updateFeedback,
      request
    );

    return response;
  }),

  getFeedbackSummary: apiErrorHandling(async (userId: string) => {
    const response = privateClient.get(feedbackEndpoints.getFeedbackSummary, {
      params: {
        userId: userId,
      },
    });

    return response;
  }),
};
