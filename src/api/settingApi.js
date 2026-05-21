import API from "./clientApi";

// =========================
// 내 정보 조회
// =========================
export const getMyInfo = async () => {

  const token = localStorage.getItem("token");

  const response = await API.get("/settings/me");

  return response.data;
};

// =========================
// 내 정보 수정
// =========================
export const updateMyInfo = async (

  data

) => {

  const token = localStorage.getItem("token");

  const response = await API.put("/settings/me", data);

  return response.data;
};

// =========================
// 비밀번호 변경
// =========================
export const changePassword = async (

  newPassword

) => {

  const token = localStorage.getItem("token");

  const response = await API.put(
    "/settings/password",
    {
      newPassword
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

  const response = await API.post(
    "/upload/profile",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return response.data;
};