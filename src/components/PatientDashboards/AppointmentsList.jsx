import DefaultImage from "../hooks/DefaultImage";
import {
  useGetDoctorByIdQuery,
  useGetBranchByIdQuery,
  useDeleteAppointmentMutation,
} from "../../redux/features/api/apiSlice";
import { format, parse } from "date-fns";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import ConfirmDeleteAppointment from "./ConfirmDeleteAppointment";
import { toast } from "react-toastify";

const AppointmentList = ({ appointment }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [deleteAppointment] = useDeleteAppointmentMutation();
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
    skip: !doctor,
  });

  if (isLoadingDoctor || isLoadingBranch) {
    return <p>Loading...</p>;
  }

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
        statusName = "Cancelled";
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
      setAppointmentToDelete(null);
      setShowConfirmModal(false);
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

  return (
    <>
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
            alt={`${appointment.title} ${appointment.doctorFullName}`}
            className="w-20 h-20 rounded-full bg-white object-cover border border-dashed border-cyan-500 p-1 text-center"
          />
          {doctor?.title} {appointment.doctorFullName}
        </td>
        <td className="text-center">
          {format(appointment.appointmentDate, "yyyy-MM-dd")}
        </td>
        <td className="text-center">{format(appointmentTime, "HH:mm")}</td>
        <td className="text-center">{getStatus(appointment.status)}</td>
        {useStatus === 1 || useStatus === 0 ? (
          <td className="text-center">
            <button
              onClick={() => handleDelete(appointment.id)}
              className=" text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex justify-center items-center px-3 py-2.5 text-center mr-2">
              <MdCancel className="mr-2" />
              Cancel
            </button>
          </td>
        ) : (
          ""
        )}
      </tr>
      {showConfirmModal && (
        <div>
          <ConfirmDeleteAppointment
            onClose={() => setShowConfirmModal(false)}
            onConfirm={handleDeleteConfirm}
            message="Are you sure you want to cancel this appointment?"
          />
        </div>
      )}
    </>
  );
};

export default AppointmentList;
