import axios from "axios";

const baseURL = "http://127.0.0.1:8080/api/";

const publicClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "true",
  },
});

export default publicClient;
export {};
