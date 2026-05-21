import MainLayout from "../../components/layout/MainLayout";

import "../../styles/client.css";

function ClientPage() {

  // 임시 데이터
  const clientList = [

    {
      id: 1,
      name: "젠틀코리아",
      manager: "김정민",
      phone: "010-1234-5678",
      businessNo: "123-45-67890",
      status: "거래중"
    },

    {
      id: 2,
      name: "노빌리티",
      manager: "박지원",
      phone: "010-8888-1111",
      businessNo: "777-12-99999",
      status: "중지"
    }

  ];

  return (

    <MainLayout>

      <div className="client-page">

        {/* 헤더 */}
        <div className="client-header">

          <h1>

            거래처 관리

          </h1>

        </div>

        {/* 검색 영역 */}
        <div className="client-filter-box">

          <select>

            <option>거래상태</option>

          </select>

          <input
            type="text"
            placeholder="거래처명 검색"
          />

          <input
            type="text"
            placeholder="담당자 검색"
          />

          <button>

            검색

          </button>

        </div>

        {/* 테이블 */}
        <div className="client-table-wrapper">

          <table className="client-table">

            <thead>

              <tr>

                <th>번호</th>
                <th>거래처명</th>
                <th>담당자</th>
                <th>연락처</th>
                <th>사업자번호</th>
                <th>상태</th>
                <th>관리</th>

              </tr>

            </thead>

            <tbody>

              {
                clientList.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>{item.name}</td>

                    <td>{item.manager}</td>

                    <td>{item.phone}</td>

                    <td>{item.businessNo}</td>

                    {/* 상태 */}
                    <td>

                      <button
                        className={
                          item.status === "거래중"
                            ? "status-button active"
                            : "status-button stop"
                        }
                      >

                        {item.status}

                      </button>

                    </td>

                    {/* 관리 */}
                    <td>

                      <button className="manage-button">

                        관리

                      </button>

                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

        {/* 하단 */}
        <div className="client-bottom">

          {/* 페이지네이션 */}
          <div className="pagination">

            <button>1</button>
            <button>2</button>
            <button>3</button>

          </div>

          {/* 버튼 */}
          <div className="bottom-buttons">

            <button className="blue-button">

              거래처 등록

            </button>

            <button className="dark-button">

              엑셀 다운로드

            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default ClientPage;