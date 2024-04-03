import {
  useGetPatientsQuery,
  useGetAppointmentsQuery,
} from "../../../redux/features/api/apiSlice.js";
import Card from "../../UI/Cards/Card";
import Spinner from "../../UI/Spinner";
import RecentPatientList from "../../Dasboards/Patients/RecentPatientList";
import AppointmentList from "../../Dasboards/Appointments/AppointmentList";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import LinkDashboardBar from "../../Layout/Dashboard/LinkDashboardBar";
import ChartDoctors from "../../Dasboards/Charts/ChartDoctors";
import AddNewPatient from "../../Dasboards/Patients/AddNewPatient.jsx";
import Login from "../../Form/login/Login";
import RegisterForm from "../../Form/register/RegisterForm.jsx";

const DashboardHome = () => {
  const {
    data: patients,
    error: patientsError,
    isLoading: patientsLoading,
  } = useGetPatientsQuery();
  const {
    data: appointmentsData,
    error: appointmentsError,
    isLoading: appointmentsLoading,
  } = useGetAppointmentsQuery();

  const appointments = appointmentsData?.appointments ?? [];
  // Yükleme durumu kontrolü
  if (patientsLoading || appointmentsLoading) return <Spinner />;
  // Hata durumu kontrolü
  if (patientsError) return <div>Error: {patientsError.toString()}</div>;
  if (appointmentsError)
    return <div>Error: {appointmentsError.toString()}</div>;

  return (
    <>
      <div className="xl:px-8 px-2 pt-24">
        <div className="flex items-center text-center gap-4 mb-6">
          <div className=" flex gap-4 bg-white border border-cyan-500 border-dashed rounded-lg py-3 px-4 text-md w-full">
            <div className="p-3">
              <p className="flex justify-center items-center bg-white border border-cyan-500 border-dashed rounded-lg p-2 w-[50px] h-[50px]">
                <img
                  src="/images/icons/fast-forward.png"
                  alt="Administrator"
                  className=""
                />
              </p>
            </div>
            <div className="p-5">
              <h1 className="text-3xl font-semibold text-slate-500">
                A D M I N I S T R A T O R
              </h1>
            </div>
          </div>
        </div>
        <LinkDashboardBar />
        <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
          <div className="xl:col-span-6  w-full">
            <Card
              title={"Appointments with Doctor Graphic"}
              icon={<PiUsers />}
              color={"cyan"}>
              <ChartDoctors />
            </Card>
          </div>
          <div className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6 aos-init aos-animate">
            <Card
              title={"Last Appointments"}
              icon={<IoDocumentTextOutline />}
              color={"yellow"}>
              {appointments.map((appointment) => {
                const whoPatients = patients.find(
                  (patient) => patient.id === appointment.patientId
                );

                return (
                  <AppointmentList
                    key={appointment.id}
                    {...appointment}
                    name={whoPatients.name}
                    surname={whoPatients.surname}
                  />
                );
              })}
            </Card>
            <Card title={"Recent Patients"} icon={<PiUsers />} className="mt-4">
              <RecentPatientList />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardHome;
