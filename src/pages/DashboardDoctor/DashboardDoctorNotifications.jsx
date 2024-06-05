import TitleCard from "../../components/UI/Cards/TitleCard";
import DoctorNotificationsList from "../../components/DoctorDashboard/DoctorNotificationsList";

const DashboardDoctorNotifications = () => {
  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"N O T I F I C A T I O N S"} />
        <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
          <div className="xl:col-span-12 w-full">
            <DoctorNotificationsList />{" "}
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardDoctorNotifications;
