import { TbClockRecord } from "react-icons/tb";
import Card from "../UI/Cards/Card";
import { useGetAppointmentsByPatientAndDateQuery } from "../../redux/features/api/apiSlice";
import { useSelector } from "react-redux";
import AppointmentList from "./AppointmentList";

const PatientAppointments = () => {
  const { patientId } = useSelector((state) => state.patient);
  const {
    data: appointments,
    isLoading,
    isError,
  } = useGetAppointmentsByPatientAndDateQuery({ patientId });

  return (
    <Card
      title={"My Appointments"}
      icon={<TbClockRecord />}
      color={"cyan"}
      className={"mb-6"}>
      <div className="relative my-6 max-w-md mx-auto h-full gap-7 flex flex-col">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading appointments.</p>}
        {appointments?.length === 0 && <p>No appointments found.</p>}
        {appointments?.map((appointment) => (
          <AppointmentList key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </Card>
  );
};

export default PatientAppointments;
