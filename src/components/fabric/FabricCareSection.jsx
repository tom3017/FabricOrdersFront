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
  // 추후 API 교체
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
  // 기본 form 데이터
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
  // 데이터
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

  const seasonList = [

    "봄",
    "여름",
    "가을",
    "겨울",
    "포시즌"
  ];

  // =========================
  // 수정 모드 데이터 조회
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

      // TODO:
      // 실제 API 교체 예정

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
  const handleSelectInactiveColor = (color) => {

    setSelectedInactiveColor((prev) =>
      prev === color
        ? null
        : color
    );
  };

  const handleSelectActiveColor = (color) => {

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
  const handleSelectInactiveSeason = (season) => {

    setSelectedInactiveSeason((prev) =>
      prev === season
        ? null
        : season
    );
  };

  const handleSelectActiveSeason = (season) => {

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
  // 저장
  // =========================
  const handleSave = async () => {

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

        <h1 className="fabric-create-title">

          {
            mode === "create"
              ? "원단 추가"
              : "원단 수정"
          }

        </h1>

        {/* 여기 아래는 네 기존 UI 그대로 붙이면 됨 */}
        {/* input에 value + name + onChange만 연결 */}

      </div>

    </div>
  );
}

export default FabricForm;