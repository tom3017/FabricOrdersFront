import { useEffect, useState } from "react";

import MainLayout from "../../components/layout/MainLayout";

import "../../styles/basic.css";

import {getCompanySetting, saveCompanySetting, updateCompanySetting} from "../../api/companySettingApi";

import {uploadProfileImage} from "../../api/settingApi";

import { SERVER_URL } from "../../config/serverConfig";

function BasicPage() {

  const [

    isRegistered,

    setIsRegistered

  ] = useState(false);

  const [form, setForm]

    = useState({

      brandName: "",

      storeName: "",

      phone: "",

      fax: "",

      zipcode: "",

      address: "",

      detailAddress: "",

      ownerName: "",

      companyName: "",

      businessNumber: "",

      businessType: "",

      businessItem: "",

      taxEmail: "",

      logoImage: "",

      kakaoChannelId: "",

      soldOutYard: 0,

      showSoldOut: false,

      usePriceCut: false
    });

  const getImageUrl = (imagePath) => {

    if (!imagePath) {

      return "";
    }

    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
    ) {

      return imagePath;
    }

    return `${SERVER_URL}${imagePath}`;
  };

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:

        e.target.value
    });
  };

  const handleToggle = (key) => {

    setForm({

      ...form,

      [key]: !form[key]
    });
  };

  const fetchSetting = async () => {

    try {

      const data =
        await getCompanySetting();

      if (data) {

        const nextForm = {

          brandName:
            data.brandName || "",

          storeName:
            data.storeName || "",

          phone:
            data.phone || "",

          fax:
            data.fax || "",

          zipcode:
            data.zipcode || "",

          address:
            data.address || "",

          detailAddress:
            data.detailAddress || "",

          ownerName:
            data.ownerName || "",

          companyName:
            data.companyName || "",

          businessNumber:
            data.businessNumber || "",

          businessType:
            data.businessType || "",

          businessItem:
            data.businessItem || "",

          taxEmail:
            data.taxEmail || "",

          logoImage:
            data.logoImage || "",

          kakaoChannelId:
            data.kakaoChannelId || "",

          soldOutYard:
            data.soldOutYard || 0,

          showSoldOut:
            data.showSoldOut || false,

          usePriceCut:
            data.usePriceCut || false
        };

        setForm(nextForm);

        setIsRegistered(true);

        if (nextForm.logoImage) {

          localStorage.setItem(

            "companyLogo",

            getImageUrl(nextForm.logoImage)
          );
        }
      }

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchSetting();

  }, []);

  const handleRegister = async () => {

    try {

      const result =

        await saveCompanySetting(form);

      if (result === "SUCCESS") {

        if (form.logoImage) {

          localStorage.setItem(

            "companyLogo",

            getImageUrl(form.logoImage)
          );
        }

        alert(
          "사업자 정보 등록 완료"
        );

        setIsRegistered(true);
      }

    } catch (error) {

      console.log(error);

      alert("등록 실패");
    }
  };

  const handleUpdate = async () => {

    try {

      const result =

        await updateCompanySetting(form);

      if (result === "SUCCESS") {

        if (form.logoImage) {

          localStorage.setItem(

            "companyLogo",

            getImageUrl(form.logoImage)
          );
        }

        alert(
          "사업자 정보 수정 완료"
        );
      }

    } catch (error) {

      console.log(error);

      alert("수정 실패");
    }
  };

  const handleAddressSearch = () => {

    new window.daum.Postcode({

      oncomplete: function(data) {

        setForm((prev) => ({

          ...prev,

          zipcode:
            data.zonecode || "",

          address:
            data.address || ""
        }));
      }

    }).open();
  };

  const handleLogoUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) {

      return;
    }

    try {

      const imageUrl =

        await uploadProfileImage(file);

      setForm((prev) => ({

        ...prev,

        logoImage:
          imageUrl || ""
      }));

      localStorage.setItem(

        "companyLogo",

        getImageUrl(imageUrl)
      );

      alert("회사 로고 업로드 완료");

    } catch (error) {

      console.log(error);

      alert("로고 업로드 실패");
    }
  };

  return (

    <MainLayout>

      <div className="basic-page">

        <div className="basic-left">

          <div className="basic-card">

            <h2>

              사업자 정보 등록 및 변경

            </h2>

            <div className="basic-form">

              <input
                type="text"
                name="brandName"
                placeholder="브랜드명"
                value={form.brandName || ""}
                onChange={handleChange}
                readOnly={isRegistered}
              />

              <input
                type="text"
                name="storeName"
                placeholder="스토어명"
                value={form.storeName || ""}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="전화번호"
                value={form.phone || ""}
                onChange={handleChange}
              />

              <input
                type="text"
                name="fax"
                placeholder="팩스번호"
                value={form.fax || ""}
                onChange={handleChange}
              />

              <div className="address-row">

                <input
                  type="text"
                  name="zipcode"
                  placeholder="우편번호"
                  value={form.zipcode || ""}
                  readOnly
                />

                <button
                  type="button"
                  className="dark-button"
                  onClick={handleAddressSearch}
                >

                  주소검색

                </button>

              </div>

              <input
                type="text"
                name="address"
                placeholder="주소"
                value={form.address || ""}
                readOnly
              />

              <input
                type="text"
                name="detailAddress"
                placeholder="상세주소"
                value={form.detailAddress || ""}
                onChange={handleChange}
              />

              <input
                type="text"
                name="ownerName"
                placeholder="대표자명"
                value={form.ownerName || ""}
                onChange={handleChange}
              />

              <input
                type="text"
                name="companyName"
                placeholder="사업자상호"
                value={form.companyName || ""}
                onChange={handleChange}
              />

              <input
                type="text"
                name="businessNumber"
                placeholder="사업자번호"
                value={form.businessNumber || ""}
                onChange={handleChange}
              />

              <input
                type="text"
                name="businessType"
                placeholder="사업자업태"
                value={form.businessType || ""}
                onChange={handleChange}
              />

              <input
                type="text"
                name="businessItem"
                placeholder="사업자종목"
                value={form.businessItem || ""}
                onChange={handleChange}
              />

              <input
                type="text"
                name="taxEmail"
                placeholder="TAX 이메일"
                value={form.taxEmail || ""}
                onChange={handleChange}
              />

              <div className="button-row">

                <button

                  className="dark-button"

                  onClick={handleRegister}

                  disabled={isRegistered}
                >

                  등록하기

                </button>

                <button

                  className="blue-button"

                  onClick={handleUpdate}
                >

                  수정하기

                </button>

              </div>

            </div>

          </div>

          <div className="basic-card">

            <h2>

              카카오톡 발신 프로필 관리

            </h2>

            <div className="basic-form">

              <input
                type="text"
                name="kakaoChannelId"
                placeholder="카카오톡 비즈니스 채널 ID"
                value={form.kakaoChannelId || ""}
                onChange={handleChange}
              />

              <button

                className="blue-button"

                onClick={handleUpdate}
              >

                저장

              </button>

            </div>

          </div>

        </div>

        <div className="basic-right">

          <div className="basic-card">

            <h2>

              품절 관리

            </h2>

            <div className="basic-inline">

              <input
                type="number"
                name="soldOutYard"
                value={form.soldOutYard || 0}
                onChange={handleChange}
              />

              <span>

                야드 이하 자동 품절처리

              </span>

            </div>

            <button

              className="blue-button"

              onClick={handleUpdate}
            >

              저장

            </button>

          </div>

          <div className="basic-card">

            <h2>

              온라인 관리

            </h2>

            <div className="toggle-row">

              <span>

                재고무관 품절유무 표시

              </span>

              <button

                className="toggle-button"

                onClick={() =>

                  handleToggle(
                    "showSoldOut"
                  )
                }
              >

                {

                  form.showSoldOut

                    ? "사용"

                    : "미사용"
                }

              </button>

            </div>

            <button

              className="blue-button"

              onClick={handleUpdate}
            >

              저장

            </button>

          </div>

          <div className="basic-card">

            <h2>

              정산 관리

            </h2>

            <div className="toggle-row">

              <span>

                정산시 원단가 절사 유무

              </span>

              <button

                className="toggle-button"

                onClick={() =>

                  handleToggle(
                    "usePriceCut"
                  )
                }
              >

                {

                  form.usePriceCut

                    ? "사용"

                    : "사용안함"
                }

              </button>

            </div>

            <button

              className="blue-button"

              onClick={handleUpdate}
            >

              저장

            </button>

          </div>

          <div className="basic-card">

            <h2>

              회사 로고

            </h2>

            <div className="logo-section">

              {

                form.logoImage ? (

                  <img

                    src={getImageUrl(form.logoImage)}

                    alt="logo"

                    className="company-logo-preview"
                  />

                ) : (

                  <div className="logo-empty">

                    로고 없음

                  </div>
                )
              }

              <input

                type="file"

                id="logo-upload"

                accept="image/*"

                style={{
                  display: "none"
                }}

                onChange={handleLogoUpload}
              />

              <button

                className="blue-button"

                onClick={() =>

                  document
                    .getElementById(
                      "logo-upload"
                    )
                    .click()
                }
              >

                로고변경

              </button>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default BasicPage;