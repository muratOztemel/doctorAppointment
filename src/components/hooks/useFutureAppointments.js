import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetAppointmentsByPatientAndDateQuery } from "../../redux/features/api/apiSlice";
import { format } from "date-fns";

const useFutureAppointments = () => {
  const { patientId } = useSelector((state) => state.patient);

  const {
    data: appointments = [],
    isLoading,
    isError,
  } = useGetAppointmentsByPatientAndDateQuery({ patientId });

  const [futureAppointments, setFutureAppointments] = useState([]);

  useEffect(() => {
    if (appointments.length > 0) {
      const now = new Date();

      const filterFutureAppointments = appointments.filter((appointment) => {
        const appointmentDate = new Date(
          `${format(appointment.appointmentDate, "yyyy-MM-dd")}T${
            appointment.appointmentTime
          }`
        );
        return appointmentDate > now;
      });

      setFutureAppointments(filterFutureAppointments);
    }
  }, [appointments]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFutureAppointments((prevAppointments) => {
        return prevAppointments.map((appointment) => {
          const appointmentDate = new Date(
            `${format(appointment.appointmentDate, "yyyy-MM-dd")}T${
              appointment.appointmentTime
            }`
          );
          const timeLeft = appointmentDate - new Date();
          return { ...appointment, timeLeft };
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [appointments]);

  return { futureAppointments, isLoading, isError };
};

export default useFutureAppointments;
