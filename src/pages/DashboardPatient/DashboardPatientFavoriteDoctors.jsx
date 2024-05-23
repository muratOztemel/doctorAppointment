import PatientFavoriteDoctors from "../../components/PatientDashboards/PatientFavoriteDoctors";
import TitleCard from "../../components/UI/Cards/TitleCard";

const DashboardPatientHome = () => {
  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"M Y - F A V O R I T E - D O C T O R S"} />
        <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
          <div className="xl:col-span-12 w-full">
            <PatientFavoriteDoctors />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardPatientHome;
