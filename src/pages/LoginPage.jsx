import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "../styles/login.css";

import LoginInput from "../components/login/LoginInput";

import CustomButton from "../components/common/CustomButton";

// 로그인 API

import { login } from "../api/authApi";

function LoginPage() {

  // =========================

  // 아이디

  // =========================

  const [id, setId]

    = useState("");

  // =========================

  // 비밀번호

  // =========================

  const [password, setPassword]

    = useState("");

  // =========================

  // 페이지 이동

  // =========================

  const navigate = useNavigate();

  // =========================

  // Enter 로그인

  // =========================

  const handleKeyDown = (e) => {

    // Enter 입력

    if (e.key === "Enter") {

      handleLogin();

    }

  };

  // =========================

  // 로그인

  // =========================

  const handleLogin = async () => {

    try {

      // 로그인 요청

      const result = await login(

        id,

        password

      );

      console.log(result);

      // =========================

      // 로그인 성공

      // =========================

      if (

        result.result === "SUCCESS"

      ) {

        // JWT 저장

        localStorage.setItem(

          "token",

          result.token

        );

        // 이름 저장

        localStorage.setItem(

          "name",

          result.name

        );

        alert(

          `${result.name}님 로그인에 성공하셨습니다.`

        );

        // 홈 이동

        navigate("/home");

      } else {

        // 로그인 실패

        alert(

          "아이디 또는 비밀번호가 틀렸습니다."

        );

      }

    } catch (error) {

      console.log(error);

      alert("서버 오류 발생");

    }

  };

  return (

    <div className="login-container">

      <div className="login-card">

        {/* 로고 */}

        <div className="logo-circle">

          WOOL

        </div>

        {/* 제목 */}

        <h1 className="login-title">

          Fabric Order

        </h1>

        {/* 설명 */}

        <p className="login-subtitle">

          원단 발주 관리 시스템

        </p>

        {/* 아이디 */}

        <LoginInput

          type="text"

          placeholder="아이디"

          value={id}

          onChange={(e) =>

            setId(e.target.value)

          }

        />

        {/* 비밀번호 */}

        <LoginInput

          type="password"

          placeholder="비밀번호"

          value={password}

          onChange={(e) =>

            setPassword(e.target.value)

          }

          onKeyDown={handleKeyDown}

        />

        {/* 로그인 버튼 */}

        <CustomButton

          title="로그인"

          onClick={handleLogin}

        />

        {/* 회원가입 */}

        <button

          className="signup-button"

          onClick={() =>

            navigate("/signup")

          }

        >

          회원가입

        </button>

        {/* 비밀번호 찾기 */}

        <button

          className="find-password-button"

          onClick={() =>

            navigate("/find-password")

          }

        >

          비밀번호 찾기

        </button>

      </div>

    </div>

  );

}

export default LoginPage;