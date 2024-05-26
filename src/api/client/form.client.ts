import axios from "axios";

const baseURL = "http://127.0.0.1:8080/api/";

const formClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "true",
  },
});

formClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from wherever you stored it
    const token = localStorage.getItem("token");

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

export default formClient;
export {};
