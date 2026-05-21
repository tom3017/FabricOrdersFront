import axios from "axios";

import { SERVER_URL } from "../config/serverConfig";

// =========================
// 아이디 중복확인
// =========================
export const checkDuplicateId = async (loginId) => {

  const response = await axios.get(

    `${SERVER_URL}/auth/check-id`,

    {
      params: {
        loginId
      }
    }
  );

  return response.data;
};

// =========================
// 로그인
// =========================
export const login = async (id, password) => {

  const response = await axios.post(

    `${SERVER_URL}/auth/login`,

    {
      id,
      password
    }
  );

  return response.data;
};

// =========================
// 회원가입
// =========================
export const signup = async (data) => {

  const response = await axios.post(

    `${SERVER_URL}/auth/signup`,

    data
  );

  return response.data;
};

// =========================
// 이메일 인증번호 발송
// =========================
export const sendEmailCode = async (email) => {

  const response = await axios.post(

    `${SERVER_URL}/auth/email/send`,

    {
      email
    }
  );

  return response.data;
};

// =========================
// 이메일 인증번호 확인
// =========================
export const verifyEmailCode = async (email, code) => {

  const response = await axios.post(

    `${SERVER_URL}/auth/email/verify`,

    {
      email,
      code
    }
  );

  return response.data;
};