import { useAddNewPatientMutation } from "../../../redux/features/api/apiSlice";
import Spinner from "../../UI/Spinner";

const AddNewPatient = () => {
  const [addNewPatient, { data, isError, isLoading }] =
    useAddNewPatientMutation();

  if (isError) return <div>Error: {isError.toString()}</div>;

  if (isLoading) return <Spinner />;

  const addIpAddress = async () => {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  };

  const handleAddPatient = async () => {
    try {
      const ip = await addIpAddress();
      const newPatientData = {
        name: "Test",
        surname: "Soyadı",
        nationality: "Türkiye",
        identyType: "true",
        identyNo: "12345678911",
        country: "Türkiye",
        language: "English",
        birthDate: "28.05.1917",
        gender: "Male",
        email: "cwabe0@cargocollective.com",
        phoneNumber: "+90 808 853 6045",
        photo: null,
        bloodGroup: "0-",
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: ip,
      };

      await addNewPatient(newPatientData);
    } catch (err) {
      console.error("Error adding new product:", err);
    }
  };

  return (
    <div>
      <h1>{data?.id}</h1>
      <h1>{data?.name}</h1>
      <h1>{data?.ip_address}</h1>
      <button onClick={handleAddPatient} disabled={isLoading}>
        Add New Product
      </button>
    </div>
  );
};
export default AddNewPatient;
