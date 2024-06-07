import PropTypes from "prop-types";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const ShowNotifications = ({ appointment }) => {
  // Tarih ve zaman string'lerini doğru formatta birleştirme ve Date nesnesine dönüştürme
  const appointmentDateTimeString = `${appointment.appointmentDate.substring(
    0,
    10
  )}T${appointment.appointmentTime}`;
  const appointmentDate = new Date(appointmentDateTimeString);

  return (
    <Link
      to={`/dashboard/doctor/visiting/${appointment.patientId}/${appointment.id}/${appointment.patientFullName}`}
      className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white">
        <span>{appointment.patientFullName.charAt(0)}</span>
      </div>
      <p className="text-gray-600 text-sm mx-2">
        <span className="font-bold">{appointment.patientFullName}</span> has an
        appointment on{" "}
        <span className="font-bold">
          {format(appointmentDate, "dd/MM/yyyy")}
        </span>{" "}
        at <span className="font-bold">{format(appointmentDate, "HH:mm")}</span>
      </p>
    </Link>
  );
};

ShowNotifications.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    patientFullName: PropTypes.string.isRequired,
    appointmentDate: PropTypes.string.isRequired,
    appointmentTime: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShowNotifications;
