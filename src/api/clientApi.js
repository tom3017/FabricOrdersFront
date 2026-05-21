import axios from "axios";
import { SERVER_URL } from "../config/serverConfig";

const API = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
