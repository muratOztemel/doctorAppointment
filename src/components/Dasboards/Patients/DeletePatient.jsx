import { useSelector } from "react-redux";
import { useDeletePatientMutation } from "../../../redux/features/api/apiSlice";
import Spinner from "../../UI/Spinner";

const DeletePatient = () => {
  const { patientId } = useSelector((state) => state.tablePatients);
  const [deletePatient, { data: patient, isError, isLoading }] =
    useDeletePatientMutation(patientId);
  console.log(patientId);

  if (isError) return <div>Error: {isError.toString()}</div>;

  if (isLoading) return <Spinner />;

  const handleDeletePatient = async () => {
    try {
      await deletePatient(patientId);
      console.log("işlem tamamlandı");
    } catch (err) {
      console.error("Error deleting patient:", err);
    }
  };

  return (
    <div>
      <h1>{patient?.name ? `${patient.name} successfully deleted` : ""}</h1>
      <button onClick={handleDeletePatient} disabled={isLoading}></button>
    </div>
  );
};
export default DeletePatient;
