import DefaultImage from "../hooks/DefaultImage";
import {
  useGetDoctorByIdQuery,
  useGetBranchByIdQuery,
} from "../../redux/features/api/apiSlice";
import { format, parse } from "date-fns";
import { useState } from "react";
import { MdCancel } from "react-icons/md";

const AppointmentList = ({ appointment }) => {
  const [showModal, setShowModal] = useState(false);
  const {
    data: doctor,
    isLoading: isLoadingDoctor,
    isError: isErrorDoctor,
  } = useGetDoctorByIdQuery(appointment.doctorId);
  const {
    data: branch,
    isLoading: isLoadingBranch,
    isError: isErrorBranch,
  } = useGetBranchByIdQuery(doctor?.branchId, {
    skip: !doctor, // Only run this query if we have the doctor's data
  });

  // Show loading state if either doctor or branch data is still loading
  if (isLoadingDoctor || isLoadingBranch) {
    return <p>Loading...</p>;
  }

  // Show error state if there's an error loading doctor or branch data
  if (isErrorDoctor || isErrorBranch) {
    return <p>Error loading appointment details. Please try again later.</p>;
  }

  const appointmentTime = parse(
    appointment.appointmentTime,
    "HH:mm:ss",
    new Date()
  );

  function getStatus(status) {
    let statusName;

    switch (status) {
      case 0:
        statusName = "Pending";
        break;
      case 1:
        statusName = "Confirmed";
        break;
      case 2:
        statusName = "Finished";
        break;
      case 3:
        statusName = "Cancel";
        break;
      default:
        statusName = "Invalid status number";
    }

    return statusName;
  }

  const useStatus = appointment.status;
  // Render the component only if the appointment date is in the future
  return (
    <div className="w-full p-4">
      <div className="flex flex-row w-full p-4 ">
        <table className="table-auto w-full">
          <thead
            className={`${
              useStatus === 1 ? "bg-green-50" : "bg-red-50"
            } rounded-md overflow-hidden`}>
            <tr>
              <th>Branch</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              {useStatus === 1 || useStatus === 0 ? <th>Action</th> : ""}
            </tr>
          </thead>
          <tbody>
            <tr
              className={`border-b ${
                useStatus === 1
                  ? "border-green-100 hover:bg-green-50"
                  : "border-red-100 hover:bg-red-50"
              }  transition`}>
              <td className="text-center">{branch?.name}</td>
              <td className="text-center flex flex-col justify-center items-center">
                <img
                  src={DefaultImage(doctor?.doctorInfo)}
                  alt={`Dr. ${appointment.doctorFullName}`}
                  className="w-20 h-20 rounded-full bg-white object-cover border border-dashed border-cyan-500 p-1 text-center"
                />
                {doctor?.title} {appointment.doctorFullName}
              </td>

              <td className="text-center">
                {format(appointment.appointmentDate, "yyyy-MM-dd")}
              </td>

              <td className="text-center">
                {format(appointmentTime, "HH:mm")}
              </td>

              <td className="text-center">{getStatus(appointment.status)}</td>
              {useStatus === 1 || useStatus === 0 ? (
                <td className="text-center">
                  <button
                    onClick={() => {
                      setShowModal(!showModal);
                    }}
                    className="w-52 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                    <MdCancel className="mr-2" />
                    Cancel Appointment
                  </button>
                </td>
              ) : (
                ""
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
