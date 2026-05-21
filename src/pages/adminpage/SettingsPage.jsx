import { useEffect, useState } from "react";

import MainLayout from "../../components/layout/MainLayout";

import "../../styles/settings.css";

import {getMyInfo, updateMyInfo, changePassword, uploadProfileImage} from "../../api/settingApi";

function SettingsPage() {

  // =========================
  // 이름
  // =========================
  const [name, setName]
    = useState("");

  // =========================
  // 전화번호
  // =========================
  const [phone, setPhone]
    = useState("");

  // =========================
  // 이메일
  // =========================
  const [email, setEmail]
    = useState("");

  // =========================
  // 새 비밀번호
  // =========================
  const [newPassword, setNewPassword]
    = useState("");

  // =========================
  // 비밀번호 확인
  // =========================
  const [passwordConfirm, setPasswordConfirm]
    = useState("");

  // =========================
  // 카카오 알림
  // =========================
  const [

    kakaoNotification,

    setKakaoNotification

  ] = useState(false);

  // =========================
  // 프로필 이미지
  // =========================
  const [

    profileImage,

    setProfileImage

  ] = useState("");

  // =========================
  // 내 정보 조회
  // =========================
  const fetchMyInfo = async () => {

    try {

      const data = await getMyInfo();

      setName(data.name);

      setPhone(data.phone);

      setEmail(data.email);

      setKakaoNotification(
        data.kakaoNotification
      );

      setProfileImage(
        data.profileImage
      );

    } catch (error) {

      console.log(error);

      alert("회원정보 조회 실패");
    }
  };

  // =========================
  // 최초 실행
  // =========================
  useEffect(() => {

    fetchMyInfo();

  }, []);

  // =========================
  // 회원정보 수정
  // =========================
  const handleUpdateInfo = async () => {

    try {

      const result = await updateMyInfo({

        name,
        phone,
        email,
        kakaoNotification

      });

      if (result === "SUCCESS") {

        alert("회원정보 수정 완료");
      }

    } catch (error) {

      console.log(error);

      alert("회원정보 수정 실패");
    }
  };

  // =========================
  // 비밀번호 변경
  // =========================
  const handlePasswordChange = async () => {

    // 비밀번호 확인
    if (

      newPassword !== passwordConfirm

    ) {

      alert(
        "비밀번호가 일치하지 않습니다."
      );

      return;
    }

    // 빈값
    if (!newPassword.trim()) {

      alert("비밀번호를 입력해주세요.");

      return;
    }

    try {

      const result = await changePassword(
        newPassword
      );

      if (result === "SUCCESS") {

        alert("비밀번호 변경 완료");

        setNewPassword("");

        setPasswordConfirm("");
      }

    } catch (error) {

      console.log(error);

      alert("비밀번호 변경 실패");
    }
  };

  // =========================
  // 프로필 이미지 업로드
  // =========================
  const handleProfileUpload = async (

    e

  ) => {

    const file = e.target.files[0];

    if (!file) {

      return;
    }

    try {

      const imageUrl =
        await uploadProfileImage(file);

      setProfileImage(imageUrl);

      alert("프로필 이미지 변경 완료");

    } catch (error) {

      console.log(error);

      alert("이미지 업로드 실패");
    }
  };

  // =========================
  // 캐시 삭제
  // =========================
  const handleClearCache = () => {

    localStorage.clear();

    alert("캐시 삭제 완료");

    window.location.href = "/login";
  };

  return (

    <MainLayout>

      <div className="settings-page">

        {/* 좌측 */}
        <div className="settings-left">

          {/* 프로필 */}
          <div className="settings-card">

            <h2>

              내 프로필 사진 변경

            </h2>

            <div className="profile-section">

              {/* 프로필 이미지 */}
              <div className="profile-image">

                {
                  profileImage ? (

                    <img

                      src={profileImage}

                      alt="profile"

                      className="profile-preview"
                    />

                  ) : (

                    "이미지"
                  )
                }

              </div>

              {/* 숨겨진 파일 선택 */}
              <input

                type="file"

                id="profile-upload"

                accept="image/*"

                style={{
                  display: "none"
                }}

                onChange={
                  handleProfileUpload
                }
              />

              {/* 버튼 */}
              <button

                className="blue-button"

                onClick={() =>

                  document
                    .getElementById(
                      "profile-upload"
                    )
                    .click()
                }
              >

                사진변경

              </button>

            </div>

          </div>

          {/* 내정보 */}
          <div className="settings-card">

            <h2>

              내정보변경

            </h2>

            <div className="settings-form">

              {/* 이름 */}
              <input

                type="text"

                placeholder="이름"

                value={name}

                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              {/* 전화번호 */}
              <input

                type="text"

                placeholder="전화번호"

                value={phone}

                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

              {/* 이메일 */}
              <input

                type="text"

                placeholder="이메일"

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              {/* 수정 */}
              <button

                className="blue-button"

                onClick={handleUpdateInfo}
              >

                수정하기

              </button>

            </div>

          </div>

        </div>

        {/* 우측 */}
        <div className="settings-right">

          {/* 비밀번호 */}
          <div className="settings-card">

            <h2>

              비밀번호 변경

            </h2>

            <div className="settings-form">

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

              {/* 수정 */}
              <button

                className="blue-button"

                onClick={handlePasswordChange}
              >

                수정하기

              </button>

            </div>

          </div>

          {/* 카카오톡 */}
          <div className="settings-card">

            <h2>

              온라인발주 카카오톡 알림

            </h2>

            <div className="toggle-row">

              <span>

                수신여부

              </span>

              <button

                className="toggle-button"

                onClick={() =>

                  setKakaoNotification(
                    !kakaoNotification
                  )
                }
              >

                {
                  kakaoNotification
                    ? "수신중"
                    : "수신안함"
                }

              </button>

            </div>

            <button

              className="blue-button"

              onClick={handleUpdateInfo}
            >

              저장하기

            </button>

          </div>

          {/* 캐시삭제 */}
          <div className="settings-card">

            <h2>

              캐시 삭제

            </h2>

            <button

              className="red-button"

              onClick={handleClearCache}
            >

              캐시 삭제

            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default SettingsPage;