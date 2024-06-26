import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetByDoctorAndDateQuery } from "../../redux/features/api/apiSlice";
import Card from "../UI/Cards/Card";
import ListAppointments from "./ListAppointments";
import { FaUserInjured } from "react-icons/fa6";

const DoctorAppointmentList = () => {
  const [showPastAppointments, setShowPastAppointments] = useState(false);
  const { doctorId } = useSelector((state) => state.doctors);
  const selectedDate = new Date().toISOString().split("T")[0]; // Set the selected date to today

  const {
    data: appointments,
    isLoading,
    isError,
  } = useGetByDoctorAndDateQuery(
    { doctorId, date: selectedDate },
    {
      skip: !doctorId,
    }
  );

  // Show loading state if either doctor or branch data is still loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Show error state if there's an error loading doctor or branch data
  if (isError) {
    return <p>Error loading appointment lists. Please try again later.</p>;
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
    <Card
      title={"My Calendar"}
      icon={<FaUserInjured />}
      color={"cyan"}
      className={"mb-6"}>
      <div className="my-6 w-full h-full gap-7 flex flex-col">
        <div className="flex justify-center items-center mb-4">
          <button
            onClick={() => setShowPastAppointments(!showPastAppointments)}
            className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-700">
            {showPastAppointments
              ? "Show Future Appointments"
              : "Appointments History"}
          </button>
        </div>

        <table className="table-auto w-full">
          <thead className="bg-cyan-50 rounded-md overflow-hidden">
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
            {showPastAppointments ? (
              pastAppointments?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No past appointments found.
                  </td>
                </tr>
              ) : (
                pastAppointments?.map((appointment) => (
                  <ListAppointments
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))
              )
            ) : futureAppointments?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No future appointments found.
                </td>
              </tr>
            ) : (
              futureAppointments?.map((appointment) => (
                <ListAppointments
                  key={appointment.id}
                  appointment={appointment}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default DoctorAppointmentList;
