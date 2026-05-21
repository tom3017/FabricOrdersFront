import "../styles/home.css";

import { useNavigate }
from "react-router-dom";

function HomePage() {

  // =========================
  // 페이지 이동 함수
  // =========================
  const navigate = useNavigate();

  return (

    <div className="home-container">

      {/* 상단 헤더 */}
      <div className="top-bar">

        <div>

          <h1 className="page-title">

            Fabric Order Dashboard

          </h1>

          <p className="page-subtitle">

            주문 및 발주 현황

          </p>

        </div>

      </div>

      {/* 메뉴 카드 */}
      <div className="menu-grid">

        {/* 현황 */}
        <div className="menu-card blue-card">

          <div className="menu-icon">

            📊

          </div>

          <h2>

            현황

          </h2>

          <p>

            주문 및 발주 현황

          </p>

        </div>

        {/* 관리 */}
        <div

          className="menu-card green-card"

          // 클릭 시 제조사 관리 페이지 이동
          onClick={() =>
            navigate("/settings")
          }
        >

          <div className="menu-icon">

            📦

          </div>

          <h2>

            관리

          </h2>

          <p>

            설정 및 거래처 관리

          </p>

        </div>

      </div>

    </div>
  );
}

export default HomePage;