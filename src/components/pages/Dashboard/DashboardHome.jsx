import { MdOutlineNotificationsNone } from "react-icons/md";
import Card from "../../UI/Cards/Card";
import PatientList from "../../Dasboards/Patients/PatientList";
import RecentPatientList from "../../Dasboards/Patients/RecentPatientList";
import AppointmentList from "../../Dasboards/Appointment/AppointmentList";
import LeftSide from "../../Layout/Dashboard/LeftSide";

const DashboardHome = () => {
  return (
    <div>
      <div className="fixed z-50 inset-4 pointer-events-none" />
      <div className="bg-slate-50 xl:h-screen flex-col ">
        <div className="grid xl:grid-cols-12 w-full 2xl:max-w-[2000px]">
          <div className="col-span-2 xl:block hidden">
            <LeftSide />
          </div>
          <div className="col-span-10 xl:h-screen overflow-y-scroll relative">
            <div className="xl:w-5/6 w-full 2xl:max-w-[1640px] bg-slate-50 grid md:grid-cols-2 grid-cols-12 items-center bg-opacity-95 fixed top-0 z-40 xl:px-8 px-2">
              <div className="md:col-span-1 sm:col-span-11 col-span-10 flex gap-4 items-center md:py-0 py-4">
                <button className="block xl:hidden border text-2xl bg-gray-50 w-16 md:w-12 h-12 rounded-md flex-col text-gray-500 transitions hover:bg-gray-50"></button>
                <input
                  type="text"
                  placeholder='Search "Patients"'
                  className="md:w-96 w-full h-12 text-sm text-main rounded-md bg-slate-50 border border-border px-4"
                />
              </div>
              <div className="md:col-span-1 sm:col-span-1 col-span-2 items-center justify-end pr-4 md:pr-0">
                <div className="float-right flex gap-4 items-center justify-center">
                  <button>
                    <div className="relative">
                      <MdOutlineNotificationsNone className="text-2xl hover:text-red-500" />
                      <span className="absolute -top-2.5 -right-2.5 font-semibold bg-red-500 rounded-full px-1.5 py-0.5 text-xs text-white text-center">
                        5
                      </span>
                    </div>
                  </button>
                  <div className=" items-center md:flex hidden">
                    <div className="text-sm w-full relative">
                      <button
                        id="headlessui-menu-button-:r2:"
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        data-headlessui-state>
                        <div className="flex gap-4 items-center p-4 rounded-lg">
                          <img
                            src="/murat.jpeg"
                            alt="user"
                            className="w-12 border border-border object-cover h-12 rounded-full"
                          />
                          <p className="text-sm text-textGray font-medium">
                            Manager
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:px-8 px-2 pt-24">
              <div className="w-full grid xl:grid-cols-4 gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                <Card title={"title"} icon={"icon"}>
                  <div className="grid grid-cols-8 gap-4 mt-4 bg-cyan-50 py-5 px-8 items-center rounded-xl">
                    Detail
                  </div>
                </Card>
              </div>
              <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
                <div className="xl:col-span-6  w-full">
                  <Card title={"title"} icon={"icon"}>
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
                              Date
                            </th>
                            <th className="text-start text-sm font-medium py-3 px-2 whitespace-nowrap">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <PatientList></PatientList>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
                <div className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6 aos-init aos-animate">
                  <Card title={"Recent Patients"} icon={"icon"}>
                    <RecentPatientList />
                    <RecentPatientList />
                  </Card>
                  <Card
                    title={"Today Appointments"}
                    icon={"icon"}
                    className="mt-4">
                    <AppointmentList />
                    <AppointmentList />
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
export default DashboardHome;
