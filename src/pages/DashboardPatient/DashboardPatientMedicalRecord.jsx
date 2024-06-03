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
        <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
          <div className="xl:col-span-12 w-full">
            {/* <PatientAppointments /> */}
            {treatments.map((treatment) => {
              return (
                <PatientTreatments key={treatment.id} treatment={treatment} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardPatientAppointment;
