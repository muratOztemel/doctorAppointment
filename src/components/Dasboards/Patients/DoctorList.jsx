import AppointmentSlider from "../../PatientDashboards/AppointmentSlider";
import DefaultImage from "../../hooks/DefaultImage";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

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
        <div>Doctor Work Days</div>
        <div>Mon Tue Wed Thu Fri</div>
        <div className="text-sm flex justify-center items-center">
          <div className="mr-2">Add to Favorites</div>
          <div>
            <MdOutlineFavoriteBorder />
          </div>
        </div>
      </div>
      <AppointmentSlider doctor={doctor} branchName={branchName} />
    </>
  );
};
export default DoctorList;
