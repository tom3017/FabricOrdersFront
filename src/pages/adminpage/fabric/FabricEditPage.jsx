import { useParams }
from "react-router-dom";

import MainLayout from "../../../components/layout/MainLayout";

import FabricForm from "../../../components/fabric/FabricForm";

function FabricEditPage() {

  const { id } = useParams();

  return (

    <MainLayout>

      <FabricForm
        mode="edit"
        fabricId={id}
      />

    </MainLayout>
  );
}

export default FabricEditPage;