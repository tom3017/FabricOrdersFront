import axios from "axios";

import {SERVER_URL} from "../config/serverConfig";

// =========================
// axios 생성
// =========================
const API = axios.create({

  baseURL: SERVER_URL
});

// =========================
// JWT 자동 첨부
// =========================
API.interceptors.request.use((config) => {

  const token = localStorage.getItem(
    "token"
  );

  if(token){

    config.headers.Authorization =

      `Bearer ${token}`;
  }

  return config;
});

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