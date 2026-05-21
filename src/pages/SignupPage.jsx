import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "../styles/login.css";

import {
  signup,
  sendEmailCode,
  verifyEmailCode,
  checkDuplicateId
} from "../api/authApi";

function SignupPage() {

  // =========================
  // 이름
  // =========================
  const [name, setName] = useState("");

  // =========================
  // 아이디
  // =========================
  const [id, setId] = useState("");

  // =========================
  // 아이디 중복확인 여부
  // =========================
  const [idChecked, setIdChecked]
    = useState(false);

  // =========================
  // 비밀번호
  // =========================
  const [password, setPassword]
    = useState("");

  // =========================
  // 비밀번호 확인
  // =========================
  const [passwordCheck, setPasswordCheck]
    = useState("");

  // =========================
  // 전화번호
  // =========================
  const [phone, setPhone]
    = useState("");

  // =========================
  // 이메일 아이디
  // =========================
  const [emailId, setEmailId]
    = useState("");

  // =========================
  // 이메일 도메인
  // =========================
  const [emailDomain, setEmailDomain]
    = useState("naver.com");

  // =========================
  // 실제 이메일
  // =========================
  const email
    = `${emailId}@${emailDomain}`;

  // =========================
  // 이메일 인증번호
  // =========================
  const [emailCode, setEmailCode]
    = useState("");

  // =========================
  // 이메일 인증 여부
  // =========================
  const [emailVerified, setEmailVerified]
    = useState(false);

  // =========================
  // 인증번호 발송 여부
  // =========================
  const [codeSent, setCodeSent]
    = useState(false);

  // =========================
  // 페이지 이동
  // =========================
  const navigate = useNavigate();

  // =========================
  // 아이디 영어 + 숫자만 허용
  // =========================
  const handleIdChange = (e) => {

    const value = e.target.value
      .replace(/[^a-zA-Z0-9]/g, "");

    if (e.target.value !== value) {

      alert("영어와 숫자만 사용해주세요.");
    }

    setId(value);

    // 아이디 변경 시
    // 중복확인 초기화
    setIdChecked(false);
  };

  // =========================
  // 비밀번호 유효성 검사
  // 영문 + 숫자 + 특수문자 포함
  // =========================
  const isValidPassword = () => {

    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

    return regex.test(password);
  };

  // =========================
  // 전화번호 자동 하이픈
  // + 11자리 제한
  // =========================
  const handlePhoneChange = (e) => {

    // 숫자만 추출
    let value = e.target.value
      .replace(/[^0-9]/g, "");

    // 11자리 제한
    value = value.slice(0, 11);

    // 010
    if (value.length < 4) {

      setPhone(value);
    }

    // 010-1234
    else if (value.length < 8) {

      setPhone(
        value.replace(
          /(\d{3})(\d+)/,
          "$1-$2"
        )
      );
    }

    // 010-1234-5678
    else {

      setPhone(
        value.replace(
          /(\d{3})(\d{4})(\d+)/,
          "$1-$2-$3"
        )
      );
    }
  };

  // =========================
  // 아이디 중복확인
  // =========================
  const handleCheckDuplicateId = async () => {

    if (!id.trim()) {

      alert("아이디를 입력해주세요.");

      return;
    }

    try {

      const result
        = await checkDuplicateId(id);

      // 중복
      if (result === "DUPLICATE") {

        setIdChecked(false);

        alert("이미 사용중인 아이디입니다.");

        return;
      }

      // 사용 가능
      if (result === "AVAILABLE") {

        setIdChecked(true);

        alert("사용 가능한 아이디입니다.");
      }

    } catch (error) {

      console.log(error);

      alert("아이디 중복확인 실패");
    }
  };

  // =========================
  // 이메일 인증번호 발송
  // =========================
  // =========================
  // 이메일 인증번호 발송
  // =========================
  const handleSendCode = async () => {

    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    if (!id.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (!idChecked) {
      alert("아이디 중복확인을 해주세요.");
      return;
    }

    if (!password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (!passwordCheck.trim()) {
      alert("비밀번호 확인을 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isValidPassword()) {
      alert("비밀번호는 영문 + 숫자 + 특수문자를 포함해야 합니다.");
      return;
    }

    if (!phone.trim()) {
      alert("전화번호를 입력해주세요.");
      return;
    }

    if (!emailId.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {

      const result = await sendEmailCode(email);

      console.log(result);

      if (result === "SEND_SUCCESS") {

        setCodeSent(true);
        setEmailVerified(false);

        alert("인증번호가 발송되었습니다.");

      } else {

        alert("인증번호 발송 실패");
      }

    } catch (error) {

      console.log(error);

      const message = error.response?.data?.message
        || error.response?.data;

      if (message === "DUPLICATE_EMAIL") {
        alert("이미 가입된 이메일입니다.");
        return;
      }

      if (message === "INVALID_EMAIL") {
        alert("올바른 이메일 형식이 아닙니다.");
        return;
      }

      if (message === "EMAIL_SEND_FAIL") {
        alert("이메일 발송에 실패했습니다. 이메일 주소를 확인해주세요.");
        return;
      }

      alert("이메일 발송 실패");
    }
  };
  // =========================
  // 이메일 인증번호 확인
  // =========================
  const handleVerifyCode = async () => {

    // 인증번호 미입력
    if (!emailCode.trim()) {

      alert("인증번호를 입력해주세요.");

      return;
    }

    try {

      const result
        = await verifyEmailCode(
          email,
          emailCode
        );

      console.log(result);

      // 인증 성공
      if (result === "VERIFY_SUCCESS") {

        setEmailVerified(true);

        alert("이메일 인증 완료");

      } else {

        setEmailVerified(false);

        alert("인증번호가 틀렸습니다.");
      }

    } catch (error) {

      console.log(error);

      alert("이메일 인증 실패");
    }
  };

  // =========================
  // 회원가입
  // =========================
  const handleSignup = async () => {

    // 이름 미입력
    if (!name.trim()) {

      alert("이름을 입력해주세요.");

      return;
    }

    // 아이디 미입력
    if (!id.trim()) {

      alert("아이디를 입력해주세요.");

      return;
    }

    // 중복확인 안함
    if (!idChecked) {

      alert("아이디 중복확인을 해주세요.");

      return;
    }

    // 비밀번호 미입력
    if (!password.trim()) {

      alert("비밀번호를 입력해주세요.");

      return;
    }

    // 비밀번호 확인 미입력
    if (!passwordCheck.trim()) {

      alert("비밀번호 확인을 입력해주세요.");

      return;
    }

    // 비밀번호 불일치
    if (password !== passwordCheck) {

      alert("비밀번호가 일치하지 않습니다.");

      return;
    }

    // 비밀번호 규칙 불일치
    if (!isValidPassword()) {

      alert(
        "비밀번호는 영문 + 숫자 + 특수문자를 포함해야 합니다."
      );

      return;
    }

    // 전화번호 미입력
    if (!phone.trim()) {

      alert("전화번호를 입력해주세요.");

      return;
    }

    // 이메일 미입력
    if (!emailId.trim()) {

      alert("이메일을 입력해주세요.");

      return;
    }

    // 이메일 인증 안됨
    if (!emailVerified) {

      alert("이메일 인증을 완료해주세요.");

      return;
    }

    try {

      const result = await signup({

        loginId: id,

        password,

        name,

        email,

        phone
      });

      console.log(result);

      // 아이디 중복
      if (result === "DUPLICATE_ID") {

        alert("이미 사용중인 아이디입니다.");

        return;
      }

      // 이메일 중복
      if (result === "DUPLICATE_EMAIL") {

        alert("이미 가입된 이메일입니다.");

        return;
      }

      // 이메일 인증 안됨
      if (result === "EMAIL_NOT_VERIFIED") {

        alert("이메일 인증을 완료해주세요.");

        return;
      }

      // 회원가입 성공
      if (result === "SUCCESS") {

        alert("회원가입 완료");

        navigate("/login");
      }

    } catch (error) {

      console.log(error);

      alert("회원가입 실패");
    }
  };

  return (

    <div className="login-container">

      <div className="login-card">

        {/* 제목 */}
        <h1 className="login-title">

          회원가입

        </h1>

        {/* 이름 */}
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="login-input"
        />

        {/* 아이디 */}
        <div className="inline-row">

          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={handleIdChange}
            className="login-input"
          />

          <button
            className="small-button"
            onClick={handleCheckDuplicateId}
          >

            중복확인

          </button>

        </div>

        {/* 비밀번호 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="login-input"
        />

        {/* 비밀번호 확인 */}
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) =>
            setPasswordCheck(e.target.value)
          }
          className="login-input"
        />

        {/* 비밀번호 불일치 */}
        {
          password !== passwordCheck
          &&
          passwordCheck.length > 0 && (

            <p className="error-text">

              비밀번호가 일치하지 않습니다.

            </p>
          )
        }

        {/* 비밀번호 규칙 */}
        {
          !isValidPassword()
          &&
          password.length > 0 && (

            <p className="error-text">

              영문 + 숫자 + 특수문자를 포함해야 합니다.

            </p>
          )
        }

        {/* 전화번호 */}
        <input
          type="text"
          placeholder="전화번호"
          value={phone}
          onChange={handlePhoneChange}
          className="login-input"
        />

        {/* 이메일 */}
        <div className="inline-row">

          {/* 이메일 아이디 */}
          <input
            type="text"
            placeholder="이메일"
            value={emailId}
            onChange={(e) => {

              setEmailId(e.target.value);

              setEmailVerified(false);
            }}
            className="login-input"
          />

          {/* 이메일 도메인 */}
          <select
            value={emailDomain}
            onChange={(e) => {

              setEmailDomain(e.target.value);

              setEmailVerified(false);
            }}
            className="email-select"
          >

            <option value="naver.com">

              naver.com

            </option>

            <option value="gmail.com">

              gmail.com

            </option>

          </select>

          {/* 인증번호 버튼 */}
          <button

            className="small-button"

            onClick={handleSendCode}
          >

            {
              codeSent
                ? "인증번호 재전송"
                : "인증번호 전송"
            }

          </button>

        </div>

        {/* 인증번호 입력 */}
        {
          codeSent && (

            <div className="inline-row">

              <input
                type="text"
                placeholder="인증번호 입력"
                value={emailCode}
                onChange={(e) =>
                  setEmailCode(e.target.value)
                }
                className="login-input"
              />

              <button
                className="small-button"
                onClick={handleVerifyCode}
              >

                확인

              </button>

            </div>
          )
        }

        {/* 이메일 인증 완료 */}
        {
          emailVerified && (

            <p className="success-text">

              이메일 인증 완료

            </p>
          )
        }

        {/* 회원가입 버튼 */}
        <button
          className="login-button"
          onClick={handleSignup}
        >

          회원가입

        </button>

      </div>

    </div>
  );
}

export default SignupPage;