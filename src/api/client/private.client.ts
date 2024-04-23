import axios, { AxiosRequestConfig } from "axios";
import queryString from "query-string";

const baseURL = "http://127.0.0.1:8080/api";

const privateClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "true",
  },
});

privateClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from wherever you stored it
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }
);

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClient;

export {};
