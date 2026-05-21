import axios from "axios";

// 백엔드 주소
import { SERVER_URL } from "../config/serverConfig";

// 제조사 전체 조회
export const getManufacturers = async () => {

  const response = await axios.get(
    `${SERVER_URL}/manufacturers`
  );

  return response.data;
};

// 제조사 등록
export const createManufacturer = async (name) => {

  const response = await axios.post(

    `${SERVER_URL}/manufacturers`,

    {
      name
    }
  );

  return response.data;
};

// 제조사 삭제
export const deleteManufacturer = async (id) => {

  const response = await axios.delete(

    `${SERVER_URL}/manufacturers/${id}`
  );

  return response.data;
};