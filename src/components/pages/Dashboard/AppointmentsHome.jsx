import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  setAppointmentId,
  setSortField,
  setSortOrder,
  setSearchTerm,
  setFilter,
} from "../../../redux/slices/tableAppointmentsSlice.js";
import { useGetAppointmentsPageQuery } from "../../../redux/features/api/apiSlice.js";
import Card from "../../UI/Cards/Card.jsx";
import { PiUsers } from "react-icons/pi";
import Modal from "../../UI/Modal.jsx";
import AppointmentsDashboardBar from "../../Layout/Dashboard/AppointmentsDashboardBar.jsx";
import { format } from "date-fns";
import { setPatientId } from "../../../redux/slices/tablePatientsSlice.js";

const AppointmentsHome = () => {
  const [appointmentsPage, setAppointmentsPage] = useState(1);

  const dispatch = useDispatch();
  const { sortField, sortOrder, searchTerm, filter } = useSelector(
    (state) => state.tableAppointments
  );

  const {
    data: appointments,
    error,
    isFetching,
    isLoading,
  } = useGetAppointmentsPageQuery({
    page: appointmentsPage,
    searchTerm,
    sortField,
    sortOrder,
    filter,
  });
  /*   const {
    data: doctorsData,
    error: appointmentsError,
    isLoading: appointmentsLoading,
  } = useGetDoctorByIdQuery(doctorId); */

  /*   useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 1 &&
        !isFetching
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]); */

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  /*   const sortedPatients = [...patients].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  }); */

  const sortedAppointments = appointments?.length
    ? [...appointments].sort((a, b) => {
        // Tarih alanı için özel karşılaştırma
        if (sortField === "birthdate") {
          // Tarih string'lerini Date objelerine dönüştür
          const dateA = new Date(a.birthDate);
          const dateB = new Date(b.birthDate);
          // Tarihleri karşılaştır
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        } else {
          // Diğer alanlar için genel karşılaştırma
          if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
          if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      })
    : [];

  const filteredAndSortedAppointments = sortedAppointments.filter(
    (appointment) => appointment.id
  );

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    dispatch(setSortField(field));
    dispatch(setSortOrder(order));
  };

  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const day = date.getDate().toString().padStart(2, "0"); // Günü al ve iki basamaklı yap
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ayı al (0'dan başladığı için 1 ekliyoruz) ve iki basamaklı yap
    const year = date.getFullYear(); // Yılı al
    return `${day}.${month}.${year}`; // Formatı DD.MM.YYYY olarak döndür
  }

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
    setAppointmentsPage(1); // Arama yapıldığında sayfayı sıfırla!
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
    setAppointmentsPage(1); // Filter yapıldığında sayfayı sıfırla!
  };

  return (
    <>
      <div className="xl:px-8 px-2 pt-24">
        <div className="flex items-center text-center gap-4">
          <div className=" flex gap-4 bg-white border border-cyan-500 border-dashed rounded-lg py-3 px-4 text-md w-full">
            <div className="p-3 w-[70px]">
              <p className="bg-white border border-cyan-500 border-dashed rounded-lg text-3xl p-2">
                {">"}
              </p>
            </div>
            <div className="p-5">
              <h1 className="text-3xl font-semibold text-slate-500">
                A P P O I N T M E N T S
              </h1>
            </div>
          </div>
        </div>
        <AppointmentsDashboardBar />
        <Card title={"Appointment List"} icon={<PiUsers />} color={"cyan"}>
          <div className="grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 mt-6">
            <input
              type="text"
              placeholder='Search "Appointments"'
              className="h-14 text-sm rounded-md bg-dry border border-border px-4"
              onChange={handleSearch}
            />
            <div className="text-sm relative w-full ">
              <div className="w-full">
                <div className="relative h-10 w-full min-w-[200px]">
                  <button
                    onClick={() => setAppointmentsPage(1)}
                    className="w-full h-14 bg-green-300 rounded-md text-white hover:bg-green-600">
                    RESET
                  </button>
                </div>
              </div>
            </div>
            <div className="text-sm relative w-full ">
              <div className="w-full">
                <div className="relative h-10 w-full min-w-[200px]">
                  <select
                    onChange={handleFilterChange}
                    className="bg-slate-500 text-white  peer h-14 w-full rounded-[7px] p-3">
                    <option value="">All Blood Groups</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="text-sm relative w-full ">
              <div className="w-full">
                <div className="relative h-10 w-full min-w-[200px]">
                  <select
                    onChange={handleFilterChange}
                    className="bg-slate-700 text-white  peer h-14 w-full rounded-[7px] p-3">
                    <option value="">Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Agender">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 w-full overflow-x-scroll">
            {/* <TablePage patients={patients} /> */}
            <div>
              {/* Search and Filter Inputs */}
              <table className="table-auto w-full">
                <thead className="bg-cyan-50 rounded-md overflow-hidden">
                  <tr>
                    <th
                      onClick={() => handleSort("id")}
                      className="cursor-pointer hover:bg-cyan-300">
                      #{" "}
                      {sortField === "id"
                        ? sortOrder === "asc"
                          ? "↓"
                          : "↑"
                        : ""}
                    </th>
                    <th
                      onClick={() => handleSort("doctorId")}
                      className="cursor-pointer hover:bg-cyan-300">
                      Doctor{" "}
                      {sortField === "doctorId"
                        ? sortOrder === "asc"
                          ? "↓"
                          : "↑"
                        : ""}
                    </th>
                    <th
                      onClick={() => handleSort("patientId")}
                      className="cursor-pointer hover:bg-cyan-300">
                      Patient{" "}
                      {sortField === "patientId"
                        ? sortOrder === "asc"
                          ? "↓"
                          : "↑"
                        : ""}
                    </th>
                    <th
                      onClick={() => handleSort("apointmentDate")}
                      className="cursor-pointer hover:bg-cyan-300">
                      Date{" "}
                      {sortField === "apointmentDate"
                        ? sortOrder === "asc"
                          ? "↓"
                          : "↑"
                        : ""}
                    </th>
                    <th
                      onClick={() => handleSort("apointmentTime")}
                      className="cursor-pointer hover:bg-cyan-300">
                      Time{" "}
                      {sortField === "apointmentTime"
                        ? sortOrder === "asc"
                          ? "↓"
                          : "↑"
                        : ""}
                    </th>
                    <th
                      onClick={() => handleSort("status")}
                      className="cursor-pointer hover:bg-cyan-300">
                      status{" "}
                      {sortField === "status"
                        ? sortOrder === "asc"
                          ? "↓"
                          : "↑"
                        : ""}
                    </th>
                    <th
                      onClick={() => handleSort("createdAt")}
                      className="cursor-pointer hover:bg-cyan-300">
                      Created Date{" "}
                      {sortField === "createdAt"
                        ? sortOrder === "asc"
                          ? "↓"
                          : "↑"
                        : ""}
                    </th>
                    <th className="cursor-pointer hover:bg-cyan-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedAppointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {appointment.id}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {appointment.doctorFullName}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {appointment.patientFullName}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {format(
                          new Date(appointment.appointmentDate),
                          "MM/dd/yyyy"
                        )}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {appointment.appointmentTime.substring(0, 5)}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {appointment.status === 0 ? (
                          <span className="py-1 px-4 bg-cyan-300 text-cyan-500 bg-opacity-10 text-xs rounded-xl">
                            Pending
                          </span>
                        ) : appointment.status === 1 ? (
                          <span className="py-1 px-4 bg-pink-300 text-pink-500 bg-opacity-10 text-xs rounded-xl">
                            Approved
                          </span>
                        ) : appointment.status === 2 ? (
                          <span className="py-1 px-4 bg-purple-300 text-purple-500 bg-opacity-10 text-xs rounded-xl">
                            Reject
                          </span>
                        ) : (
                          <span className="py-1 px-4 bg-red-300 text-red-500 bg-opacity-10 text-xs rounded-xl">
                            Finished
                          </span>
                        )}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {formatDate(appointment.createdAt)}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        <div className="flex justify-end">
                          <Link
                            to="/appointmentProfile"
                            onClick={() => {
                              dispatch(setAppointmentId(appointment.id));
                              dispatch(setPatientId(appointment.patientId));
                            }}
                            className="w-28 h-9 text-white bg-amber-300 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            <img
                              src="/images/eye.png"
                              alt="detail"
                              className="h-7 mr-2"
                            />
                            Detail
                          </Link>
                          <button
                            to="/appointmentDelete"
                            onClick={() => {
                              // dispatch(setIsShowError());
                              dispatch(setAppointmentId(appointment.id));
                            }}
                            className="w-28 h-9 text-white bg-green-300 hover:bg-green-500 focus:ring-4 focus:ring-amber-green font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            <img
                              src="/images/delete.png"
                              alt="detail"
                              className="h-4 mr-2"
                            />
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              // dispatch(setIsShowError());
                              dispatch(setAppointmentId(appointment.id));
                            }}
                            className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            <img
                              src="/images/delete.png"
                              alt="detail"
                              className="h-4 mr-2"
                            />
                            Reject
                          </button>
                          <Modal
                            message={`Are you sure you want to delete user`}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination Controls */}
              {/*                     {!isFetching && <p>Loading more users...</p>} */}
              {isFetching ? (
                <div>Loading...</div>
              ) : (
                <div className="flex justify-center m-4">
                  <button
                    href="#"
                    onClick={() => setAppointmentsPage(page - 1)}
                    className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg
                      className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 5H1m0 0 4 4M1 5l4-4"
                      />
                    </svg>
                    Previous
                  </button>
                  <button
                    href="#"
                    onClick={() => setAppointmentsPage(page + 1)}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                    <svg
                      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
export default AppointmentsHome;
