import useFutureAppointments from "../hooks/useFutureAppointments";
import { format } from "date-fns";

const FutureAppointments = () => {
  const { futureAppointments, isLoading, isError } = useFutureAppointments();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading appointments.</p>;
  }

  return (
    <div className="flex justify-center items-center bg-green-400 mb-6 p-2 text-white rounded gap-4">
      <h2>Future Appointments > </h2>
      {futureAppointments.length === 0 ? (
        <p>No future appointments found.</p>
      ) : (
        futureAppointments.map((appointment) => {
          const timeLeft = Math.max(appointment.timeLeft / 1000, 0); // saniye cinsinden kalan süre
          const hours = Math.floor(timeLeft / 3600);
          const minutes = Math.floor((timeLeft % 3600) / 60);
          const seconds = Math.floor(timeLeft % 60);

          return (
            <div key={appointment.id} className="flex items-center gap-4">
              <p>Doctor: {appointment.doctorFullName}</p>
              <p>
                <strong>
                  Appointment on{" "}
                  {format(appointment.appointmentDate, "yyyy-MM-dd")} at{" "}
                  {appointment.appointmentTime}
                </strong>
              </p>
              <p>
                Time left: {hours}h {minutes}m {seconds}s
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default FutureAppointments;
