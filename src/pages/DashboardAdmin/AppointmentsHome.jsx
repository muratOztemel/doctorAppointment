import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  setAppointmentId,
  setSortField,
  setSortOrder,
  setSearchTerm,
  setFilter,
} from "../../redux/slices/tableAppointmentsSlice.js";
import { useGetAppointmentsPageQuery } from "../../redux/features/api/apiSlice.js";
import Card from "../../components/UI/Cards/Card.jsx";
import { PiUsers } from "react-icons/pi";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import ModalStatusAppointment from "../../components/UI/Modal/ModalStatusAppointment.jsx";
import TitleCard from "../../components/UI/Cards/TitleCard.jsx";
import { format } from "date-fns";

const AppointmentsHome = () => {
  const [page, setPage] = useState(1);
  const [isShowError, setIsShowError] = useState(false);
  const [status, setStatus] = useState("");

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
    page,
    searchTerm,
    sortField,
    sortOrder,
    filter,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const sortedAppointments = appointments?.length
    ? [...appointments].sort((a, b) => {
        if (sortField === "birthdate") {
          const dateA = new Date(a.birthDate);
          const dateB = new Date(b.birthDate);
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        } else {
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

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
    setPage(1);
  };

  const handleReset = () => {
    dispatch(setSearchTerm(""));
    dispatch(setSortField(""));
    dispatch(setSortOrder("asc"));
    setPage(1);
  };

  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"A P P O I N T M E N T S"} />
        <Card
          title={"Appointment List"}
          icon={<PiUsers />}
          color={"cyan"}
          className="mt-5">
          <div className="flex items-center gap-2 mt-5">
            <input
              type="text"
              placeholder='Search "Appointments"'
              className="h-14 text-sm rounded-md bg-gray-100 border border-border px-4 focus:outline-none flex-grow"
              onChange={handleSearch}
              value={searchTerm}
            />
            <button
              onClick={handleReset}
              className="h-14 bg-green-300 rounded-md text-white hover:bg-green-600 px-4">
              RESET
            </button>
          </div>
          <div className="mt-8 w-full overflow-x-scroll">
            <div>
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
                      onClick={() => handleSort("branchName")}
                      className="cursor-pointer hover:bg-cyan-300">
                      Branch{" "}
                      {sortField === "branchName"
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
                      onClick={() => handleSort("appointmentDate")}
                      className="cursor-pointer hover:bg-cyan-300">
                      Date{" "}
                      {sortField === "appointmentDate"
                        ? sortOrder === "asc"
                          ? "↓"
                          : "↑"
                        : ""}
                    </th>
                    <th
                      onClick={() => handleSort("appointmentTime")}
                      className="cursor-pointer hover:bg-cyan-300">
                      Time{" "}
                      {sortField === "appointmentTime"
                        ? sortOrder === "asc"
                          ? "↓"
                          : "↑"
                        : ""}
                    </th>
                    <th
                      onClick={() => handleSort("status")}
                      className="cursor-pointer hover:bg-cyan-300">
                      Status{" "}
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
                        {appointment.branchName}
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
                            Canceled
                          </span>
                        ) : (
                          <span className="py-1 px-4 bg-red-300 text-red-500 bg-opacity-10 text-xs rounded-xl">
                            Finished
                          </span>
                        )}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {format(new Date(appointment.createdAt), "MM/dd/yyyy")}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        <div className="flex justify-end">
                          <Link
                            to={`/dashboard/admin/appointment/${appointment.id}/${appointment.patientId}/${appointment.patientFullName}`}
                            onClick={() => {
                              dispatch(setAppointmentId(appointment.id));
                              // Make sure setPatientId action is imported and defined correctly
                              // dispatch(setPatientId(appointment.patientId));
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
                            onClick={() => {
                              dispatch(setAppointmentId(appointment.id));
                              setIsShowError(true);
                              setStatus("cancel");
                            }}
                            className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            <img
                              src="/images/delete.png"
                              alt="reject"
                              className="h-4 mr-2"
                            />
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination Controls */}
              {isFetching ? (
                <div>Loading...</div>
              ) : (
                <div className="flex justify-center m-4">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <FaArrowLeftLong className="w-3.5 h-3.5 me-2" />
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(page + 1)}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                    <FaArrowRightLong className="w-3.5 h-3.5 ms-2" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
      {isShowError && (
        <ModalStatusAppointment
          setIsShowError={setIsShowError}
          isShowError={isShowError}
          changeStatus={status}
          message={`Are you sure you want to change the appointment to ${status}?`}
        />
      )}
    </>
  );
};

export default AppointmentsHome;
