import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useGetAppointmentsByPatientAndDateQuery } from "../../redux/features/api/apiSlice";
import ShowNotifications from "./ShowNotifications";
import { Link } from "react-router-dom";

const PatientNotification = () => {
  const { patientId } = useSelector((state) => state.patient);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(
    parseInt(localStorage.getItem("unreadCount"), 10) || 0
  );

  const selectedDate = new Date().toISOString().split("T")[0];

  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
  } = useGetAppointmentsByPatientAndDateQuery(
    { patientId, date: selectedDate },
    {
      skip: !patientId,
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

      // İlk yüklemede unreadCount ayarlanır
      if (!localStorage.getItem("unreadCount")) {
        setUnreadCount(futureAppointments.length);
        localStorage.setItem("unreadCount", futureAppointments.length);
      }
    }
  }, [appointments]);

  const handleNotificationClick = () => {
    setIsOpen(!isOpen);
    setUnreadCount(0);
    localStorage.setItem("unreadCount", 0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error loading notifications:", error);
    return <div>Error loading notifications: {error.message}</div>;
  }

  return (
    <>
      <button onClick={handleNotificationClick} className="mr-4 mt-3">
        <div className="relative inline-flex items-center">
          <MdOutlineNotificationsNone className="text-2xl hover:text-red-500" />
          <div
            className="absolute top-0 right-0 flex justify-center items-center"
            style={{
              width: "24px",
              height: "24px",
              transform: "translate(50%, -50%)",
            }}>
            <svg
              className="w-6 h-6 fill-current text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
            </svg>
            <span className="absolute text-white text-xs font-semibold">
              {unreadCount}
            </span>
          </div>
        </div>
      </button>
      <div className="flex absolute">
        <div className="relative mr-40">
          {isOpen && (
            <>
              <div
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 h-full w-full z-10"></div>
              <div
                className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
                style={{ width: "20rem" }}>
                <div className="py-2">
                  {notifications.map((appointment) => (
                    <ShowNotifications
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}
                </div>
                <Link
                  to={"/dashboard/doctor/notifications"}
                  className="block bg-red-500 text-white text-center font-bold py-2">
                  See all notifications
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PatientNotification;
