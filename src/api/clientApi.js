import axios from "axios";
import { SERVER_URL } from "../config/serverConfig";

export const getClients = async () => {
  const response = await axios.get(`${SERVER_URL}/clients`);
  return response.data;
};

export const createClient = async (name) => {
  const response = await axios.post(`${SERVER_URL}/clients`, { name });
  return response.data;
};

export const deleteClient = async (id) => {
  const response = await axios.delete(`${SERVER_URL}/clients/${id}`);
  return response.data;
};
