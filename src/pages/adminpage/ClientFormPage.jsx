import ClientForm from "../../components/client/ClientForm";

function ClientFormPage() {

    const handleSave = (data) => {

        console.log(data);

        alert("저장");
    };

    return (

        <ClientForm
            mode="create"
            onSave={handleSave}
        />
    );
}

export default ClientFormPage;