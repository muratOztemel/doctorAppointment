import { useGetPatientByIdQuery } from "../../../redux/features/api/apiSlice";

const PatientProfile = () => {
  const { data: patient, isError, isLoading } = useGetPatientByIdQuery(501);
  console.log(patient);
  return <div>PatientProfile</div>;
};
export default PatientProfile;
