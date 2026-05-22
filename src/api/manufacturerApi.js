import API from "./clientApi";

export const getManufacturers = async () => {
  const response = await API.get("/manufacturers");
  return response.data;
};

export const createManufacturer = async (name) => {
  const response = await API.post("/manufacturers", { name });
  return response.data;
};

export const deleteManufacturer = async (id) => {
  const response = await API.delete(`/manufacturers/${id}`);
  return response.data;
};
