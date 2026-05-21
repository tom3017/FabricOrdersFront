import MainLayout from "../../../components/layout/MainLayout";

import "../../../styles/fabric.css";

function FabricPage() {

  return (

    <MainLayout>

      <div className="fabric-page">

        {/* 제목 */}
        <h1 className="fabric-title">

          원단 관리

        </h1>

        {/* 카드 */}
        <div className="fabric-card">

          {/* 검색 */}
          <div className="fabric-search-row">

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

            <button className="fabric-button">

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
                  <th>원단번호</th>
                  <th>원단이미지</th>
                  <th>사용유무</th>
                  <th>재고</th>
                  <th>관리</th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td>11084</td>
                  <td>에쏘르</td>
                  <td>EAS-1201</td>
                  <td>EAS-1287</td>

                  <td>

                    <div className="fabric-image"></div>

                  </td>

                  <td>사용</td>

                  <td>99,926.1</td>

                  <td>

                    <button className="fabric-button">

                      관리

                    </button>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          {/* 하단 */}
          <div className="fabric-bottom">

            <div>

              페이지네이션

            </div>

            <div>

              <button
                className="fabric-button fabric-add-button"
              >

                원단 등록

              </button>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default FabricPage;