import API from "./clientApi";

// =========================
// 인증번호 발송
// =========================
export const sendResetCode = async (

  loginId,

  email

) => {

  const response = await API.post(
    "/auth/find-password/send-code",
    {
      loginId,
      email
    }
  );

  return response.data;
};

// =========================
// 인증번호 확인
// =========================
export const verifyResetCode = async (

  email,

  code

) => {

  const response = await API.post(
    "/auth/find-password/verify",
    {
      email,
      code
    }
  );

  return response.data;
};

// =========================
// 비밀번호 재설정
// =========================
export const resetPassword = async (

  loginId,

  email,

  newPassword

) => {

  const response = await API.post(
    "/auth/find-password/reset",
    {
      loginId,
      email,
      newPassword
    }
  );

  return response.data;
};