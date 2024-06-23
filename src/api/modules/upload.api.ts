import formClient from "../client/form.client";
import { apiErrorHandling } from "../configs/apiErrorHandling";

const uploadEnpoints = {
  uploadFile: "storage",
  uploadFileWithPrefixPath: "storage/movie",
};

export const storageAPI = {
  uploadFile: apiErrorHandling(async (formData: FormData) => {
    const response = formClient.post(uploadEnpoints.uploadFile, formData);

    return response;
  }),

  uploadFileWithPrefixPath: apiErrorHandling(async (formData: FormData) => {
    const response = formClient.post(
      uploadEnpoints.uploadFileWithPrefixPath,
      formData
    );

    return response;
  }),
};
