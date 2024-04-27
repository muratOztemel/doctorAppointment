import AppointmentSlider from "../../PatientDashboards/AppointmentSlider";
import useDefaultImage from "../../hooks/useDefaultImage";

const DoctorList = ({ doctor }) => {
  return (
    <>
      <div className="col-span-2 p-4">
        <div>
          <img
            src={useDefaultImage(doctor)}
            alt={`${doctor.name} ${doctor.surname}`}
            className="w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
          />
        </div>
        <div>
          {doctor.name} {doctor.surname}
        </div>
      </div>
      <AppointmentSlider />
    </>
  );
};
export default DoctorList;
