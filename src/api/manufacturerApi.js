import API from "./clientApi";

// 제조사 전체 조회
export const getManufacturers = async () => {

  const response = await API.get("/manufacturers");

  return response.data;
};

// 제조사 등록
export const createManufacturer = async (name) => {

  const response = await API.post(
    "/manufacturers",
    {
      name
    }
  );

  return response.data;
};

// 제조사 삭제
export const deleteManufacturer = async (id) => {

  const response = await API.delete(
    `/manufacturers/${id}`
  );

  return response.data;
};