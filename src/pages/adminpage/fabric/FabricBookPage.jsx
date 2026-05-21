import MainLayout from "../../../components/layout/MainLayout";

import "../../../styles/fabric-book.css";

function FabricBookPage() {

  // 임시 데이터
  const fabricBooks = [

    {
      id: 379,
      maker: "텍솔로니",
      book: "VITALIANO(벨벳)",
      code: "1768982860",
      status: "사용"
    },

    {
      id: 378,
      maker: "브라운아론",
      book: "NAPLES",
      code: "1768458634",
      status: "사용"
    },

    {
      id: 377,
      maker: "마로조또",
      book: "MZ",
      code: "1768355326",
      status: "사용"
    }

  ];

  return (

    <MainLayout>

      <div className="fabric-book-page">

        {/* 제목 */}
        <div className="fabric-book-header">

          <h1>

            원단북 관리

          </h1>

        </div>

        {/* 검색 영역 */}
        <div className="fabric-book-filter">

          <select>
            <option>품목</option>
          </select>

          <select>
            <option>원단제조사</option>
          </select>

          <input
            type="text"
            placeholder="코드 검색"
          />

          <button>

            검색

          </button>

        </div>

        {/* 테이블 */}
        <div className="fabric-book-table-wrapper">

          <table className="fabric-book-table">

            <thead>

              <tr>

                <th>번호</th>
                <th>원단이미지</th>
                <th>원단제조사</th>
                <th>원단북명</th>
                <th>원단북 코드</th>
                <th>사용유무</th>
                <th>관리</th>

              </tr>

            </thead>

            <tbody>

              {
                fabricBooks.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    {/* 이미지 */}
                    <td>

                      <div className="book-image" />

                    </td>

                    <td>{item.maker}</td>

                    <td>{item.book}</td>

                    <td>{item.code}</td>

                    {/* 사용유무 */}
                    <td>

                      <button className="book-status-button">

                        {item.status}

                      </button>

                    </td>

                    {/* 관리 */}
                    <td>

                      <button className="book-manage-button">

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
        <div className="fabric-book-bottom">

          <div className="pagination">

            <button>1</button>
            <button>2</button>
            <button>3</button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default FabricBookPage;