import PatientGetAppointment from "../../components/PatientDashboards/PatientGetAppointment";
import TitleCard from "../../components/UI/Cards/TitleCard";

const DashboardGetAppointment = () => {
  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"M Y - D O C T O R - A P P O I N T M E N T"} />
        <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
          <div className="xl:col-span-12 w-full">
            <PatientGetAppointment />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardGetAppointment;
