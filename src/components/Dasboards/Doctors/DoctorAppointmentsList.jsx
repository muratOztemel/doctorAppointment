import { useState } from "react";
import { useGetByDoctorAndDateQuery } from "../../../redux/features/api/apiSlice";
import ListAppointments from "./ListAppointments";

const DoctorAppointmentsList = ({ doctorId }) => {
  const [showPastAppointments, setShowPastAppointments] = useState(false);

  const {
    data: appointments,
    isLoading,
    isError,
  } = useGetByDoctorAndDateQuery(
    { doctorId },
    {
      skip: !doctorId,
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading appointment lists. Please try again later.</p>;
  }

  const filterAppointments = (appointmentDate, isFuture) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
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
    <div className="my-6 w-full h-full gap-7 flex flex-col">
      <div className="flex justify-center items-center mb-4">
        <button
          onClick={() => setShowPastAppointments(!showPastAppointments)}
          className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-700">
          {showPastAppointments
            ? "Show Future Appointments"
            : "Show Past Appointments"}
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="bg-cyan-50">
            <tr>
              <th className="text-center p-2">Patient</th>
              <th className="text-center p-2">Date</th>
              <th className="text-center p-2">Time</th>
              <th className="text-center p-2">Status</th>
              <th className="text-center p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {!showPastAppointments &&
              futureAppointments?.length > 0 &&
              futureAppointments.map((appointment) => (
                <ListAppointments
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            {showPastAppointments &&
              pastAppointments?.length > 0 &&
              pastAppointments.map((appointment) => (
                <ListAppointments
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
          </tbody>
        </table>
      </div>
      {!showPastAppointments && futureAppointments?.length === 0 && (
        <p className="text-center text-xl text-gray-500">
          No future appointments found.
        </p>
      )}
      {showPastAppointments && pastAppointments?.length === 0 && (
        <p className="text-center text-xl text-gray-500">
          No past appointments found.
        </p>
      )}
    </div>
  );
};

export default DoctorAppointmentsList;
