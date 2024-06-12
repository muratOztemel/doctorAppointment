import { useGetByDoctorAndDateQuery } from "../../../redux/features/api/apiSlice";
import ListPatients from "./ListPatients";

const DoctorPatientList = ({ doctorId }) => {
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

  console.log(appointments);

  // Helper function to filter out duplicate patients
  const filterUniquePatients = (appointments) => {
    const uniquePatients = new Map();
    appointments.forEach((appointment) => {
      if (!uniquePatients.has(appointment.patientId)) {
        uniquePatients.set(appointment.patientId, appointment);
      }
    });
    return Array.from(uniquePatients.values());
  };

  const uniqueAppointments = appointments
    ? filterUniquePatients(appointments)
    : [];

  // Show loading state if either doctor or branch data is still loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Show error state if there's an error loading doctor or branch data
  if (isError) {
    return <p>Error loading patient lists. Please try again later.</p>;
  }

  return (
    <div className="w-full">
      <table className="table-auto w-full">
        <thead className="bg-cyan-50 rounded-md overflow-hidden">
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Blood Group</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {uniqueAppointments.map((appointment, index) => (
            <ListPatients
              key={appointment.id}
              appointment={appointment}
              index={index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorPatientList;
