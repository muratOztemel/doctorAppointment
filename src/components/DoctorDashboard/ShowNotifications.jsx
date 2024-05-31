import { useGetPatientByIdQuery } from "../../redux/features/api/apiSlice";

const ShowNotifications = ({ appointment }) => {
  const {
    data: patient,
    isLoading,
    isError,
    error,
  } = useGetPatientByIdQuery(appointment.patientId, {
    skip: !appointment.patientId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !patient) {
    console.error("Error loading patient data:", error);
    return <div>Error loading patient data</div>;
  }

  return (
    <a
      href="#"
      className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
      <img
        className="h-8 w-8 rounded-full object-cover mx-1"
        src={patient.photo}
        alt="avatar"
      />
      <p className="text-gray-600 text-sm mx-2">
        {appointment.type === "appointment" ? (
          <>
            <span className="font-bold">{appointment.patientFullName}</span> has
            an appointment on{" "}
            <span className="font-bold">{appointment.appointmentDate}</span> at{" "}
            <span className="font-bold">{appointment.appointmentTime}</span>
          </>
        ) : (
          <>
            <span className="font-bold">{appointment.patientFullName}</span> has
            a birthday on <span className="font-bold">{patient.birthDate}</span>
          </>
        )}
      </p>
    </a>
  );
};

export default ShowNotifications;
