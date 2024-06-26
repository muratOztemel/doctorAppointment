import PatientMedicalRecords from "../../components/DoctorDashboard/PatientMedicalRecords";
import TitleCard from "../../components/UI/Cards/TitleCard";

const DashboardDoctorPatientMedicalRecords = () => {
  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"P A T I E N T - M E D I C A L - R E C O R D S"} />
        <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
          <div className="xl:col-span-12 w-full">
            <PatientMedicalRecords />
          </div>
          <div className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6"></div>
        </div>
      </div>
    </>
  );
};
export default DashboardDoctorPatientMedicalRecords;
