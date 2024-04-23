import { GeneralType } from "../types/GeneralType";

export default async function fetchRetry<T>(
  apiCall: () => Promise<GeneralType<T>>,
  condition: (response: GeneralType<T>) => boolean,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<GeneralType<T>> {
  let retries = 0;

  while (retries < maxRetries) {
    const response: GeneralType<T> = await apiCall();
    console.log(response);
    console.log("Fetch status times: ", retries);
    if (!condition(response)) return response;

    retries++;
    if (retries < maxRetries)
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
  }

  throw new Error("Max retries exceeded");
}
