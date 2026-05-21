import Sidebar from "./Sidebar";

import Topbar from "./Topbar";

import "../../styles/layout.css";

function MainLayout({ children }) {

  return (

    <div className="layout-container">

      {/* 좌측 메뉴 */}
      <Sidebar />

      {/* 우측 */}
      <div className="layout-right">

        {/* 상단바 */}
        <Topbar />

        {/* 페이지 */}
        <main className="layout-content">

          {children}

        </main>

      </div>

    </div>
  );
}

export default MainLayout;