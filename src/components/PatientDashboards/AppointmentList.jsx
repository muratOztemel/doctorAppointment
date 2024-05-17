import DefaultImage from "../hooks/DefaultImage";
import {
  useGetDoctorByIdQuery,
  useGetBranchByIdQuery,
} from "../../redux/features/api/apiSlice";

const AppointmentList = ({ appointment }) => {
  const {
    data: doctor,
    isLoading,
    isError,
  } = useGetDoctorByIdQuery(appointment.doctorId);
  console.log("doctor", doctor);
  const {
    data: branch,
    isLoading: isLoadingBranch,
    isError: isErrorBranch,
  } = useGetBranchByIdQuery(doctor?.branchId, {
    skip: !doctor,
  });

  // Date comparison function
  const isPastAppointment = (appointmentDate) => {
    const today = new Date();
    const appointmentDateObj = new Date(appointmentDate);
    return appointmentDateObj < today;
  };

  if (isLoading || isLoadingBranch) {
    return <p>Loading...</p>;
  }

  if (isError || isErrorBranch) {
    return <p>Error loading appointment details.</p>;
  }

  return (
    <div
      className={`col-span-2 p-4 ${
        isPastAppointment ? "bg-red-100" : "bg-cyan-100"
      }`}>
      <div className="flex justify-center items-center  text-lg text-cyan-500">
        {branch.name}
      </div>
      <div className="col-span-2 p-4 rounded-b-lg border bg-cyan-50 flex flex-col justify-start">
        <div className="flex justify-center items-center">
          <img
            src={DefaultImage(doctor.doctorInfo)}
            alt={`${appointment.doctorFullName}`}
            className="w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
          />
        </div>
        <div className="flex justify-center items-center">
          {doctor.title} {appointment.doctorFullName}
        </div>
        <div>{appointment.appointmentDate}</div>
        <div>{appointment.appointmentTime}</div>
        <div>{appointment.status}</div>
      </div>
    </div>
  );
};
export default AppointmentList;
