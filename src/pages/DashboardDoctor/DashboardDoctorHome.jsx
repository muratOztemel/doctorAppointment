import DoctorScheduler from "../../components/DoctorDashboard/DoctorScheduler";
import TitleCard from "../../components/UI/Cards/TitleCard";

const DashboardPatientHome = () => {
  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"D A S H B O A R D"} />
        <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
          <div className="xl:col-span-12 w-full">
            <DoctorScheduler />
          </div>
          <div className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6"></div>
        </div>
      </div>
    </>
  );
};
export default DashboardPatientHome;
