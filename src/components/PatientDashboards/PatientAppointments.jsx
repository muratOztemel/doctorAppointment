import { TbClockRecord } from "react-icons/tb";
import Card from "../UI/Cards/Card";
import { useGetAppointmentsByPatientAndDateQuery } from "../../redux/features/api/apiSlice";
import { useSelector } from "react-redux";
import AppointmentsList from "./AppointmentsList";
import { useState } from "react";
import { format } from "date-fns";

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

  const filterAppointments = (appointmentDate, appointmentTime, isFuture) => {
    const now = new Date();

    appointmentDate = format(appointmentDate, "yyyy-MM-dd");

    // Combine appointment date and time into a single Date object
    const dateOfAppointment = new Date(`${appointmentDate}T${appointmentTime}`);

    if (isNaN(dateOfAppointment)) {
      console.error(
        "Invalid dateOfAppointment:",
        `${appointmentDate}T${appointmentTime}`
      );
      return false;
    }

    return isFuture ? dateOfAppointment > now : dateOfAppointment < now;
  };

  const futureAppointments = appointments?.filter((appointment) =>
    filterAppointments(
      appointment.appointmentDate,
      appointment.appointmentTime,
      true
    )
  );
  const pastAppointments = appointments?.filter((appointment) =>
    filterAppointments(
      appointment.appointmentDate,
      appointment.appointmentTime,
      false
    )
  );

  return (
    <Card
      title={"My Appointments"}
      icon={<TbClockRecord />}
      color={"cyan"}
      className={"mb-6"}>
      <div className="my-6 w-full h-full gap-7 flex flex-col">
        <div className="flex justify-center">
          <button
            onClick={() => setShowPastAppointments(!showPastAppointments)}
            className="px-4 py-2 bg-cyan-500 text-white rounded text-center">
            {showPastAppointments
              ? "Show Future Appointments"
              : "Appointments History"}
          </button>
        </div>
        <div className="flex flex-col gap-7">
          {showPastAppointments ? (
            <>
              <table className="table-auto w-full">
                <thead className="bg-cyan-50 rounded-md overflow-hidden">
                  <tr>
                    <th>Branch</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pastAppointments?.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No past appointments found.
                      </td>
                    </tr>
                  ) : (
                    pastAppointments.map((appointment) => (
                      <AppointmentsList
                        key={appointment.id}
                        appointment={appointment}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <table className="table-auto w-full">
                <thead className="bg-cyan-50 rounded-md overflow-hidden">
                  <tr>
                    <th>Branch</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {futureAppointments?.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No future appointments found.
                      </td>
                    </tr>
                  ) : (
                    futureAppointments.map((appointment) => (
                      <AppointmentsList
                        key={appointment.id}
                        appointment={appointment}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PatientAppointments;
