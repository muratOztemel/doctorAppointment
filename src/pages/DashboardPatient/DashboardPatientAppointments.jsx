import PatientAppointments from "../../components/PatientDashboards/PatientAppointments";
import TitleCard from "../../components/UI/Cards/TitleCard";

const DashboardPatientHome = () => {
  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"M Y - A P P O I N T M E N T S"} />
        <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
          <div className="xl:col-span-12 w-full">
            <PatientAppointments />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardPatientHome;
