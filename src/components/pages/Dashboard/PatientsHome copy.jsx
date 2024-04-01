import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  setSortField,
  setSortOrder,
  setSearchTerm,
  setFilter,
  setIsShowError,
} from "../../../redux/slices/tablePatientsSlice.js";
import { useGetPatientsPageQuery } from "../../../redux/features/api/apiSlice.js";

import Card from "../../UI/Cards/Card.jsx";
import LeftSide from "../../Layout/Dashboard/LeftSide.jsx";
import MainHeader from "../../Layout/Dashboard/MainHeader.jsx";

import { PiUsers } from "react-icons/pi";
import PatientsDashboard from "../../Layout/Dashboard/PatientsDashboard.jsx";
import Flags from "../../Dasboards/Flags/Flags.jsx";
import Modal from "../../UI/Modal.jsx";

const PatientsHome = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { sortField, sortOrder, searchTerm, filter, isShowError } = useSelector(
    (state) => state.tablePatients
  );

  const {
    data: patients,
    error,
    isFetching,
    isLoading,
  } = useGetPatientsPageQuery({
    page,
    searchTerm,
    sortField,
    sortOrder,
    filter,
  });

  console.log(page);

  useEffect(() => {
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
  }, [isFetching]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  /*   const sortedPatients = [...patients].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  }); */

  const sortedPatients = patients?.length
    ? [...patients].sort((a, b) => {
        // Tarih alanı için özel karşılaştırma
        if (sortField === "birthdate") {
          // Tarih string'lerini Date objelerine dönüştür
          const dateA = new Date(a.birthdate);
          const dateB = new Date(b.birthdate);
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

  const filteredAndSortedPatients = sortedPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter ? patient.bloodGroup === filter : true)
  );

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    dispatch(setSortField(field));
    dispatch(setSortOrder(order));
  };

  const ageCalculate = (ageSim) => {
    // Doğum tarihini ayrıştırma
    const birthDateArray = ageSim.split(".");
    const birthDay = parseInt(birthDateArray[0], 10);
    const birthMonth = parseInt(birthDateArray[1], 10);
    const birthYear = parseInt(birthDateArray[2], 10);

    // Bugünkü tarihi alma
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; // JavaScript'te aylar 0'dan başlar
    const currentYear = today.getFullYear();

    // Yaş hesaplama
    let age = currentYear - birthYear;
    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age--;
    }
    return age; // Yaşı döndürme
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
                    onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                  />
                  <div className="text-sm relative w-full ">
                    <div className="w-full">
                      <div className="relative h-10 w-full min-w-[200px]">
                        <select className="peer h-14 w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                          <option className="h-16">Please Select Value</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm relative w-full ">
                    <div className="w-full">
                      <div className="relative h-10 w-full min-w-[200px]">
                        <select className="peer h-14 w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                          <option className="h-16">Please Select Value</option>
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
                <div className="mt-8 w-full overflow-visible">
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
                            onClick={() => handleSort("photo")}
                            className="cursor-pointer hover:bg-cyan-300">
                            Photo{" "}
                            {sortField === "photo"
                              ? sortOrder === "asc"
                                ? "↓"
                                : "↑"
                              : ""}
                          </th>
                          <th
                            onClick={() => handleSort("name")}
                            className="cursor-pointer hover:bg-cyan-300">
                            Name{" "}
                            {sortField === "name"
                              ? sortOrder === "asc"
                                ? "↓"
                                : "↑"
                              : ""}
                          </th>
                          <th
                            onClick={() => handleSort("surname")}
                            className="cursor-pointer hover:bg-cyan-300">
                            Surname{" "}
                            {sortField === "surname"
                              ? sortOrder === "asc"
                                ? "↓"
                                : "↑"
                              : ""}
                          </th>
                          <th
                            onClick={() => handleSort("bloodGroup")}
                            className="cursor-pointer hover:bg-cyan-300">
                            Blood Group{" "}
                            {sortField === "bloodGroup"
                              ? sortOrder === "asc"
                                ? "↓"
                                : "↑"
                              : ""}
                          </th>
                          <th
                            onClick={() => handleSort("gender")}
                            className="cursor-pointer hover:bg-cyan-300">
                            Gender{" "}
                            {sortField === "gender"
                              ? sortOrder === "asc"
                                ? "↓"
                                : "↑"
                              : ""}
                          </th>
                          <th
                            onClick={() => handleSort("birthdate")}
                            className="cursor-pointer hover:bg-cyan-300">
                            Age{" "}
                            {sortField === "birthdate"
                              ? sortOrder === "asc"
                                ? "↓"
                                : "↑"
                              : ""}
                          </th>
                          <th
                            onClick={() => handleSort("language")}
                            className="cursor-pointer hover:bg-cyan-300">
                            Language{" "}
                            {sortField === "language"
                              ? sortOrder === "asc"
                                ? "↓"
                                : "↑"
                              : ""}
                          </th>
                          <th
                            onClick={() => handleSort("phoneNumber")}
                            className="cursor-pointer hover:bg-cyan-300">
                            Phone Number{" "}
                            {sortField === "phoneNumber"
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
                          <th className="cursor-pointer hover:bg-cyan-300">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAndSortedPatients.map((patient) => (
                          <tr
                            key={patient.id}
                            className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                            <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                              {patient.id}
                            </td>
                            <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                              <img
                                src={
                                  patient.photo !== null && patient.photo !== ""
                                    ? patient.photo
                                    : patient.gender === "Male"
                                    ? "/images/male.png"
                                    : patient.gender === "Female"
                                    ? "/images/female.png"
                                    : "/images/agender.png"
                                }
                                className="w-12 h-12 rounded-full object-cover border border-border"
                              />
                            </td>
                            <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                              {patient.name}
                            </td>
                            <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                              {patient.surname}
                            </td>
                            <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                              {patient.bloodGroup !== null &&
                              patient.bloodGroup !== "" ? (
                                <span className="py-1 px-4 bg-slate-300 text-red-500 bg-opacity-10 text-xs rounded-xl">
                                  {patient.bloodGroup}
                                </span>
                              ) : (
                                ""
                              )}
                            </td>
                            <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                              {patient.gender === "Male" ? (
                                <span className="py-1 px-4 bg-cyan-300 text-cyan-500 bg-opacity-10 text-xs rounded-xl">
                                  Male
                                </span>
                              ) : patient.gender === "Female" ? (
                                <span className="py-1 px-4 bg-pink-300 text-pink-500 bg-opacity-10 text-xs rounded-xl">
                                  Female
                                </span>
                              ) : (
                                <span className="py-1 px-4 bg-gray-300 text-gray-500 bg-opacity-10 text-xs rounded-xl">
                                  Agender
                                </span>
                              )}
                            </td>
                            <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                              {ageCalculate(patient.birthDate)}
                            </td>
                            <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                              <Flags language={patient.language} />
                            </td>
                            <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                              {patient.phoneNumber}
                            </td>
                            <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                              {patient.createdAt}
                            </td>
                            <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                              <div className="flex justify-end">
                                <a
                                  href="#"
                                  className="w-28 h-9 text-white bg-green-300 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                                  <img
                                    src="/images/eye.png"
                                    alt="detail"
                                    className="h-7 mr-2"
                                  />
                                  Detail
                                </a>
                                <a
                                  href="#"
                                  onClick={() => dispatch(setIsShowError())}
                                  className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                                  <img
                                    src="/images/delete.png"
                                    alt="detail"
                                    className="h-4 mr-2"
                                  />
                                  Delete
                                </a>
                                <Modal
                                  setIsShowError={setIsShowError}
                                  isShowError={isShowError}
                                  message={`Are you sure you want to delete user`}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Pagination Controls */}
                    {!isFetching && <p>Loading more users...</p>}
                  </div>
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
