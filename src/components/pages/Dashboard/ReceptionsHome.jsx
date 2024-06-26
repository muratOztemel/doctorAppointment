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

const ReceptionsHome = () => {
  const [appointments, setAppointments] = useState(null);
  const [patients, setPatients] = useState(null);

  useEffect(() => {}, []);

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
export default ReceptionsHome;
