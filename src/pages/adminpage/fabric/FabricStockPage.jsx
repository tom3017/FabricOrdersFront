import MainLayout from "../../../components/layout/MainLayout";

import "../../../styles/fabric-stock.css";

function FabricStockPage() {

  // 임시 데이터
  const fabricList = [

    {
      id: 11084,
      maker: "에쏘르",
      book: "EAS-1201",
      code: "1723183740",
      fabricNo: "EAS-1287",
      stock: "99,926.1",
      status: "사용"
    },

    {
      id: 11083,
      maker: "마로조또",
      book: "MZ",
      code: "1768355326",
      fabricNo: "MZ07/1710",
      stock: "0",
      status: "품절"
    }

  ];

  return (

    <MainLayout>

      <div className="fabric-stock-page">

        {/* 상단 */}
        <div className="fabric-stock-header">

          <h1>

            원단 재고 관리

          </h1>

        </div>

        {/* 검색 필터 */}
        <div className="fabric-filter-box">

          <select>
            <option>품목</option>
          </select>

          <select>
            <option>원단제조사</option>
          </select>

          <select>
            <option>원단북</option>
          </select>

          <select>
            <option>원단북코드</option>
          </select>

          <select>
            <option>재고</option>
          </select>

          <input
            type="text"
            placeholder="원단번호 검색"
          />

          <button>

            검색

          </button>

        </div>

        {/* 테이블 */}
        <div className="fabric-table-wrapper">

          <table className="fabric-table">

            <thead>

              <tr>

                <th>번호</th>
                <th>원단제조사</th>
                <th>원단북명</th>
                <th>원단북 코드</th>
                <th>원단번호</th>
                <th>원단이미지</th>
                <th>사용유무</th>
                <th>재고(야드)</th>
                <th>관리</th>

              </tr>

            </thead>

            <tbody>

              {
                fabricList.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>{item.maker}</td>

                    <td>{item.book}</td>

                    <td>{item.code}</td>

                    <td>{item.fabricNo}</td>

                    {/* 이미지 */}
                    <td>

                      <div className="fabric-image" />

                    </td>

                    {/* 상태 */}
                    <td>

                      <button
                        className={
                          item.status === "사용"
                            ? "status-button active"
                            : "status-button soldout"
                        }
                      >

                        {item.status}

                      </button>

                    </td>

                    <td>{item.stock}</td>

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
        <div className="fabric-bottom">

          {/* 페이지네이션 */}
          <div className="pagination">

            <button>1</button>
            <button>2</button>
            <button>3</button>

          </div>

          {/* 버튼 */}
          <div className="bottom-buttons">

            <button className="blue-button">

              원단 등록

            </button>

            <button className="dark-button">

              원단 엑셀

            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default FabricStockPage;