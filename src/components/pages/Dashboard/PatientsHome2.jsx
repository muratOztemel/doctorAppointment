import { useState, useEffect } from "react";
import Card from "../../UI/Cards/Card";
import LeftSide from "../../Layout/Dashboard/LeftSide";
import MainHeader from "../../Layout/Dashboard/MainHeader";
import axios from "axios";

import { PiUsers } from "react-icons/pi";
import PatientsDashboard from "../../Layout/Dashboard/PatientsDashboard";
import SearchPatients from "../../Dasboards/Patients/SearchPatients";
import TablePage from "./Table/TablePage";

const PatientsHome = () => {
  const [appointments, setAppointments] = useState(null);
  const [patients, setPatients] = useState([]);
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    getData();
  }, [query]);

  const getData = async () => {
    try {
      const [resAppointments, resPatients] = await Promise.all([
        axios.get("http://localhost:3001/appointments"),
        axios.get(`http://localhost:3001/patients?q=${query}`),
      ]);
      const appointmentsData = resAppointments.data;
      const patientsData = resPatients.data.splice(0, 10);
      // Sort data by date (most recent date at the top)
      const sortedAppointments = appointmentsData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });

      // Get the last 30 days
      const lastTenDaysAppointments = sortedAppointments.slice(0, 10);
      setAppointments(lastTenDaysAppointments);

      // Update patients state
      setPatients(patientsData);

      // Sort data by date (most recent date at the top)
      /*             const sortedPatients = resPatients.data.sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return dateB - dateA;
            });

            // Get the last 30 Patients
            const lastTenPatients = sortedPatients.slice(0, 10);
            setPatients(lastTenPatients); */
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  const keys = ["name", "surname", "identyNo", "email", "birthDate", "phone"];
  const genderSort = ["male", "female", "agender"];

  const search = (data, query) => {
    return data.filter((item) => {
      return keys.some((key) => {
        if (item[key] && typeof item[key] === "string") {
          return item[key].toLowerCase().includes(query.toLowerCase());
        }
        return false;
      });
    });
  };

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    try {
      const resPatients = await axios.get(
        `http://localhost:3001/patients?_sort=${value}&_order=asc`
      );
      setPatients(resPatients.data);
    } catch {
      (err) => console.log(err);
    }
  };

  const handleGenderSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    try {
      const resPatients = await axios.get(
        `http://localhost:3001/patients?_sort=${value}&_order=asc`
      );
      setPatients(resPatients.data);
    } catch {
      (err) => console.log(err);
    }
  };

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
              <PatientsDashboard />
              <Card title={"Patient List"} icon={<PiUsers />} color={"cyan"}>
                {/* <SearchPatients patients={patients} setQuery={setQuery} /> */}
                <div className="grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder='Search "Patients"'
                    className="h-14 text-sm text-main rounded-md bg-dry border border-border px-4"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <div className="text-sm relative w-full ">
                    <div className="w-full">
                      <div className="relative h-10 w-full min-w-[200px]">
                        <select
                          onChange={handleSort}
                          value={sortValue}
                          className="peer h-14 w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                          <option className="h-16">Please Select Value</option>
                          {keys.map((item, index) => {
                            return (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm relative w-full ">
                    <div className="w-full">
                      <div className="relative h-10 w-full min-w-[200px]">
                        <select
                          onChange={handleGenderSort}
                          value={sortValue}
                          className="peer h-14 w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                          <option className="h-16">Please Select Value</option>
                          {genderSort.map((item, index) => {
                            return (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm w-full flex flex-col gap-2">
                    <div className="react-datepicker-wrapper">
                      <div className="react-datepicker__input-container">
                        <input
                          type="text"
                          className="w-full bg-dry  text-xs px-4 h-14 border border-border text-main font-normal rounded-lg focus:border focus:border-subMain"
                          /* value="03/19/2024 - 03/19/2024" */
                        />
                      </div>
                    </div>
                  </div>
                  <button className="w-full flex-rows gap-4 hover:opacity-80 transitions bg-subMain text-white text-sm font-medium px-2 py-4 rounded">
                    Filter
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-white text-xl"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path>
                    </svg>
                  </button>
                </div>
                <div className="mt-8 w-full overflow-x-scroll">
                  <TablePage patients={patients} />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PatientsHome;
