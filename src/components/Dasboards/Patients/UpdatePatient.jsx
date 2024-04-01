import { useSelector } from "react-redux";
import { useUpdatePatientMutation } from "../../../redux/features/api/apiSlice";
import Spinner from "../../UI/Spinner";

const UpdatePatient = () => {
  const { patientId } = useSelector((state) => state.tablePatients);
  const [updatePatient, { data: patient, isError, isLoading }] =
    useUpdatePatientMutation();

  if (isError) return <div>Error: {isError.toString()}</div>;

  if (isLoading) return <Spinner />;

  const handleUpdatePatient = async () => {
    try {
      const updatedPatientData = {
        name: "Selahattin ✌️",
      };

      await updatePatient({
        id: patientId,
        updatedPatient: updatedPatientData,
      });
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    <div>
      <h1>{patient?.name}</h1>
      <button onClick={handleUpdatePatient} disabled={isLoading}></button>
    </div>
  );
};
export default UpdatePatient;
