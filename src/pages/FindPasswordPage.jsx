import { useState } from "react";

import "../styles/login.css";

import {

  sendResetCode,

  verifyResetCode,

  resetPassword

} from "../api/findPasswordApi";

function FindPasswordPage() {

  // 아이디
  const [loginId, setLoginId]
    = useState("");

  // 이메일
  const [email, setEmail]
    = useState("");

  // 인증번호
  const [code, setCode]
    = useState("");

  // 인증 여부
  const [verified, setVerified]
    = useState(false);

  // 새 비밀번호
  const [newPassword, setNewPassword]
    = useState("");

  // 비밀번호 확인
  const [passwordConfirm, setPasswordConfirm]
    = useState("");

  // =========================
  // 인증번호 발송
  // =========================
  const handleSendCode = async () => {

    try {

      const result = await sendResetCode(

        loginId,

        email
      );

      if(result === "SEND_SUCCESS"){

        alert("인증번호 발송 완료");

      } else {

        alert(result);
      }

    } catch(error){

      console.log(error);

      alert("인증번호 발송 실패");
    }
  };

  // =========================
  // 인증번호 확인
  // =========================
  const handleVerifyCode = async () => {

    try {

      const result = await verifyResetCode(

        email,

        code
      );

      if(result === "VERIFY_SUCCESS"){

        setVerified(true);

        alert("이메일 인증 완료");

      } else {

        alert("인증번호 불일치");
      }

    } catch(error){

      console.log(error);

      alert("인증 실패");
    }
  };

  // =========================
  // 비밀번호 변경
  // =========================
  const handleResetPassword = async () => {

    // 비밀번호 일치 확인
    if(

      newPassword !== passwordConfirm

    ){

      alert(
        "비밀번호가 일치하지 않습니다."
      );

      return;
    }

    try {

      const result = await resetPassword(

        loginId,

        email,

        newPassword
      );

      if(result === "SUCCESS"){

        alert(
          "비밀번호 변경 완료"
        );

        window.location.href = "/login";

      } else {

        alert(result);
      }

    } catch(error){

      console.log(error);

      alert("비밀번호 변경 실패");
    }
  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h1 className="login-title">

          비밀번호 찾기

        </h1>

        {/* 아이디 */}
        <input

          type="text"

          placeholder="아이디"

          value={loginId}

          onChange={(e) =>

            setLoginId(
              e.target.value
            )
          }
        />

        {/* 이메일 */}
        <input

          type="text"

          placeholder="이메일"

          value={email}

          onChange={(e) =>

            setEmail(
              e.target.value
            )
          }
        />

        {/* 인증번호 발송 */}
        <button

          className="signup-button"

          onClick={handleSendCode}
        >

          인증번호 발송

        </button>

        {/* 인증번호 */}
        <input

          type="text"

          placeholder="인증번호"

          value={code}

          onChange={(e) =>

            setCode(
              e.target.value
            )
          }
        />

        {/* 인증번호 확인 */}
        <button

          className="signup-button"

          onClick={handleVerifyCode}
        >

          인증확인

        </button>

        {

          verified && (

            <>
              {/* 새 비밀번호 */}
              <input

                type="password"

                placeholder="새 비밀번호"

                value={newPassword}

                onChange={(e) =>

                  setNewPassword(
                    e.target.value
                  )
                }
              />

              {/* 비밀번호 확인 */}
              <input

                type="password"

                placeholder="비밀번호 확인"

                value={passwordConfirm}

                onChange={(e) =>

                  setPasswordConfirm(
                    e.target.value
                  )
                }
              />

              {/* 변경 버튼 */}
              <button

                className="signup-button"

                onClick={
                  handleResetPassword
                }
              >

                비밀번호 변경

              </button>
            </>
          )
        }

      </div>

    </div>
  );
}

export default FindPasswordPage;