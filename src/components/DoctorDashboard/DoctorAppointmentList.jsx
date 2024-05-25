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
                {futureAppointments?.map((appointment) => (
                  <ListAppointments
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
                  <ListAppointments
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
  );
};

export default DoctorAppointmentList;
