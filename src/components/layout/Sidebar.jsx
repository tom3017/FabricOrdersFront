import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  // 회사 로고
  const logoImage =
    localStorage.getItem(
      "companyLogo"
    );

  return (

    <div className="sidebar">

      {/* 로고 */}
      <div className="sidebar-logo">

        {

          logoImage ? (

            <img

              src={logoImage}

              alt="logo"

              className="sidebar-logo-image"
            />

          ) : (

            "FOS"
          )
        }

      </div>

      {/* 메뉴 */}
      <div className="sidebar-menu">

        <button
          onClick={() => navigate("/settings")}
        >
          내설정
        </button>

        <button
          onClick={() => navigate("/basic")}
        >
          기본 관리
        </button>

        <button
          onClick={() => navigate("/fabric-stock")}
        >
          원단재고관리
        </button>

        <button
          onClick={() => navigate("/fabric-book")}
        >
          원단북 관리
        </button>

        <button
          onClick={() => navigate("/fabric-price")}
        >
          원단가격관리
        </button>

        <button
          onClick={() => navigate("/fabrics")}
        >
          원단 관리
        </button>

        <button
          onClick={() => navigate("/clients")}
        >
          거래처 관리
        </button>

        <button
          onClick={() => navigate("/config")}
        >
          환경설정
        </button>

      </div>

    </div>
  );
}

export default Sidebar;