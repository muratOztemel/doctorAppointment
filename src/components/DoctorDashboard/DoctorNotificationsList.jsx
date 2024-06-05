import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useGetByDoctorAndDateQuery } from "../../redux/features/api/apiSlice";
import Card from "../UI/Cards/Card";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const DoctorNotificationsList = () => {
  const { doctorId } = useSelector((state) => state.doctors);
  const [notifications, setNotifications] = useState([]);
  const selectedDate = new Date().toISOString().split("T")[0];

  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
  } = useGetByDoctorAndDateQuery(
    { doctorId, date: selectedDate },
    {
      skip: !doctorId,
    }
  );

  useEffect(() => {
    if (appointments.length > 0) {
      const futureAppointments = appointments.filter((appointment) => {
        const appointmentDateTime = `${appointment.appointmentDate.substring(
          0,
          10
        )}T${appointment.appointmentTime}`;
        const appointmentDate = new Date(appointmentDateTime);
        return appointmentDate > new Date();
      });

      setNotifications(futureAppointments);
    }
  }, [appointments]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error loading notifications:", error);
    return <div>Error loading notifications: {error.message}</div>;
  }

  return (
    <Card
      title="Notifications"
      icon={<MdOutlineNotificationsNone />}
      color="cyan"
      className="mb-6">
      {notifications.map((appointment) => (
        <Link
          to={`/dashboard/doctor/visiting/${appointment.patientId}/${appointment.id}/${appointment.patientFullName}`}
          className="flex items-center px-4 py-3 border-b hover:bg-gray-100 mt-4"
          key={appointment.id}>
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white">
            <span>{appointment.patientFullName.charAt(0)}</span>
          </div>
          <p className="text-gray-600 text-sm mx-2">
            <span className="font-bold">{appointment.patientFullName}</span> has
            an appointment on{" "}
            <span className="font-bold">
              {format(
                new Date(
                  `${appointment.appointmentDate.substring(0, 10)}T${
                    appointment.appointmentTime
                  }`
                ),
                "dd/MM/yyyy"
              )}
            </span>{" "}
            at{" "}
            <span className="font-bold">
              {format(
                new Date(
                  `${appointment.appointmentDate.substring(0, 10)}T${
                    appointment.appointmentTime
                  }`
                ),
                "HH:mm"
              )}
            </span>
          </p>
        </Link>
      ))}
    </Card>
  );
};

export default DoctorNotificationsList;
