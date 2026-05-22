import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import ClientForm from "../../components/client/ClientForm";
import { createClient } from "../../api/clientApi";

function ClientFormPage() {

  const navigate = useNavigate();

  // =========================
  // 폼 저장 핸들러
  // =========================
  const handleSave = async (formData) => {
    try {
      const result = await createClient(formData);
      if (result === "SUCCESS" || result.id) {
        alert("거래처가 등록되었습니다.");
        navigate("/clients");
      } else {
        alert("거래처 등록 실패");
      }
    } catch (error) {
      console.error("Error saving client:", error);
      alert("거래처 등록 중 오류가 발생했습니다.");
    }
  };

  // =========================
  // 폼 취소 핸들러
  // =========================
  const handleCancel = () => {
    navigate("/clients");
  };

  return (
    <MainLayout>
      <div className="client-form-page">
        <div className="form-container">
          <h1>거래처 등록</h1>
          <ClientForm
            mode="create"
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default ClientFormPage;