import { useMemo, useState } from "react";
import MainLayout from "../../../components/layout/MainLayout";
import "../../../styles/fabric-price.css";

function FabricPricePage() {
  const [search, setSearch] = useState("");
  const [maker, setMaker] = useState("");
  const [book, setBook] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

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
    },
    {
      id: 3,
      maker: "블랑코",
      book: "BLA-047",
      fabricNo: "BLA-0479",
      purchasePrice: "13,500",
      sellPrice: "20,000",
      discount: "15%",
      status: "사용"
    }
  ];

  const filteredPrices = useMemo(() => {
    return priceList.filter((item) => {
      const matchesSearch = item.fabricNo
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesMaker = !maker || item.maker === maker;
      const matchesBook = !book || item.book === book;
      return matchesSearch && matchesMaker && matchesBook;
    });
  }, [priceList, search, maker, book]);

  const totalPages = Math.max(1, Math.ceil(filteredPrices.length / ITEMS_PER_PAGE));

  const paginatedPrices = filteredPrices.slice(
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
      <div className="fabric-price-page">
        <div className="price-header">
          <h1>원단 가격 관리</h1>
        </div>

        <div className="price-filter-box">
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
              {paginatedPrices.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.maker}</td>
                  <td>{item.book}</td>
                  <td>{item.fabricNo}</td>
                  <td>₩ {item.purchasePrice}</td>
                  <td>₩ {item.sellPrice}</td>
                  <td>{item.discount}</td>
                  <td>
                    <button className="status-button">{item.status}</button>
                  </td>
                  <td>
                    <button className="manage-button">관리</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="price-bottom">
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
            <button className="blue-button">가격 등록</button>
            <button className="dark-button">엑셀 다운로드</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default FabricPricePage;
