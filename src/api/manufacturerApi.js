import axios from "axios";
import { SERVER_URL } from "../config/serverConfig";

export const getManufacturers = async () => {
  const response = await axios.get(`${SERVER_URL}/manufacturers`);
  return response.data;
};

export const createManufacturer = async (name) => {
  const response = await axios.post(`${SERVER_URL}/manufacturers`, { name });
  return response.data;
};

export const deleteManufacturer = async (id) => {
  const response = await axios.delete(`${SERVER_URL}/manufacturers/${id}`);
  return response.data;
};
