import useFutureAppointments from "../hooks/useFutureAppointments";

const FutureAppointments = () => {
  const { futureAppointments, isLoading, isError } = useFutureAppointments();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading appointments.</p>;
  }

  return (
    <div>
      <h2>Future Appointments</h2>
      {futureAppointments.length === 0 ? (
        <p>No future appointments found.</p>
      ) : (
        futureAppointments.map((appointment) => {
          const timeLeft = Math.max(appointment.timeLeft / 1000, 0); // saniye cinsinden kalan süre
          const hours = Math.floor(timeLeft / 3600);
          const minutes = Math.floor((timeLeft % 3600) / 60);
          const seconds = Math.floor(timeLeft % 60);

          return (
            <div key={appointment.id}>
              <p>
                Appointment on {appointment.appointmentDate} at{" "}
                {appointment.appointmentTime}
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
