import { useState } from "react";
import "../../styles/client-form.css";

function ClientForm({ mode = "create", initialData = null, onSave, onCancel }) {

  // =========================
  // 폼 상태
  // =========================
  const [formData, setFormData] = useState({
    group: "",
    branchName: "",
    loginId: "",
    password: "",
    representative: "",
    businessName: "",
    businessNumber: "",
    address: "",
    detailAddress: "",
    phone: "",
    fax: "",
    email: "",
    taxEmail: "",
    basicRatePercent: "",
    basicRateWon: "",
    kakaoToggle: false,
    receiveNumber: "",
    remarks: "",
    accountStatus: true,
  });

  // =========================
  // 입력 변경 핸들러
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // 폼 제출
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 필수 항목 검증
    if (!formData.branchName.trim()) {
      alert("지점명을 입력하세요.");
      return;
    }
    if (!formData.loginId.trim()) {
      alert("아이디를 입력하세요.");
      return;
    }
    if (!formData.password.trim() && mode === "create") {
      alert("패스워드를 입력하세요.");
      return;
    }
    if (!formData.businessName.trim()) {
      alert("사업자상호를 입력하세요.");
      return;
    }
    if (!formData.businessNumber.trim()) {
      alert("사업자번호를 입력하세요.");
      return;
    }

    if (onSave) {
      onSave(formData);
    }
  };

  // =========================
  // 폼 취소
  // =========================
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form className="client-form" onSubmit={handleSubmit}>
      {/* =========================
          섹션 1: 기본 정보
      ========================= */}
      <div className="form-section">
        <h2>기본 정보</h2>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="group">그룹 *</label>
            <div className="group-input">
              <select
                id="group"
                name="group"
                value={formData.group}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">선택하세요</option>
                <option value="group1">그룹1</option>
                <option value="group2">그룹2</option>
                <option value="group3">그룹3</option>
              </select>
              <button type="button" className="btn-new">
                신규
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="branchName">지점명 *</label>
            <input
              type="text"
              id="branchName"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              className="form-input"
              placeholder="지점명을 입력하세요"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="loginId">아이디 *</label>
            <div className="input-with-button">
              <input
                type="text"
                id="loginId"
                name="loginId"
                value={formData.loginId}
                onChange={handleChange}
                className="form-input"
                placeholder="로그인 아이디"
              />
              <button type="button" className="btn-check">
                중복확인
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">패스워드 *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="패스워드를 입력하세요"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="representative">대표자명</label>
            <input
              type="text"
              id="representative"
              name="representative"
              value={formData.representative}
              onChange={handleChange}
              className="form-input"
              placeholder="대표자명"
            />
          </div>

          <div className="form-group">
            <label htmlFor="businessName">사업자상호 *</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="form-input"
              placeholder="사업자상호"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="businessNumber">사업자번호 *</label>
            <div className="input-with-button">
              <input
                type="text"
                id="businessNumber"
                name="businessNumber"
                value={formData.businessNumber}
                onChange={handleChange}
                className="form-input"
                placeholder="사업자번호"
              />
              <button type="button" className="btn-search">
                조회
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          섹션 2: 연락처 및 주소
      ========================= */}
      <div className="form-section">
        <h2>연락처 및 주소</h2>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="address">주소</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
              placeholder="주소"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="detailAddress">상세주소</label>
            <input
              type="text"
              id="detailAddress"
              name="detailAddress"
              value={formData.detailAddress}
              onChange={handleChange}
              className="form-input"
              placeholder="상세주소"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">휴대폰</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="휴대폰번호"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fax">팩스번호</label>
            <input
              type="tel"
              id="fax"
              name="fax"
              value={formData.fax}
              onChange={handleChange}
              className="form-input"
              placeholder="팩스번호"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">이메일주소</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="이메일주소"
            />
          </div>

          <div className="form-group">
            <label htmlFor="taxEmail">TAX이메일</label>
            <input
              type="email"
              id="taxEmail"
              name="taxEmail"
              value={formData.taxEmail}
              onChange={handleChange}
              className="form-input"
              placeholder="세금계산서 이메일"
            />
          </div>
        </div>
      </div>

      {/* =========================
          섹션 3: 거래 조건
      ========================= */}
      <div className="form-section">
        <h2>거래 조건</h2>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="basicRatePercent">기본요율 (%)</label>
            <input
              type="number"
              id="basicRatePercent"
              name="basicRatePercent"
              value={formData.basicRatePercent}
              onChange={handleChange}
              className="form-input"
              placeholder="0.00"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="basicRateWon">기본요율 (₩)</label>
            <input
              type="number"
              id="basicRateWon"
              name="basicRateWon"
              value={formData.basicRateWon}
              onChange={handleChange}
              className="form-input"
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="kakaoToggle">출고카톡</label>
            <div className="toggle-wrapper">
              <input
                type="checkbox"
                id="kakaoToggle"
                name="kakaoToggle"
                checked={formData.kakaoToggle}
                onChange={handleChange}
                className="toggle-input"
              />
              <label htmlFor="kakaoToggle" className="toggle-label"></label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="receiveNumber">출고수신번호</label>
            <input
              type="tel"
              id="receiveNumber"
              name="receiveNumber"
              value={formData.receiveNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="출고수신번호"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="remarks">비고</label>
            <textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="form-textarea"
              placeholder="특이사항을 입력하세요"
              rows="4"
            ></textarea>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="accountStatus">계정사용</label>
            <div className="toggle-wrapper">
              <input
                type="checkbox"
                id="accountStatus"
                name="accountStatus"
                checked={formData.accountStatus}
                onChange={handleChange}
                className="toggle-input"
              />
              <label htmlFor="accountStatus" className="toggle-label"></label>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          버튼 영역
      ========================= */}
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {mode === "create" ? "저장" : "수정"}
        </button>
        <button type="button" className="btn-cancel" onClick={handleCancel}>
          취소
        </button>
      </div>
    </form>
  );
}

export default ClientForm;