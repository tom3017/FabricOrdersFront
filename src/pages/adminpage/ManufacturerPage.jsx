import { useEffect, useState } from "react";

import MainLayout
from "../../components/layout/MainLayout";

import {

  getManufacturers,
  createManufacturer,
  deleteManufacturer

} from "../../api/manufacturerApi";

import "../../styles/manufacturer.css";

function ManufacturerPage() {

  // 제조사 목록
  const [manufacturers, setManufacturers]
    = useState([]);

  // 검색어
  const [search, setSearch]
    = useState("");

  // 제조사 입력값
  const [name, setName]
    = useState("");

  // 제조사 목록 조회
  const fetchManufacturers = async () => {

    try {

      const data
        = await getManufacturers();

      setManufacturers(data);

    } catch (error) {

      console.log(error);

      alert("제조사 조회 실패");
    }
  };

  // 최초 실행
  useEffect(() => {

    fetchManufacturers();

  }, []);

  // 제조사 등록
  const handleCreate = async () => {

    if (!name.trim()) {

      alert("제조사명을 입력해주세요.");

      return;
    }

    try {

      const result
        = await createManufacturer(name);

      if (result === "SUCCESS") {

        alert("등록 완료");

        setName("");

        fetchManufacturers();
      }

    } catch (error) {

      console.log(error);

      alert("등록 실패");
    }
  };

  // 제조사 삭제
  const handleDelete = async (id) => {

    const check = window.confirm(
      "삭제하시겠습니까?"
    );

    if (!check) {

      return;
    }

    try {

      const result
        = await deleteManufacturer(id);

      if (result === "SUCCESS") {

        alert("삭제 완료");

        fetchManufacturers();
      }

    } catch (error) {

      console.log(error);

      alert("삭제 실패");
    }
  };

  // 검색 필터
  const filteredList = manufacturers.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (

    <MainLayout>

      <div className="manufacturer-page">

        <div className="manufacturer-card">

          {/* 상단 */}
          <div className="manufacturer-header">

            <div className="manufacturer-title">

              거래처 관리

            </div>

            {/* 검색 */}
            <div className="manufacturer-search">

              <input

                type="text"

                placeholder="제조사 검색"

                value={search}

                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <button className="blue-button">

                검색

              </button>

            </div>

          </div>

          {/* 등록 */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px"
            }}
          >

            <input

              type="text"

              placeholder="거래처명 입력"

              value={name}

              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <button
              className="blue-button"
              onClick={handleCreate}
            >

              등록

            </button>

          </div>

          {/* 테이블 */}
          <table className="manufacturer-table">

            <thead>

              <tr>

                <th>번호</th>

                <th>거래처명</th>

                <th>관리</th>

              </tr>

            </thead>

            <tbody>

              {
                filteredList.map((item) => (

                  <tr key={item.id}>

                    <td>

                      {item.id}

                    </td>

                    <td>

                      {item.name}

                    </td>

                    <td>

                      <button

                        className="red-button"

                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >

                        삭제

                      </button>

                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

          {/* 페이지네이션 */}
          <div className="pagination">

            <button className="page-button">

              1

            </button>

            <button className="page-button">

              2

            </button>

            <button className="page-button">

              3

            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default ManufacturerPage;