import { useState } from "react";

import "../../styles/layout.css";

function Topbar() {

  // =========================
  // 사용자명
  // =========================
  const name =
    localStorage.getItem("name");

  // =========================
  // 메뉴 상태
  // =========================
  const [open, setOpen]
    = useState(false);

  // =========================
  // 로그아웃
  // =========================
  const handleLogout = () => {

    // 저장 삭제
    localStorage.clear();

    // 로그인 이동
    window.location.href = "/login";
  };

  return (

    <div className="topbar">

      {/* 좌측 */}
      <div className="topbar-title">

        Fabric Orders

      </div>

      {/* 우측 */}
      <div className="topbar-user-area">

        {/* 유저 버튼 */}
        <button

          className="topbar-user"

          onClick={() =>
            setOpen(!open)
          }
        >

          {name || "직원"}직원님 ▼

        </button>

        {/* 드롭다운 */}
        {
          open && (

            <div className="topbar-dropdown">

              <button
                onClick={handleLogout}
              >

                로그아웃

              </button>

            </div>
          )
        }

      </div>

    </div>
  );
}

export default Topbar;