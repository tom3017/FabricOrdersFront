// 페이지 이동 기능 import
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 import
import SplashPage from "./pages/SplashPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import FabricPage from "./pages/adminpage/fabric/FabricPage";
import SettingsPage from "./pages/adminpage/SettingsPage";
import BasicPage from "./pages/adminpage/BasicPage";
import FabricStockPage from "./pages/adminpage/fabric/FabricStockPage";
import FabricBookPage from "./pages/adminpage/fabric/FabricBookPage";
import FabricPricePage from "./pages/adminpage/fabric/FabricPricePage";
import ConfigPage from "./pages/adminpage/ConfigPage";
import ClientPage from "./pages/adminpage/ClientPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import FabricCreatePage from "./pages/adminpage/fabric/FabricCreatePage";
import FabricEditPage from "./pages/adminpage/fabric/FabricEditPage";



function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* 첫 화면 */}
        <Route
          path="/"
          element={<SplashPage />}
        />

        {/* 로그인 */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* 회원가입 */}
        <Route
          path="/signup"
          element={<SignupPage />}
        />

        {/* 홈 */}
        <Route
          path="/home"
          element={<HomePage />}
        />

        {/* 원단 관리 */}
        <Route
          path="/fabrics"
          element={<FabricPage />}
        />

        {/* 내설정 관리 */}
        <Route

          path="/settings"

          element={<SettingsPage />}

        />
        <Route
          path="/basic"
          element={<BasicPage />}
        />

        <Route
          path="/fabric-stock"
          element={<FabricStockPage />}
        />

        <Route
          path="/fabric-book"
          element={<FabricBookPage />}
        />

        <Route
          path="/fabric-price"
          element={<FabricPricePage />}
        />

        <Route
          path="/config"
          element={<ConfigPage />}
        />

        <Route
          path="/clients"
          element={<ClientPage />}
        />

        <Route

          path="/find-password"

          element={<FindPasswordPage />}
        />

        <Route

          path="/fabric/create"

          element={<FabricCreatePage />}

        />


        <Route
          path="/fabric/edit/:id"
          element={<FabricEditPage />}
        />


      </Routes>


    </BrowserRouter>
  );
}

export default App;