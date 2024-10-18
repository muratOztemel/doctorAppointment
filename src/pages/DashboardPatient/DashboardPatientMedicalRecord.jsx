import { useSelector } from "react-redux";
import PatientTreatments from "../../components/PatientDashboards/PatientTreatments";
import TitleCard from "../../components/UI/Cards/TitleCard";
import { useGetTreatmentsQuery } from "../../redux/features/api/apiSlice";

const DashboardPatientAppointment = () => {
  const { patientId } = useSelector((state) => state.patient);

  const {
    data: treatments,
    isError,
    isLoading,
  } = useGetTreatmentsQuery(patientId);

  console.log(treatments);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error</h1>;
  }
  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"M Y - M E D I C A L - R E C O R D"} />
        <div className="w-full flex flex-col gap-6">
          {/* <PatientAppointments /> */}
          {treatments.map((treatment) => {
            return (
              <PatientTreatments key={treatment.id} treatment={treatment} />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default DashboardPatientAppointment;
