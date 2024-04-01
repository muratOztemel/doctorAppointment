// import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Card from "../../UI/Cards/Card";
import Spinner from "../../UI/Spinner";
import RecentPatientList from "../../Dasboards/Patients/RecentPatientList";
import AppointmentList from "../../Dasboards/Appointments/AppointmentList";
import LeftSide from "../../Layout/Dashboard/LeftSide";
import MainHeader from "../../Layout/Dashboard/MainHeader";
import axios from "axios";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import LinkDashboardBar from "../../Layout/Dashboard/LinkDashboardBar";
import ChartDoctor from "../../Dasboards/Charts/ChartDoctor";
// import { fetchPatients } from "../../../redux/slices/patientsSlice";
// import { fetchAppointments } from "../../../redux/slices/appointmentsSlice";

const DashboardHome = () => {
  /*   const status = useSelector((state) => state.patients.status);
  const dispatch = useDispatch(); */
  // console.log(status);

  const [appointments, setAppointments] = useState(null);
  const [patients, setPatients] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
    /*     if (status === "idle") {
      dispatch(fetchPatients());
    } */
  }, []);

  const getData = async () => {
    try {
      const [resAppointments, resPatients, resDoctors] = await Promise.all([
        axios.get("http://localhost:3001/appointments"),
        axios.get("http://localhost:3001/patients"),
        axios.get("http://localhost:3001/doctors"),
      ]);
      setAppointments(resAppointments.data);
      setPatients(resPatients.data);
      setDoctors(resDoctors.data);

      // Sort data by date (most recent date at the top)
      const sortedAppointments = resAppointments.data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
      // Get the last 30 days
      const lastTenDaysAppointments = sortedAppointments.slice(0, 30);
      setAppointments(lastTenDaysAppointments);
      setIsLoading(false);
      // Sort data by date (most recent date at the top)
      const sortedPatients = resPatients.data.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });

      // Get the last 30 Patients
      const lastTenPatients = sortedPatients.slice(0, 10);
      setPatients(lastTenPatients);
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  return (
    <>
      {status === "loading" && <Spinner />}
      <div className="fixed z-50 inset-4 pointer-events-none"></div>
      <div className="bg-slate-50 xl:h-screen flex-col ">
        <div className="grid xl:grid-cols-12 w-full 2xl:max-w-[2000px]">
          <div className="col-span-2 xl:block hidden">
            <LeftSide />
          </div>
          <div className="col-span-10 xl:h-screen overflow-y-scroll relative">
            <MainHeader />
            <div className="xl:px-8 px-2 pt-24">
              <LinkDashboardBar
                patients={patients}
                appointments={appointments}
              />
              <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
                <div className="xl:col-span-6  w-full">
                  <Card
                    title={"Appointments with Doctor Graphic"}
                    icon={<PiUsers />}
                    color={"cyan"}>
                    <ChartDoctor
                      doctors={doctors}
                      appointments={appointments}
                    />
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

                      // If the patient cannot be found, check
                      if (!whoPatients) {
                        return null; // or an appropriate error message or action.
                      }

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
