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

export const getClients = async () => {
  const response = await API.get("/clients");
  return response.data;
};

export const createClient = async (name) => {
  const response = await API.post("/clients", { name });
  return response.data;
};

export const deleteClient = async (id) => {
  const response = await API.delete(`/clients/${id}`);
  return response.data;
};
