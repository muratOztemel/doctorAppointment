import { useState, useEffect } from "react";
import Card from "../../UI/Cards/Card";
import PatientList from "../../Dasboards/Patients/PatientList";
import RecentPatientList from "../../Dasboards/Patients/RecentPatientList";
import AppointmentList from "../../Dasboards/Appointments/AppointmentList";
import LeftSide from "../../Layout/Dashboard/LeftSide";
import MainHeader from "../../Layout/Dashboard/MainHeader";
import axios from "axios";
import { IoDocumentTextOutline } from "react-icons/io5";

import { PiUsers } from "react-icons/pi";
import LinkDashboardBar from "../../Layout/Dashboard/LinkDashboardBar";

const MedicineHome = () => {
  const [appointments, setAppointments] = useState(null);
  const [patients, setPatients] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3004/appointments")
      .then((resAppointments) => {
        setAppointments(resAppointments.data);
        // Sort data by date (most recent date at the top)
        const sortedAppointments = resAppointments.data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });

        // Get the last 30 days
        const lastTenDaysAppointments = sortedAppointments.slice(0, 10);
        setAppointments(lastTenDaysAppointments);
        axios
          .get("http://localhost:3004/patients")
          .then((resPatients) => {
            setPatients(resPatients.data);
            // Sort data by date (most recent date at the top)
            /*             const sortedPatients = resPatients.data.sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return dateB - dateA;
            });

            // Get the last 30 Patients
            const lastTenPatients = sortedPatients.slice(0, 10);
            setPatients(lastTenPatients); */
          })
          .catch((err) => console.log("Patients data is mistake!", err));
      })
      .catch((err) => console.log("Appointments data is mistake!", err));
  }, []);

  if (appointments === null || patients === null) {
    return (
      <div className="flex items-center justify-center align-middle">
        <img
          className="w-20 h-20 animate-spin"
          src="/loading.png"
          alt="Loading icon"
        />
      </div>
    );
  }
  return (
    <div>
      <div className="fixed z-50 inset-4 pointer-events-none" />
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
                    title={"Patient List"}
                    icon={<PiUsers />}
                    color={"cyan"}>
                    <div className="mt-4">
                      <table className="table-auto w-full">
                        <thead className="bg-cyan-50 rounded-md overflow-hidden">
                          <tr>
                            <th className="text-start text-sm font-medium py-3 px-2 whitespace-nowrap">
                              #
                            </th>
                            <th className="text-start text-sm font-medium py-3 px-2 whitespace-nowrap">
                              Patient
                            </th>
                            <th className="text-start text-sm font-medium py-3 px-2 whitespace-nowrap">
                              Language
                            </th>
                            <th className="text-start text-sm font-medium py-3 px-2 whitespace-nowrap">
                              Created At
                            </th>
                            <th className="text-start text-sm font-medium py-3 px-2 whitespace-nowrap">
                              Gender
                            </th>
                            <th className="text-start text-sm font-medium py-3 px-2 whitespace-nowrap">
                              Age
                            </th>
                            <th className="text-start text-sm font-medium py-3 px-2 whitespace-nowrap">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {patients.map((patient) => (
                            <PatientList key={patient.id} {...patient} />
                          ))}
                        </tbody>
                      </table>
                    </div>
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
                    <RecentPatientList />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MedicineHome;
