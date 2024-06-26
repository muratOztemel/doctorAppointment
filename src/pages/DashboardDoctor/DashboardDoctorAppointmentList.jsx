import DoctorAppointmentList from "../../components/DoctorDashboard/DoctorAppointmentList";
import TitleCard from "../../components/UI/Cards/TitleCard";

const DashboardDoctorAppointmentList = () => {
  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"A P P O I N M E N T - L I S T"} />
        <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
          <div className="xl:col-span-12 w-full">
            <DoctorAppointmentList />
          </div>
          <div className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6"></div>
        </div>
      </div>
    </>
  );
};
export default DashboardDoctorAppointmentList;
