import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import "../../styles/fabric-create.css";

function FabricForm({
    mode = "create",
    fabricId = null
}) {

    const navigate = useNavigate();

    // =========================
    // 수정용 샘플 데이터
    // =========================
    const SAMPLE_DETAIL = {

        manufacturer: "제일모직",

        fabricBook: "템테이션",

        fabricNo: "TS-1023",

        dyeing: "선염",

        texture: "트윌",

        pattern: "스트라이프",

        patternType: "핀스트라이프",

        price: 19000,

        stock: 3200,

        width: "58",

        count: "120",

        weight: "280",

        thicknessValue: "0.45",

        strength: "85",

        scores: {

            stiffness: 3,
            thickness: 4,
            gloss: 2,
            seeThrough: 1
        },

        colors: [
            "네이비",
            "검정"
        ],

        seasons: [
            "가을",
            "겨울"
        ]
    };

    // =========================
    // form 상태
    // =========================
    const [formData, setFormData]
        = useState({

            manufacturer: "",

            fabricBook: "",

            fabricNo: "",

            dyeing: "",

            texture: "",

            pattern: "",

            patternType: "",

            price: "",

            stock: "",

            width: "",

            count: "",

            weight: "",

            thicknessValue: "",

            strength: ""
        });

    // =========================
    // 점수 상태
    // =========================
    const [selectedScores, setSelectedScores]
        = useState({

            stiffness: 0,
            thickness: 0,
            gloss: 0,
            seeThrough: 0
        });

    // =========================
    // 색상 상태
    // =========================
    const [selectedColors, setSelectedColors]
        = useState([]);

    const [selectedInactiveColor, setSelectedInactiveColor]
        = useState(null);

    const [selectedActiveColor, setSelectedActiveColor]
        = useState(null);

    // =========================
    // 시즌 상태
    // =========================
    const [selectedSeason, setSelectedSeason]
        = useState([]);

    const [selectedInactiveSeason, setSelectedInactiveSeason]
        = useState(null);

    const [selectedActiveSeason, setSelectedActiveSeason]
        = useState(null);

    // =========================
    // 색상 데이터
    // =========================
    const colorList = [

        "빨강",
        "주황",
        "노랑",
        "초록",
        "파랑",
        "네이비",
        "검정"
    ];

    // =========================
    // 시즌 데이터
    // =========================
    const seasonList = [

        "봄",
        "여름",
        "가을",
        "겨울",
        "포시즌"
    ];

    // =========================
    // 제조사 신규등록 여부
    // =========================
    const [isManufacturerCustom, setIsManufacturerCustom]
        = useState(false);

    // =========================
    // 원단북 신규등록 여부
    // =========================
    const [isFabricBookCustom, setIsFabricBookCustom]
        = useState(false);

    // =========================
    // 이미지 상태
    // =========================
    const [previewImage, setPreviewImage]
        = useState(null);

    // =========================
    // 제조사 리스트
    // =========================
    const manufacturerList = [

        "제일모직",
        "TK",
        "로로피아나"
    ];

    // =========================
    // 원단북 리스트
    // =========================
    const fabricBookList = [

        "템테이션",
        "에반",
        "노빌리티"
    ];

    // =========================
    // 수정 데이터 조회
    // =========================
    useEffect(() => {

        if (
            mode === "edit"
            &&
            fabricId
        ) {

            fetchFabricDetail();
        }

    }, [mode, fabricId]);

    // =========================
    // 상세 조회
    // =========================
    const fetchFabricDetail = async () => {

        try {

            const data = SAMPLE_DETAIL;

            setFormData({

                manufacturer:
                    data.manufacturer || "",

                fabricBook:
                    data.fabricBook || "",

                fabricNo:
                    data.fabricNo || "",

                dyeing:
                    data.dyeing || "",

                texture:
                    data.texture || "",

                pattern:
                    data.pattern || "",

                patternType:
                    data.patternType || "",

                price:
                    data.price || "",

                stock:
                    data.stock || "",

                width:
                    data.width || "",

                count:
                    data.count || "",

                weight:
                    data.weight || "",

                thicknessValue:
                    data.thicknessValue || "",

                strength:
                    data.strength || ""
            });

            setSelectedScores(
                data.scores || {}
            );

            setSelectedColors(
                data.colors || []
            );

            setSelectedSeason(
                data.seasons || []
            );

        } catch (error) {

            console.log(error);

            alert("원단 조회 실패");
        }
    };

    // =========================
    // input 변경
    // =========================
    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value
        }));
    };

    // =========================
    // 점수 선택
    // =========================
    const handleScoreClick = (
        type,
        score
    ) => {

        setSelectedScores((prev) => ({

            ...prev,

            [type]:

                prev[type] === score
                    ? 0
                    : score
        }));
    };

    // =========================
    // 색상 선택
    // =========================
    const handleSelectInactiveColor = (
        color
    ) => {

        setSelectedInactiveColor((prev) =>

            prev === color
                ? null
                : color
        );
    };

    const handleSelectActiveColor = (
        color
    ) => {

        setSelectedActiveColor((prev) =>

            prev === color
                ? null
                : color
        );
    };

    // =========================
    // 색상 이동
    // =========================
    const handleMoveColor = () => {

        if (!selectedInactiveColor) {
            return;
        }

        if (
            selectedColors.includes(
                selectedInactiveColor
            )
        ) {
            return;
        }

        setSelectedColors((prev) => [

            ...prev,

            selectedInactiveColor
        ]);

        setSelectedInactiveColor(null);
    };

    const handleMoveAllColors = () => {

        setSelectedColors(colorList);

        setSelectedInactiveColor(null);
    };

    const handleRemoveColorMove = () => {

        if (!selectedActiveColor) {
            return;
        }

        setSelectedColors((prev) =>

            prev.filter(
                (item) =>
                    item !== selectedActiveColor
            )
        );

        setSelectedActiveColor(null);
    };

    const handleRemoveAllColors = () => {

        setSelectedColors([]);

        setSelectedActiveColor(null);
    };

    // =========================
    // 시즌 선택
    // =========================
    const handleSelectInactiveSeason = (
        season
    ) => {

        setSelectedInactiveSeason((prev) =>

            prev === season
                ? null
                : season
        );
    };

    const handleSelectActiveSeason = (
        season
    ) => {

        setSelectedActiveSeason((prev) =>

            prev === season
                ? null
                : season
        );
    };

    // =========================
    // 시즌 이동
    // =========================
    const handleMoveSeason = () => {

        if (!selectedInactiveSeason) {
            return;
        }

        if (
            selectedSeason.includes(
                selectedInactiveSeason
            )
        ) {
            return;
        }

        setSelectedSeason((prev) => [

            ...prev,

            selectedInactiveSeason
        ]);

        setSelectedInactiveSeason(null);
    };

    const handleMoveAllSeason = () => {

        setSelectedSeason(seasonList);

        setSelectedInactiveSeason(null);
    };

    const handleRemoveSeasonMove = () => {

        if (!selectedActiveSeason) {
            return;
        }

        setSelectedSeason((prev) =>

            prev.filter(
                (item) =>
                    item !== selectedActiveSeason
            )
        );

        setSelectedActiveSeason(null);
    };

    const handleRemoveAllSeason = () => {

        setSelectedSeason([]);

        setSelectedActiveSeason(null);
    };

    // =========================
    // 이미지 업로드
    // =========================
    const handleImageUpload = (e) => {

        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const imageUrl =
            URL.createObjectURL(file);

        setPreviewImage(imageUrl);
    };

    // =========================
    // 저장
    // =========================
    const handleSave = () => {

        const requestData = {

            ...formData,

            scores: selectedScores,

            colors: selectedColors,

            seasons: selectedSeason
        };

        console.log(requestData);

        if (mode === "create") {

            alert("원단 등록 완료");

        } else {

            alert("원단 수정 완료");
        }

        navigate("/fabric");
    };

    return (

        <div className="fabric-create-page">

            <div className="fabric-create-card">

                {/* 제목 */}
                <h1 className="fabric-create-title">

                    {
                        mode === "create"
                            ? "원단 추가"
                            : "원단 수정"
                    }

                </h1>

                {/* =========================
                기본 정보
                ========================= */}
                <div className="fabric-form-section">

                   <div className="fabric-form-row">

                        <label>원단제조사</label>

                        <div className="fabric-inline">

                            {
                                isManufacturerCustom ? (

                                    <input
                                        type="text"
                                        name="manufacturer"
                                        value={formData.manufacturer}
                                        onChange={handleChange}
                                        placeholder="제조사 입력"
                                    />

                                ) : (

                                    <select
                                        name="manufacturer"
                                        value={formData.manufacturer}
                                        onChange={handleChange}
                                    >

                                        <option value="">
                                            제조사
                                        </option>

                                        {
                                            manufacturerList.map((item) => (

                                                <option
                                                    key={item}
                                                    value={item}
                                                >
                                                    {item}
                                                </option>
                                            ))
                                        }

                                    </select>

                                )
                            }

                            <button
                                type="button"
                                className="navy-button"
                                onClick={() => {

                                    const nextState =
                                        !isManufacturerCustom;

                                    setIsManufacturerCustom(
                                        nextState
                                    );

                                    // 제조사 신규등록 시
                                    // 원단북도 자동 신규등록
                                    setIsFabricBookCustom(
                                        nextState
                                    );

                                    setFormData((prev) => ({

                                        ...prev,

                                        manufacturer: "",

                                        fabricBook: ""
                                    }));
                                }}
                            >

                                {
                                    isManufacturerCustom
                                        ? "취소"
                                        : "신규등록"
                                }

                            </button>

                        </div>

                    </div>

                   <div className="fabric-form-row">

                        <label>원단북명</label>

                        <div className="fabric-inline">

                            {
                                isFabricBookCustom ? (

                                    <input
                                        type="text"
                                        name="fabricBook"
                                        value={formData.fabricBook}
                                        onChange={handleChange}
                                        placeholder="원단북명 입력"
                                        disabled={
                                            !formData.manufacturer
                                            &&
                                            !isManufacturerCustom
                                        }
                                    />

                                ) : (

                                    <select
                                        name="fabricBook"
                                        value={formData.fabricBook}
                                        onChange={handleChange}
                                        disabled={
                                            !formData.manufacturer
                                            &&
                                            !isManufacturerCustom
                                        }
                                    >

                                        <option value="">
                                            원단북
                                        </option>

                                        {
                                            fabricBookList.map((item) => (

                                                <option
                                                    key={item}
                                                    value={item}
                                                >
                                                    {item}
                                                </option>
                                            ))
                                        }

                                    </select>

                                )
                            }

                            <button
                                type="button"
                                className="navy-button"
                                disabled={
                                    !formData.manufacturer
                                    &&
                                    !isManufacturerCustom
                                }
                                onClick={() => {

                                    setIsFabricBookCustom(
                                        !isFabricBookCustom
                                    );

                                    setFormData((prev) => ({

                                        ...prev,

                                        fabricBook: ""
                                    }));
                                }}
                            >

                                {
                                    isFabricBookCustom
                                        ? "취소"
                                        : "신규등록"
                                }

                            </button>

                        </div>

                    </div>

                    <div className="fabric-form-row">

                        <label>원단번호</label>

                        <div className="fabric-inline">

                            <input
                                type="text"
                                name="fabricNo"
                                value={formData.fabricNo}
                                onChange={handleChange}
                            />

                            <button className="navy-button">
                                중복체크
                            </button>

                        </div>

                    </div>

                    <div className="fabric-form-row">

                        <label>염색법</label>

                        <select
                            name="dyeing"
                            value={formData.dyeing}
                            onChange={handleChange}
                        >
                            <option value="">
                                염색법
                            </option>

                            <option value="선염">
                                선염
                            </option>
                        </select>

                    </div>

                    <div className="fabric-form-row">

                        <label>짜임</label>

                        <select
                            name="texture"
                            value={formData.texture}
                            onChange={handleChange}
                        >
                            <option value="">
                                원단짜임
                            </option>

                            <option value="트윌">
                                트윌
                            </option>
                        </select>

                    </div>

                    <div className="fabric-form-row">

                        <label>원단무늬</label>

                        <select
                            name="pattern"
                            value={formData.pattern}
                            onChange={handleChange}
                        >
                            <option value="">
                                원단무늬
                            </option>

                            <option value="스트라이프">
                                스트라이프
                            </option>
                        </select>

                    </div>

                    <div className="fabric-form-row">

                        <label>무늬타입</label>

                        <select
                            name="patternType"
                            value={formData.patternType}
                            onChange={handleChange}
                        >
                            <option value="">
                                원단무늬타입
                            </option>

                            <option value="핀스트라이프">
                                핀스트라이프
                            </option>
                        </select>

                    </div>

                </div>

                {/* =========================
                색상 설정
                ========================= */}
                <div className="fabric-box-section">

                    <h2>색상설정</h2>

                    <div className="dual-box">

                        <div className="dual-list">

                            <div className="dual-title">
                                미활성화 색상
                            </div>

                            {
                                colorList
                                    .filter(
                                        (item) =>
                                            !selectedColors.includes(item)
                                    )
                                    .map((item) => (

                                        <button
                                            key={item}
                                            className={`list-button ${selectedInactiveColor === item
                                                    ? "selected-item"
                                                    : ""
                                                }`}
                                            onClick={() =>
                                                handleSelectInactiveColor(item)
                                            }
                                        >
                                            {item}
                                        </button>
                                    ))
                            }

                        </div>

                        <div className="dual-control">

                            <button onClick={handleMoveColor}>
                                {">"}
                            </button>

                            <button onClick={handleMoveAllColors}>
                                {">>"}
                            </button>

                            <button onClick={handleRemoveAllColors}>
                                {"<<"}
                            </button>

                            <button onClick={handleRemoveColorMove}>
                                {"<"}
                            </button>

                        </div>

                        <div className="dual-list">

                            <div className="dual-title">
                                활성화된 색상
                            </div>

                            {
                                selectedColors.map((item) => (

                                    <button
                                        key={item}
                                        className={`list-button ${selectedActiveColor === item
                                                ? "selected-item"
                                                : ""
                                            }`}
                                        onClick={() =>
                                            handleSelectActiveColor(item)
                                        }
                                    >
                                        {item}
                                    </button>
                                ))
                            }

                        </div>

                    </div>

                </div>

                {/* =========================
                이미지 추가
                ========================= */}
                <div className="fabric-form-row image-row">

                    <label>이미지추가</label>

                    <div className="image-search-box">

                        <button
                            type="button"
                            className="navy-button image-button"
                            onClick={() => {

                                document
                                    .getElementById(
                                        "fabric-image-upload"
                                    )
                                    .click();
                            }}
                        >
                            원단 사진 추가
                        </button>

                        <input
                            id="fabric-image-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                        />

                        <p className="fabric-help-text">
                            * 원단 이미지를 직접 업로드 해주세요.
                        </p>

                    </div>

                </div>

                {/* 이미지 미리보기 */}
                <div className="fabric-form-row image-preview-row">

                    <label>선택이미지</label>

                    <div className="image-preview">

                        {
                            previewImage ? (

                                <img
                                    src={previewImage}
                                    alt="원단"
                                    style={{

                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "8px"
                                    }}
                                />

                            ) : (

                                "이미지"
                            )
                        }

                    </div>

                </div>

                {/* =========================
                점수 영역
                ========================= */}
                <div className="score-section">

                    {
                        [
                            {
                                key: "stiffness",
                                title: "뻣뻣함"
                            },
                            {
                                key: "thickness",
                                title: "두꺼움"
                            },
                            {
                                key: "gloss",
                                title: "광택"
                            },
                            {
                                key: "seeThrough",
                                title: "비침"
                            }
                        ].map((item) => (

                            <div
                                className="score-row"
                                key={item.key}
                            >

                                <span>{item.title}</span>

                                <div className="score-buttons">

                                    {
                                        [5, 4, 3, 2, 1].map((num) => (

                                            <button
                                                key={num}
                                                className={`score-button ${selectedScores[item.key] === num
                                                        ? "score-active"
                                                        : ""
                                                    }`}
                                                onClick={() =>
                                                    handleScoreClick(
                                                        item.key,
                                                        num
                                                    )
                                                }
                                            >
                                                {num}
                                            </button>
                                        ))
                                    }

                                </div>

                            </div>
                        ))
                    }

                </div>

                {/* =========================
                시즌 설정
                ========================= */}
                <div className="fabric-box-section">

                    <h2>계절(시즌)설정</h2>

                    <div className="dual-box">

                        <div className="dual-list">

                            <div className="dual-title">
                                미활성화 계절
                            </div>

                            {
                                seasonList
                                    .filter(
                                        (item) =>
                                            !selectedSeason.includes(item)
                                    )
                                    .map((item) => (

                                        <button
                                            key={item}
                                            className={`list-button ${selectedInactiveSeason === item
                                                    ? "selected-item"
                                                    : ""
                                                }`}
                                            onClick={() =>
                                                handleSelectInactiveSeason(item)
                                            }
                                        >
                                            {item}
                                        </button>
                                    ))
                            }

                        </div>

                        <div className="dual-control">

                            <button onClick={handleMoveSeason}>
                                {">"}
                            </button>

                            <button onClick={handleMoveAllSeason}>
                                {">>"}
                            </button>

                            <button onClick={handleRemoveAllSeason}>
                                {"<<"}
                            </button>

                            <button onClick={handleRemoveSeasonMove}>
                                {"<"}
                            </button>

                        </div>

                        <div className="dual-list">

                            <div className="dual-title">
                                활성화된 계절
                            </div>

                            {
                                selectedSeason.map((item) => (

                                    <button
                                        key={item}
                                        className={`list-button ${selectedActiveSeason === item
                                                ? "selected-item"
                                                : ""
                                            }`}
                                        onClick={() =>
                                            handleSelectActiveSeason(item)
                                        }
                                    >
                                        {item}
                                    </button>
                                ))
                            }

                        </div>

                    </div>

                </div>

                {/* =========================
                원단 정보
                ========================= */}
                <div className="fabric-info-grid">

                    {/* 원단가격 */}
                    <div className="fabric-form-row">

                        <label>원단가격</label>

                        <div className="fabric-unit-input">

                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />

                            <span>원 / 야드당</span>

                        </div>

                    </div>

                    {/* 재고량 */}
                    <div className="fabric-form-row">

                        <label>재고량</label>

                        <div className="fabric-unit-input">

                            <input
                                type="text"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                            />

                            <span>야드</span>

                        </div>

                    </div>

                    {/* 원단폭 */}
                    <div className="fabric-form-row">

                        <label>원단폭</label>

                        <div className="fabric-unit-input">

                            <select
                                name="width"
                                value={formData.width}
                                onChange={handleChange}
                            >

                                <option value="">
                                    원단폭
                                </option>

                                <option value="44">
                                    44
                                </option>

                                <option value="58">
                                    58
                                </option>

                                <option value="60">
                                    60
                                </option>

                            </select>

                            <span>인치</span>

                        </div>

                    </div>

                    {/* 번수 */}
                    <div className="fabric-form-row">

                        <label>번수</label>

                        <div className="fabric-unit-input">

                            <input
                                type="text"
                                name="count"
                                value={formData.count}
                                onChange={handleChange}
                            />

                            <span>s</span>

                        </div>

                    </div>

                    {/* 중량 */}
                    <div className="fabric-form-row">

                        <label>중량</label>

                        <div className="fabric-unit-input">

                            <input
                                type="text"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                            />

                            <span>gsm</span>

                        </div>

                    </div>

                    {/* 두께 */}
                    <div className="fabric-form-row">

                        <label>두께</label>

                        <div className="fabric-unit-input">

                            <input
                                type="text"
                                name="thicknessValue"
                                value={formData.thicknessValue}
                                onChange={handleChange}
                            />

                            <span>mm</span>

                        </div>

                    </div>

                    {/* 강도 */}
                    <div className="fabric-form-row">

                        <label>강도</label>

                        <div className="fabric-unit-input">

                            <input
                                type="text"
                                name="strength"
                                value={formData.strength}
                                onChange={handleChange}
                            />

                            <span>N</span>

                        </div>

                    </div>

                </div>
                {/* =========================
                함유량
                ========================= */}
                <div className="fabric-form-row">

                    <label>함유량추가</label>

                    <select>

                        <option>
                            함유량 데이터
                        </option>

                    </select>

                </div>

                <div className="fabric-box-section">

                    <h2>선택된 함유량</h2>

                    <div className="selected-empty">
                        선택된 아이템이 없습니다.
                    </div>

                </div>

                {/* =========================
                취급주의사항
                ========================= */}
                <div className="fabric-box-section">

                    <h2>취급 주의사항</h2>

                    {
                        [
                            "물세탁법",
                            "표백제사용법",
                            "다림질법",
                            "건조법",
                            "드라이클리닝법",
                            "탈수법"
                        ].map((item) => (

                            <div
                                className="fabric-form-row"
                                key={item}
                            >

                                <label>{item}</label>

                                <select>
                                    <option>
                                        정보없음
                                    </option>
                                </select>

                            </div>
                        ))
                    }

                </div>

                {/* =========================
                저장 버튼
                ========================= */}
                <div className="fabric-create-bottom">

                    <button
                        className="save-button"
                        onClick={handleSave}
                    >
                        저장
                    </button>

                    <button
                        className="cancel-button"
                        onClick={() =>
                            navigate("/fabric")
                        }
                    >
                        취소
                    </button>

                </div>

            </div>

        </div>
    );
}

export default FabricForm;