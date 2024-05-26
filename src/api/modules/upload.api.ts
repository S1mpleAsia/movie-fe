import formClient from "../client/form.client";
import { apiErrorHandling } from "../configs/apiErrorHandling";

const uploadEnpoints = {
  uploadFile: "storage",
};

export const storageAPI = {
  uploadFile: apiErrorHandling(async (formData: FormData) => {
    const response = formClient.post(uploadEnpoints.uploadFile, formData);

    return response;
  }),
};
