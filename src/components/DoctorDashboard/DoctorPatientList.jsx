import { useSelector } from "react-redux";
import { useGetByDoctorAndDateQuery } from "../../redux/features/api/apiSlice";
import Card from "../UI/Cards/Card";
import ListPatients from "./ListPatients";
import { FaUserInjured } from "react-icons/fa6";

const DoctorPatientList = () => {
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
    <Card
      title={"My Patients"}
      icon={<FaUserInjured />}
      color={"cyan"}
      className={"mb-6"}>
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
              <th>Language</th>
              <th>Phone Number</th>
              <th>Created Date</th>
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
    </Card>
  );
};

export default DoctorPatientList;
