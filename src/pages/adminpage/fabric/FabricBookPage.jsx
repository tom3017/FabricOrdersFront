import { useMemo, useState } from "react";
import MainLayout from "../../../components/layout/MainLayout";
import "../../../styles/fabric-book.css";

function FabricBookPage() {
  const [search, setSearch] = useState("");
  const [maker, setMaker] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

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
    },
    {
      id: 376,
      maker: "비앤비",
      book: "LINEN",
      code: "1768355327",
      status: "사용"
    }
  ];

  const filteredBooks = useMemo(() => {
    return fabricBooks.filter((item) => {
      const matchesSearch = item.code
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesMaker = !maker || item.maker === maker;
      return matchesSearch && matchesMaker;
    });
  }, [fabricBooks, search, maker]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / ITEMS_PER_PAGE));

  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const pageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    let startPage = Math.max(1, currentPage - 2);
    let endPage = startPage + 4;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - 4;
    }
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const goToFirst = () => setCurrentPage(1);
  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToLast = () => setCurrentPage(totalPages);

  return (
    <MainLayout>
      <div className="fabric-book-page">
        <div className="fabric-book-header">
          <h1>원단북 관리</h1>
        </div>

        <div className="fabric-book-filter">
          <select value={maker} onChange={(e) => setMaker(e.target.value)}>
            <option value="">원단제조사</option>
            <option value="텍솔로니">텍솔로니</option>
            <option value="브라운아론">브라운아론</option>
            <option value="마로조또">마로조또</option>
            <option value="비앤비">비앤비</option>
          </select>
          <input
            type="text"
            placeholder="코드 검색"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button onClick={() => setCurrentPage(1)}>검색</button>
        </div>

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
              {paginatedBooks.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <div className="book-image" />
                  </td>
                  <td>{item.maker}</td>
                  <td>{item.book}</td>
                  <td>{item.code}</td>
                  <td>
                    <button className="book-status-button">{item.status}</button>
                  </td>
                  <td>
                    <button className="book-manage-button">관리</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="fabric-book-bottom">
          <div className="pagination">
            <button onClick={goToFirst} disabled={currentPage === 1}>
              &lt;&lt;
            </button>
            <button onClick={goToPrev} disabled={currentPage === 1}>
              &lt;
            </button>
            {pageNumbers().map((page) => (
              <button
                key={page}
                className={`page-button ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button onClick={goToNext} disabled={currentPage === totalPages}>
              &gt;
            </button>
            <button onClick={goToLast} disabled={currentPage === totalPages}>
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default FabricBookPage;
