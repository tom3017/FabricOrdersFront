// 페이지 이동용 hook
import { useNavigate } from "react-router-dom";

// React의 생명주기 느낌
import { useEffect } from "react";

function SplashPage() {

  // 페이지 이동 함수
  const navigate = useNavigate();

  // 화면이 처음 실행될 때 실행
  useEffect(() => {

    // 2초 뒤 로그인 화면 이동
    setTimeout(() => {
      navigate("/login");
    }, 2000);

  }, []);

  return (

    <div style={styles.container}>

      {/* 로고 */}
      <img
        src="https://placehold.co/120x120"
        alt="logo"
      />

      {/* 회사명 */}
      <h2>WOOL ORDER</h2>

      <p>Loading...</p>

    </div>
  );
}

const styles = {

  container: {
    width: "100%",
    height: "100vh",

    display: "flex",
    flexDirection: "column",

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#f5f5f5"
  }
};

export default SplashPage;