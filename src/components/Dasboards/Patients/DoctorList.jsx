import AppointmentSlider from "../../PatientDashboards/AppointmentSlider";
import DefaultImage from "../../hooks/DefaultImage";

const DoctorList = ({ doctor, branchName }) => {
  return (
    <>
      <div className="col-span-2 p-4">
        <div className="flex justify-center items-center">
          <img
            src={DefaultImage(doctor.doctorInfo)}
            alt={`${doctor.name} ${doctor.surname}`}
            className="w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
          />
        </div>
        <div className="flex justify-center items-center">
          {doctor.title} {doctor.name} {doctor.surname}
        </div>
        <div className="flex justify-center items-center text-gray-500">
          {branchName}
        </div>
      </div>
      <AppointmentSlider />
    </>
  );
};
export default DoctorList;
