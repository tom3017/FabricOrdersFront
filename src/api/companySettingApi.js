import API from "./clientApi";

// =========================
// 회사 설정 조회
// =========================
export const getCompanySetting = async () => {

  const response = await API.get(

    "/company-setting"
  );

  return response.data;
};

// =========================
// 회사 설정 등록
// =========================
export const saveCompanySetting = async (

  data

) => {

  const response = await API.post(

    "/company-setting",

    data
  );

  return response.data;
};

// =========================
// 회사 설정 수정
// =========================
export const updateCompanySetting = async (

  data

) => {

  const response = await API.put(

    "/company-setting",

    data
  );

  return response.data;
};