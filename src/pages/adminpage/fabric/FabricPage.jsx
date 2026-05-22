// =========================
// FabricPage.jsx
// =========================

import { useEffect, useMemo, useState } from "react";

import MainLayout
from "../../../components/layout/MainLayout";

import "../../../styles/fabric.css";

// =========================
// 페이지 이동
// =========================
import { useNavigate }
from "react-router-dom";

const SAMPLE_FABRICS = [

  {
    id: 1,
    manufacturer: "에쏘르",
    book: "EAS-1201",
    fabricNo: "EAS-1287",
    fabricName: "멜란지 스트레치",
    used: "사용",
    inStock: 99926.1,
    imageUrl: ""
  },

  {
    id: 2,
    manufacturer: "블랑코",
    book: "BLA-047",
    fabricNo: "BLA-0471",
    fabricName: "워싱 코튼",
    used: "사용",
    inStock: 5284.5,
    imageUrl: ""
  },

  {
    id: 3,
    manufacturer: "비앤비",
    book: "BNB-222",
    fabricNo: "BNB-2233",
    fabricName: "고밀도 린넨",
    used: "미사용",
    inStock: 3150,
    imageUrl: ""
  }
];

function FabricPage() {

  // =========================
  // 페이지 이동
  // =========================
  const navigate = useNavigate();

  // =========================
  // 원단 목록 상태
  // =========================
  const [fabricList, setFabricList]
    = useState(() => {

      const saved =
        localStorage.getItem(
          "fabricList"
        );

      return saved
        ? JSON.parse(saved)
        : SAMPLE_FABRICS;
    });

  // =========================
  // 검색 상태
  // =========================
  const [search, setSearch]
    = useState("");

  const [category, setCategory]
    = useState("");

  const [manufacturer, setManufacturer]
    = useState("");

  const [book, setBook]
    = useState("");

  // =========================
  // 페이지 상태
  // =========================
  const [currentPage, setCurrentPage]
    = useState(1);

  const ITEMS_PER_PAGE = 5;

  // =========================
  // localStorage 저장
  // =========================
  useEffect(() => {

    localStorage.setItem(

      "fabricList",

      JSON.stringify(fabricList)
    );

  }, [fabricList]);

  // =========================
  // 검색 필터
  // =========================
  const filteredFabrics = useMemo(() => {

    return fabricList.filter((item) => {

      const matchesText =

        item.fabricNo
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        item.fabricName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesManufacturer =

        !manufacturer
        ||
        item.manufacturer
        === manufacturer;

      const matchesBook =

        !book
        ||
        item.book === book;

      return (

        matchesText
        &&
        matchesManufacturer
        &&
        matchesBook
      );
    });

  }, [
    fabricList,
    search,
    manufacturer,
    book
  ]);

  // =========================
  // 총 페이지 수
  // =========================
  const totalPages = Math.max(

    1,

    Math.ceil(

      filteredFabrics.length
      / ITEMS_PER_PAGE
    )
  );

  // =========================
  // 페이지 예외 처리
  // =========================
  useEffect(() => {

    if (
      currentPage > totalPages
    ) {

      setCurrentPage(totalPages);
    }

  }, [
    currentPage,
    totalPages
  ]);

  // =========================
  // 현재 페이지 데이터
  // =========================
  const paginatedFabrics =

    filteredFabrics.slice(

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

    let endPage =
      startPage + 4;

    if (endPage > totalPages) {

      endPage = totalPages;

      startPage =
        totalPages - 4;
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
  // 삭제
  // =========================
  const handleDelete = (id) => {

    if (

      window.confirm(
        "해당 원단을 삭제하시겠습니까?"
      )
    ) {

      setFabricList((prev) =>

        prev.filter(

          (item) =>
            item.id !== id
        )
      );
    }
  };

  // =========================
  // 페이지 이동
  // =========================
  const goToFirst = () =>
    setCurrentPage(1);

  const goToPrev = () =>

    setCurrentPage((prev) =>

      Math.max(prev - 1, 1)
    );

  const goToNext = () =>

    setCurrentPage((prev) =>

      Math.min(
        prev + 1,
        totalPages
      )
    );

  const goToLast = () =>
    setCurrentPage(totalPages);

  return (

    <MainLayout>

      <div className="fabric-page">

        {/* =========================
            제목
        ========================= */}
        <h1 className="fabric-title">

          원단 관리

        </h1>

        <div className="fabric-card">

          {/* =========================
              검색 영역
          ========================= */}
          <div className="fabric-search-row">

            {/* 품목 */}
            <select

              value={category}

              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
            >

              <option value="">

                품목

              </option>

              <option value="의류">

                의류

              </option>

              <option value="침구">

                침구

              </option>

              <option value="소품">

                소품

              </option>

            </select>

            {/* 제조사 */}
            <select

              value={manufacturer}

              onChange={(e) =>
                setManufacturer(
                  e.target.value
                )
              }
            >

              <option value="">

                원단제조사

              </option>

              <option value="에쏘르">

                에쏘르

              </option>

              <option value="블랑코">

                블랑코

              </option>

              <option value="비앤비">

                비앤비

              </option>

            </select>

            {/* 원단북 */}
            <select

              value={book}

              onChange={(e) =>
                setBook(
                  e.target.value
                )
              }
            >

              <option value="">

                원단북

              </option>

              <option value="EAS-1201">

                EAS-1201

              </option>

              <option value="BLA-047">

                BLA-047

              </option>

              <option value="BNB-222">

                BNB-222

              </option>

            </select>

            {/* 검색 */}
            <input

              type="text"

              placeholder="원단번호 또는 원단명 검색"

              value={search}

              onChange={(e) => {

                setSearch(
                  e.target.value
                );

                setCurrentPage(1);
              }}
            />

            <button

              className="fabric-button"

              onClick={() =>
                setCurrentPage(1)
              }
            >

              검색

            </button>

          </div>

          {/* =========================
              테이블
          ========================= */}
          <div className="fabric-table-wrapper">

            <table className="fabric-table">

              <thead>

                <tr>

                  <th>번호</th>

                  <th>원단제조사</th>

                  <th>원단북명</th>

                  <th>원단번호</th>

                  <th>원단명</th>

                  <th>사용유무</th>

                  <th>재고</th>

                  <th>관리</th>

                </tr>

              </thead>

              <tbody>

                {
                  paginatedFabrics.map((item) => (

                    <tr key={item.id}>

                      {/* 번호 */}
                      <td>

                        {item.id}

                      </td>

                      {/* 제조사 */}
                      <td>

                        {item.manufacturer}

                      </td>

                      {/* 원단북 */}
                      <td>

                        {item.book}

                      </td>

                      {/* 원단번호 */}
                      <td>

                        {item.fabricNo}

                      </td>

                      {/* 원단명 */}
                      <td>

                        {item.fabricName}

                      </td>

                      {/* 사용유무 */}
                      <td>

                        {item.used}

                      </td>

                      {/* 재고 */}
                      <td>

                        {
                          item.inStock
                          ?.toLocaleString()
                        }

                      </td>

                      {/* =========================
                          관리 버튼 영역
                      ========================= */}
                      <td>

                        <div className="fabric-manage-buttons">

                          {/* 관리 */}
                          <button

                            className="fabric-manage-button"

                            onClick={() =>

                              navigate(

                                `/fabric/edit/${item.id}`
                              )
                            }
                          >

                            관리

                          </button>

                          {/* 삭제 */}
                          <button

                            className="fabric-delete-button"

                            onClick={() =>
                              handleDelete(item.id)
                            }
                          >

                            삭제

                          </button>

                        </div>

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
          <div className="fabric-bottom">

            {/* 페이지네이션 */}
            <div className="pagination">

              <button

                className="page-button"

                onClick={goToFirst}

                disabled={
                  currentPage === 1
                }
              >

                &lt;&lt;

              </button>

              <button

                className="page-button"

                onClick={goToPrev}

                disabled={
                  currentPage === 1
                }
              >

                &lt;

              </button>

              {
                pageNumbers().map((page) => (

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

                className="page-button"

                onClick={goToNext}

                disabled={
                  currentPage === totalPages
                }
              >

                &gt;

              </button>

              <button

                className="page-button"

                onClick={goToLast}

                disabled={
                  currentPage === totalPages
                }
              >

                &gt;&gt;

              </button>

            </div>

            {/* =========================
                원단 등록 버튼
            ========================= */}
            <div>

              <button

                className="fabric-button fabric-add-button"

                onClick={() =>

                  navigate(
                    "/fabric/create"
                  )
                }
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