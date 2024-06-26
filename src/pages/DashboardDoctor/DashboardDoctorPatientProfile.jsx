import DoctorPatientProfile from "../../components/DoctorDashboard/DoctorPatientProfile";
import TitleCard from "../../components/UI/Cards/TitleCard";

const DashboardDoctorPatientProfile = () => {
  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"P A T I E N T - P R O F I L E"} />
        <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
          <div className="xl:col-span-12 w-full">
            <DoctorPatientProfile />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardDoctorPatientProfile;
