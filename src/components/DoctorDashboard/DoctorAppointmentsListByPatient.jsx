import { useState } from "react";
import {
  useGetAppointmentsByPatientAndDateQuery,
  useGetPatientByIdQuery,
} from "../../redux/features/api/apiSlice";
import { format } from "date-fns";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { FaStethoscope } from "react-icons/fa";
import ConfirmDeleteAppointment from "./ConfirmDeleteAppointment";
import DefaultImage from "../hooks/DefaultImage";
import Card from "../UI/Cards/Card";
import { useSelector } from "react-redux";

const ListAppointment = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  const { id: patientId } = useParams();
  const { doctorId } = useSelector((state) => state.doctors);
  const {
    data: appointments,
    isLoading,
    isError,
  } = useGetAppointmentsByPatientAndDateQuery({ patientId });

  const {
    data: patient,
    isLoadingPatient,
    isErrorPatient,
  } = useGetPatientByIdQuery(patientId, {
    skip: !patientId, // Only run this query if we have the patient's data
  });

  console.log("patient", patient);
  console.log("Appointments:", appointments);

  if (isLoading || isLoadingPatient) {
    return <p>Loading...</p>;
  }

  if (isError || isErrorPatient) {
    return <p>Error loading appointment details. Please try again later.</p>;
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

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Confirmed";
      case 2:
        return "Finished";
      case 3:
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? "--" : format(date, "yyyy-MM-dd");
  };

  const formatTime = (timeStr) => {
    const time = new Date(`1970-01-01T${timeStr}Z`);
    return isNaN(time.getTime()) ? "--" : format(time, "HH:mm");
  };

  const filterAppointmentsByDoctor =
    appointments?.filter(
      (appointment) => appointment.doctorId === Number(doctorId)
    ) || [];

  console.log("Filtered Appointments:", filterAppointmentsByDoctor);

  return (
    <Card icon={<FaStethoscope />} title="Appointments" color="cyan">
      <div className="w-full p-4">
        <div className="flex flex-row w-full p-4 ">
          <table className="table-auto w-full">
            <thead className="bg-gray-50 rounded-md overflow-hidden">
              <tr>
                <th className="text-center">Branch</th>
                <th className="text-center">Patient</th>
                <th className="text-center">Date</th>
                <th className="text-center">Time</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filterAppointmentsByDoctor.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="text-center align-middle">
                    {appointment.branch?.name}
                  </td>
                  <td className="text-center align-middle flex flex-col justify-center items-center">
                    <img
                      src={
                        patient?.photo
                          ? DefaultImage(patient)
                          : DefaultImage("fallback-image-url")
                      }
                      alt={appointment.patientFullName}
                      onError={(e) => (e.target.src = "fallback-image-url")} // Fallback if image fails to load
                      className="w-20 h-20 rounded-full bg-white object-cover border border-dashed border-cyan-500 p-1"
                    />
                    {appointment.patientFullName}
                  </td>
                  <td className="text-center align-middle">
                    {formatDate(appointment.appointmentDate)}
                  </td>
                  <td className="text-center align-middle">
                    {formatTime(appointment.appointmentTime)}
                  </td>
                  <td className="text-center align-middle">
                    {getStatus(appointment.status)}
                  </td>
                  <td className="text-center align-middle">
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="w-32 h-12 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
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
                </tr>
              ))}
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
    </Card>
  );
};

export default ListAppointment;
