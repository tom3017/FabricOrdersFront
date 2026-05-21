import { useEffect, useState } from "react";

import MainLayout from "../../components/layout/MainLayout";

import "../../styles/config.css";

function ConfigPage() {

  // =========================
  // 테마
  // =========================
  const [theme, setTheme]
    = useState("light");

  // =========================
  // 자동저장
  // =========================
  const [autoSave, setAutoSave]
    = useState(true);

  // =========================
  // 알림
  // =========================
  const [notification, setNotification]
    = useState(true);

  // =========================
  // 시작 페이지
  // =========================
  const [startPage, setStartPage]
    = useState("/settings");

  // =========================
  // 최초 실행
  // =========================
  useEffect(() => {

    // 저장된 테마
    const savedTheme =
      localStorage.getItem("theme");

    // 자동저장
    const savedAutoSave =
      localStorage.getItem("autoSave");

    // 알림
    const savedNotification =
      localStorage.getItem("notification");

    // 시작페이지
    const savedStartPage =
      localStorage.getItem("startPage");

    // 테마 적용
    if (savedTheme) {

      setTheme(savedTheme);

      document.body.setAttribute(
        "data-theme",
        savedTheme
      );
    }

    // 자동저장 적용
    if (savedAutoSave !== null) {

      setAutoSave(
        savedAutoSave === "true"
      );
    }

    // 알림 적용
    if (savedNotification !== null) {

      setNotification(
        savedNotification === "true"
      );
    }

    // 시작페이지 적용
    if (savedStartPage) {

      setStartPage(savedStartPage);
    }

  }, []);

  // =========================
  // 저장
  // =========================
  const handleSave = () => {

    // 테마 저장
    localStorage.setItem(
      "theme",
      theme
    );

    // 자동저장 저장
    localStorage.setItem(
      "autoSave",
      autoSave
    );

    // 알림 저장
    localStorage.setItem(
      "notification",
      notification
    );

    // 시작페이지 저장
    localStorage.setItem(
      "startPage",
      startPage
    );

    // body 테마 적용
    document.body.setAttribute(
      "data-theme",
      theme
    );

    alert("환경설정 저장 완료");
  };

  // =========================
  // 초기화
  // =========================
  const handleReset = () => {

    // localStorage 제거
    localStorage.removeItem("theme");

    localStorage.removeItem("autoSave");

    localStorage.removeItem("notification");

    localStorage.removeItem("startPage");

    // 기본값
    setTheme("light");

    setAutoSave(true);

    setNotification(true);

    setStartPage("/settings");

    // 테마 적용
    document.body.setAttribute(
      "data-theme",
      "light"
    );

    alert("초기화 완료");
  };

  return (

    <MainLayout>

      <div className="config-page">

        {/* 제목 */}
        <div className="config-header">

          <h1>

            환경설정

          </h1>

        </div>

        {/* 카드 */}
        <div className="config-card">

          {/* 테마 */}
          <div className="config-section">

            <h2>

              테마 설정

            </h2>

            <div className="theme-buttons">

              <button

                className={
                  theme === "light"
                    ? "theme-button active"
                    : "theme-button"
                }

                onClick={() =>
                  setTheme("light")
                }
              >

                ☀️ 화이트모드

              </button>

              <button

                className={
                  theme === "dark"
                    ? "theme-button active"
                    : "theme-button"
                }

                onClick={() =>
                  setTheme("dark")
                }
              >

                🌙 다크모드

              </button>

            </div>

          </div>

          {/* 자동저장 */}
          <div className="config-section">

            <div className="config-row">

              <span>

                자동 저장 사용

              </span>

              <button

                className={
                  autoSave
                    ? "toggle-button on"
                    : "toggle-button off"
                }

                onClick={() =>
                  setAutoSave(!autoSave)
                }
              >

                {
                  autoSave
                    ? "ON"
                    : "OFF"
                }

              </button>

            </div>

          </div>

          {/* 알림 */}
          <div className="config-section">

            <div className="config-row">

              <span>

                알림 사용

              </span>

              <button

                className={
                  notification
                    ? "toggle-button on"
                    : "toggle-button off"
                }

                onClick={() =>
                  setNotification(!notification)
                }
              >

                {
                  notification
                    ? "ON"
                    : "OFF"
                }

              </button>

            </div>

          </div>

          {/* 시작 페이지 */}
          <div className="config-section">

            <h2>

              시작 페이지 설정

            </h2>

            <select
              value={startPage}
              onChange={(e) =>
                setStartPage(e.target.value)
              }
            >

              <option value="/settings">

                내설정

              </option>

              <option value="/fabric-stock">

                원단재고관리

              </option>

              <option value="/fabric-book">

                원단북관리

              </option>

              <option value="/fabric-price">

                원단가격관리

              </option>

              <option value="/clients">

                거래처관리

              </option>

            </select>

          </div>

          {/* 저장 버튼 */}
          <button
            className="save-button"
            onClick={handleSave}
          >

            저장하기

          </button>

          {/* 초기화 버튼 */}
          <button
            className="reset-button"
            onClick={handleReset}
          >

            초기화

          </button>

        </div>

      </div>

    </MainLayout>
  );
}

export default ConfigPage;
