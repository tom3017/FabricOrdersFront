import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout
from "../../components/layout/MainLayout";

import "../../styles/client.css";

// =========================
// API import
// =========================
import {

  getClients,
  deleteClient

} from "../../api/clientApi";

function ClientPage() {

  const navigate = useNavigate();

  // =========================
  // 검색어
  // =========================
  const [searchName, setSearchName]
    = useState("");

  // =========================
  // 페이지
  // =========================
  const [currentPage, setCurrentPage]
    = useState(1);

  const ITEMS_PER_PAGE = 5;

  // =========================
  // 거래처 목록
  // =========================
  const [clientList, setClientList]
    = useState([]);

  // =========================
  // 거래처 조회
  // =========================
  const fetchClients = async () => {

    try {

      const data = await getClients();

      setClientList(data);

    } catch (error) {

      console.log(error);

      alert("거래처 조회 실패");
    }
  };

  // =========================
  // 최초 실행
  // =========================
  useEffect(() => {

    fetchClients();

  }, []);

  // =========================
  // 거래처 삭제
  // =========================
  const handleDelete = async (id) => {

    const check = window.confirm(
      "삭제하시겠습니까?"
    );

    if (!check) {

      return;
    }

    try {

      const result
        = await deleteClient(id);

      if (result === "SUCCESS") {

        alert("삭제 완료");

        fetchClients();
      }

    } catch (error) {

      console.log(error);

      alert("삭제 실패");
    }
  };

  // =========================
  // 검색 필터
  // =========================
  const filteredClients = useMemo(() => {

    return clientList.filter((item) => {

      return item.name
        ?.toLowerCase()
        .includes(searchName.toLowerCase());

    });

  }, [clientList, searchName]);

  // =========================
  // 총 페이지 수
  // =========================
  const totalPages = Math.max(

    1,

    Math.ceil(
      filteredClients.length
      / ITEMS_PER_PAGE
    )
  );

  // =========================
  // 현재 페이지 데이터
  // =========================
  const paginatedClients = filteredClients.slice(

    (currentPage - 1)
    * ITEMS_PER_PAGE,

    currentPage
    * ITEMS_PER_PAGE
  );

  // =========================
  // 페이지 번호 생성
  // =========================
  const pageNumbers = () => {

    if (totalPages <= 5) {

      return Array.from(

        { length: totalPages },

        (_, i) => i + 1
      );
    }

    let startPage = Math.max(
      1,
      currentPage - 2
    );

    let endPage = startPage + 4;

    if (endPage > totalPages) {

      endPage = totalPages;

      startPage = totalPages - 4;
    }

    return Array.from(

      {
        length:
        endPage - startPage + 1
      },

      (_, i) =>
        startPage + i
    );
  };

  // =========================
  // 페이지 이동 함수
  // =========================
  const goToFirst = () =>
    setCurrentPage(1);

  const goToPrev = () =>
    setCurrentPage((prev) =>
      Math.max(prev - 1, 1)
    );

  const goToNext = () =>
    setCurrentPage((prev) =>
      Math.min(prev + 1, totalPages)
    );

  const goToLast = () =>
    setCurrentPage(totalPages);

  return (

    <MainLayout>

      <div className="client-page">

        {/* =========================
            헤더
        ========================= */}
        <div className="client-header">

          <h1>

            거래처 관리

          </h1>

        </div>

        {/* =========================
            검색 영역
        ========================= */}
        <div className="client-filter-box">

          <input

            type="text"

            placeholder="거래처명 검색"

            value={searchName}

            onChange={(e) => {

              setSearchName(
                e.target.value
              );

              setCurrentPage(1);
            }}
          />

          <button>

            검색

          </button>

        </div>

        {/* =========================
            테이블 영역
        ========================= */}
        <div className="client-table-wrapper">

          <table className="client-table">

            <thead>

              <tr>

                <th>번호</th>

                <th>거래처명</th>

                <th>관리</th>

              </tr>

            </thead>

            <tbody>

              {
                paginatedClients.map(
                  (item) => (

                    <tr key={item.id}>

                      <td>

                        {item.id}

                      </td>

                      <td>

                        {item.name}

                      </td>

                      <td>

                        <button

                          className="manage-button"

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

        </div>

        {/* =========================
            하단 영역
        ========================= */}
        <div className="client-bottom">

          {/* =========================
              페이지네이션
          ========================= */}
          <div className="pagination">

            <button

              onClick={goToFirst}

              disabled={currentPage === 1}
            >

              &lt;&lt;

            </button>

            <button

              onClick={goToPrev}

              disabled={currentPage === 1}
            >

              &lt;

            </button>

            {
              pageNumbers().map(
                (page) => (

                  <button

                    key={page}

                    className={`page-button ${
                      currentPage === page
                        ? "active"
                        : ""
                    }`}

                    onClick={() =>
                      setCurrentPage(page)
                    }
                  >

                    {page}

                  </button>
                ))
            }

            <button

              onClick={goToNext}

              disabled={
                currentPage === totalPages
              }
            >

              &gt;

            </button>

            <button

              onClick={goToLast}

              disabled={
                currentPage === totalPages
              }
            >

              &gt;&gt;

            </button>

          </div>

          {/* =========================
              우측 버튼 영역
          ========================= */}
          <div className="bottom-buttons">

            {/* =========================
                거래처 등록 버튼
            ========================= */}
            <button

              className="blue-button"

              onClick={() =>
                navigate("/client/create")
              }
            >

              거래처 등록

            </button>

            {/* =========================
                엑셀 다운로드
            ========================= */}
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