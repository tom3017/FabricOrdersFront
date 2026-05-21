import axios from "axios";

import { SERVER_URL } from "../config/serverConfig";

// =========================
// 내 정보 조회
// =========================
export const getMyInfo = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(

    `${SERVER_URL}/settings/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

// =========================
// 내 정보 수정
// =========================
export const updateMyInfo = async (

  data

) => {

  const token = localStorage.getItem("token");

  const response = await axios.put(

    `${SERVER_URL}/settings/me`,

    data,

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

// =========================
// 비밀번호 변경
// =========================
export const changePassword = async (

  newPassword

) => {

  const token = localStorage.getItem("token");

  const response = await axios.put(

    `${SERVER_URL}/settings/password`,

    {
      newPassword
    },

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

// =========================
// 프로필 이미지 업로드
// =========================
export const uploadProfileImage = async (

  file

) => {

  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(

    `${SERVER_URL}/upload/profile`,

    formData,

    {
      headers: {

        Authorization: `Bearer ${token}`,

        "Content-Type":
          "multipart/form-data"
      }
    }
  );

  return response.data;
};