import DefaultImage from "../hooks/DefaultImage";
import {
  useGetDoctorByIdQuery,
  useGetBranchByIdQuery,
  useGetPatientByIdQuery,
} from "../../redux/features/api/apiSlice";
import { format, parse } from "date-fns";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaStethoscope } from "react-icons/fa";
import ConfirmDeleteAppointment from "./ConfirmDeleteAppointment";

const ListAppointment = ({ appointment }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  const {
    data: doctor,
    isLoading: isLoadingDoctor,
    isError: isErrorDoctor,
  } = useGetDoctorByIdQuery(appointment.doctorId);

  const {
    data: patient,
    isLoading: isLoadingPatient,
    isError: isErrorPatient,
  } = useGetPatientByIdQuery(appointment.patientId);

  const {
    data: branch,
    isLoading: isLoadingBranch,
    isError: isErrorBranch,
  } = useGetBranchByIdQuery(doctor?.branchId, {
    skip: !doctor, // Only run this query if we have the doctor's data
  });

  // Show loading state if either doctor or branch data is still loading
  if (isLoadingDoctor || isLoadingPatient || isLoadingBranch) {
    return <p>Loading...</p>;
  }

  // Show error state if there's an error loading doctor or branch data
  if (isErrorDoctor || isErrorPatient || isErrorBranch) {
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

  const handleDelete = (id) => {
    setAppointmentToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (appointmentToDelete) {
      await deleteAppointment(appointmentToDelete).unwrap();
      setAppointmentToDelete(null); // Clear the ID
      setShowConfirmModal(false); // Close the modal
      toast.error("The appointment has been removed.", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

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
              <th className="text-center">Branch</th>
              <th className="text-center">Patient</th>
              <th className="text-center">Date</th>
              <th className="text-center">Time</th>
              <th className="text-center">Status</th>
              {useStatus === 1 || useStatus === 0 ? (
                <th className="text-center">Action</th>
              ) : (
                ""
              )}
            </tr>
          </thead>
          <tbody>
            <tr
              className={`border-b ${
                useStatus === 1
                  ? "border-green-100 hover:bg-green-50"
                  : "border-red-100 hover:bg-red-50"
              }  transition`}>
              <td className="text-center align-middle">{branch?.name}</td>
              <td className="text-center flex flex-col justify-center items-center align-middle">
                <img
                  src={DefaultImage(patient)}
                  alt={`${appointment.patientFullName}`}
                  className="w-20 h-20 rounded-full bg-white object-cover border border-dashed border-cyan-500 p-1 text-center"
                />
                {appointment.patientFullName}
              </td>

              <td className="text-center align-middle">
                {format(appointment.appointmentDate, "yyyy-MM-dd")}
              </td>

              <td className="text-center align-middle">
                {format(appointmentTime, "HH:mm")}
              </td>

              <td className="text-center align-middle">
                {getStatus(appointment.status)}
              </td>
              {useStatus === 1 || useStatus === 0 ? (
                <td className="text-center align-middle">
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="w-32 h-12 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex justify-center items-center px-3 py-2.5 text-center mr-2">
                      <MdCancel className="mr-2" />
                      Cancel
                    </button>
                    <Link
                      to={`/dashboard/doctor/visiting/${appointment.patientId}/${appointment.id}/${appointment.patientFullName}`}
                      className="w-32 h-12 text-white bg-green-300 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex justify-center items-center px-3 py-2.5 text-center mr-2">
                      <FaStethoscope className="h-12 mr-2" />
                      Visiting
                    </Link>
                  </div>
                </td>
              ) : (
                ""
              )}
            </tr>
          </tbody>
        </table>
      </div>
      {showConfirmModal && (
        <div>
          <ConfirmDeleteAppointment
            onClose={() => setShowConfirmModal(false)}
            onConfirm={handleDeleteConfirm}
            message="Are you sure you want to cancel this appointment?"
          />
        </div>
      )}
    </div>
  );
};

export default ListAppointment;
