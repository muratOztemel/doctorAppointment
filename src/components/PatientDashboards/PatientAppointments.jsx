import { TbClockRecord } from "react-icons/tb";
import Card from "../UI/Cards/Card";
import { useGetAppointmentsByPatientAndDateQuery } from "../../redux/features/api/apiSlice";
import { useSelector } from "react-redux";
import AppointmentsList from "./AppointmentsList";
import { useState } from "react";

const PatientAppointments = () => {
  const [showPastAppointments, setShowPastAppointments] = useState(false);
  const { patientId } = useSelector((state) => state.patient);
  const {
    data: appointments,
    isLoading,
    isError,
  } = useGetAppointmentsByPatientAndDateQuery({ patientId });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading appointments.</p>;
  }

  const filterAppointments = (appointmentDate, isFuture) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to midnight for accurate comparison
    const dateOfAppointment = new Date(appointmentDate);
    return isFuture ? dateOfAppointment > today : dateOfAppointment < today;
  };

  const futureAppointments = appointments?.filter((appointment) =>
    filterAppointments(appointment.appointmentDate, true)
  );
  const pastAppointments = appointments?.filter((appointment) =>
    filterAppointments(appointment.appointmentDate, false)
  );

  return (
    <>
      <Card
        title={"My Appointments"}
        icon={<TbClockRecord />}
        color={"cyan"}
        className={"mb-6"}>
        <div className="my-6 w-full h-full gap-7 flex flex-col">
          <div className="flex justify-end">
            <button
              onClick={() => setShowPastAppointments(!showPastAppointments)}>
              {showPastAppointments
                ? "Show Future Appointments"
                : "Appointments History"}
            </button>
          </div>
          {!showPastAppointments && (
            <div className="flex flex-col gap-7">
              {futureAppointments?.length === 0 ? (
                <p>No future appointments found.</p>
              ) : (
                <>
                  <p className="flex justify-center items-center text-3xl">
                    Future Appointments
                  </p>
                  {futureAppointments.map((appointment) => (
                    <AppointmentsList
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}
                </>
              )}
            </div>
          )}
          {showPastAppointments && (
            <div className="flex flex-col gap-7">
              {pastAppointments?.length === 0 ? (
                <p>No past appointments found.</p>
              ) : (
                <>
                  <p className="flex justify-center items-center text-3xl">
                    History of Appointments
                  </p>
                  {pastAppointments.map((appointment) => (
                    <AppointmentsList
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default PatientAppointments;
