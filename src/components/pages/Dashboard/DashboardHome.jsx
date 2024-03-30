import {
  useGetPatientsQuery,
  useGetAppointmentsQuery,
} from "../../../redux/features/api/apiSlice.js";
import Card from "../../UI/Cards/Card";
import Spinner from "../../UI/Spinner";
import RecentPatientList from "../../Dasboards/Patients/RecentPatientList";
import AppointmentList from "../../Dasboards/Appointments/AppointmentList";
import LeftSide from "../../Layout/Dashboard/LeftSide";
import MainHeader from "../../Layout/Dashboard/MainHeader";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import LinkDashboardBar from "../../Layout/Dashboard/LinkDashboardBar";
import ChartDoctors from "../../Dasboards/Charts/ChartDoctors";

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
  if (patientsLoading || appointmentsLoading) return <div>Loading...</div>;
  // Hata durumu kontrolü
  if (patientsError) return <div>Error: {patientsError.toString()}</div>;
  if (appointmentsError)
    return <div>Error: {appointmentsError.toString()}</div>;

  return (
    <>
      <div className="fixed z-50 inset-4 pointer-events-none"></div>
      <div className="bg-slate-50 xl:h-screen flex-col ">
        <div className="grid xl:grid-cols-12 w-full 2xl:max-w-[2000px]">
          <div className="col-span-2 xl:block hidden">
            <LeftSide />
          </div>
          <div className="col-span-10 xl:h-screen overflow-y-scroll relative">
            <MainHeader />
            <div className="xl:px-8 px-2 pt-24">
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
                  <Card
                    title={"Recent Patients"}
                    icon={<PiUsers />}
                    className="mt-4">
                    <RecentPatientList />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardHome;
