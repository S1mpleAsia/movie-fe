import { MessageType } from "../../types/MessageType";
import privateClient from "../client/private.client";
import { apiErrorHandling } from "../configs/apiErrorHandling";

const messageEndpoints = {
  saveMessage: "message",
  getUserMessage: "message/all",
  uploadFile: "storage",
};

export const messageAPI = {
  saveMessage: apiErrorHandling(async (messageDto: MessageType) => {
    const response = privateClient.post(
      messageEndpoints.saveMessage,
      messageDto
    );

    return response;
  }),

  getUserMessage: apiErrorHandling(async (userId: string | null) => {
    const response = privateClient.get(messageEndpoints.getUserMessage, {
      params: { userId: userId },
    });

    return response;
  }),
};
