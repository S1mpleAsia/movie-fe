import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiFunction<T extends any[], R> = (...args: T) => Promise<R>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiErrorHandling = <T extends any[], R>(
  apiFunction: ApiFunction<T, R>
) => {
  return async (...args: T) => {
    try {
      const result = await apiFunction(...args);

      return result;
    } catch (err) {
      console.error("API error: ", err);
      toast.error("Something went wrong. Please try later.");

      throw err;
    }
  };
};
