import { useMemo, useState } from "react";
import MainLayout from "../../../components/layout/MainLayout";
import "../../../styles/fabric-stock.css";

function FabricStockPage() {
  const [search, setSearch] = useState("");
  const [maker, setMaker] = useState("");
  const [book, setBook] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

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
    },
    {
      id: 11082,
      maker: "블랑코",
      book: "BLA-047",
      code: "1768355327",
      fabricNo: "BLA-0479",
      stock: "28,000",
      status: "사용"
    }
  ];

  const filteredList = useMemo(() => {
    return fabricList.filter((item) => {
      const matchesSearch = item.fabricNo
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesMaker = !maker || item.maker === maker;
      const matchesBook = !book || item.book === book;
      return matchesSearch && matchesMaker && matchesBook;
    });
  }, [fabricList, search, maker, book]);

  const totalPages = Math.max(1, Math.ceil(filteredList.length / ITEMS_PER_PAGE));

  const paginatedList = filteredList.slice(
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
      <div className="fabric-stock-page">
        <div className="fabric-stock-header">
          <h1>원단 재고 관리</h1>
        </div>

        <div className="fabric-filter-box">
          <select value={maker} onChange={(e) => setMaker(e.target.value)}>
            <option value="">원단제조사</option>
            <option value="에쏘르">에쏘르</option>
            <option value="마로조또">마로조또</option>
            <option value="블랑코">블랑코</option>
          </select>
          <select value={book} onChange={(e) => setBook(e.target.value)}>
            <option value="">원단북</option>
            <option value="EAS-1201">EAS-1201</option>
            <option value="MZ">MZ</option>
            <option value="BLA-047">BLA-047</option>
          </select>
          <input
            type="text"
            placeholder="원단번호 검색"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button onClick={() => setCurrentPage(1)}>검색</button>
        </div>

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
              {paginatedList.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.maker}</td>
                  <td>{item.book}</td>
                  <td>{item.code}</td>
                  <td>{item.fabricNo}</td>
                  <td>
                    <div className="fabric-image" />
                  </td>
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
                    <button className="manage-button">관리</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="fabric-bottom">
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
          <div className="bottom-buttons">
            <button className="blue-button">원단 등록</button>
            <button className="dark-button">원단 엑셀</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default FabricStockPage;
