import MainLayout from "../../../components/layout/MainLayout";

import "../../../styles/fabric-price.css";

function FabricPricePage() {

  // 임시 데이터
  const priceList = [

    {
      id: 1,
      maker: "에쏘르",
      book: "EAS-1201",
      fabricNo: "EAS-1287",
      purchasePrice: "12,000",
      sellPrice: "18,000",
      discount: "10%",
      status: "사용"
    },

    {
      id: 2,
      maker: "마로조또",
      book: "MZ",
      fabricNo: "MZ07/1710",
      purchasePrice: "15,000",
      sellPrice: "22,000",
      discount: "5%",
      status: "사용"
    }

  ];

  return (

    <MainLayout>

      <div className="fabric-price-page">

        {/* 제목 */}
        <div className="price-header">

          <h1>

            원단 가격 관리

          </h1>

        </div>

        {/* 검색 */}
        <div className="price-filter-box">

          <select>
            <option>품목</option>
          </select>

          <select>
            <option>원단제조사</option>
          </select>

          <select>
            <option>원단북</option>
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
        <div className="price-table-wrapper">

          <table className="price-table">

            <thead>

              <tr>

                <th>번호</th>
                <th>원단제조사</th>
                <th>원단북명</th>
                <th>원단번호</th>
                <th>매입가</th>
                <th>판매가</th>
                <th>할인율</th>
                <th>사용유무</th>
                <th>관리</th>

              </tr>

            </thead>

            <tbody>

              {
                priceList.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>{item.maker}</td>

                    <td>{item.book}</td>

                    <td>{item.fabricNo}</td>

                    <td>

                      ₩ {item.purchasePrice}

                    </td>

                    <td>

                      ₩ {item.sellPrice}

                    </td>

                    <td>

                      {item.discount}

                    </td>

                    <td>

                      <button className="status-button">

                        {item.status}

                      </button>

                    </td>

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
        <div className="price-bottom">

          {/* 페이지네이션 */}
          <div className="pagination">

            <button>1</button>
            <button>2</button>
            <button>3</button>

          </div>

          {/* 버튼 */}
          <div className="bottom-buttons">

            <button className="blue-button">

              가격 등록

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

export default FabricPricePage;