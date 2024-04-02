import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  setPatientId,
  setSortField,
  setSortOrder,
  setSearchTerm,
  setFilter,
  setIsShowError,
} from "../../../redux/slices/tablePatientsSlice.js";
import { useGetPatientsPageQuery } from "../../../redux/features/api/apiSlice.js";

import Card from "../../UI/Cards/Card.jsx";

import { PiUsers } from "react-icons/pi";
import PatientsDashboard from "../../Layout/Dashboard/PatientsDashboard.jsx";
import Flags from "../../Dasboards/Flags/Flags.jsx";
import Modal from "../../UI/Modal.jsx";
import BloodType from "../../Dasboards/Services/BloodType.jsx";

const PatientsHome = () => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { sortField, sortOrder, searchTerm, filter } = useSelector(
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

  const sortedPatients = patients?.length
    ? [...patients].sort((a, b) => {
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

  const ageCalculate = (birthDateString) => {
    // Doğum tarihini Date nesnesine dönüştürme
    const birthDate = new Date(birthDateString);

    // Bugünkü tarihi alma
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // JavaScript'te aylar 0'dan başlar, bu yüzden +1 ekliyoruz
    const currentDay = today.getDate();

    // Yaş hesaplama
    let age = currentYear - birthDate.getFullYear();
    if (
      currentMonth < birthDate.getMonth() + 1 || // Ayları karşılaştırırken 1 eklemeyi unutmayın
      (currentMonth === birthDate.getMonth() + 1 &&
        currentDay < birthDate.getDate())
    ) {
      age--;
    }
    return age; // Yaşı döndürme
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
    setPage(1); // Arama yapıldığında sayfayı sıfırla!
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
    setPage(1); // Filter yapıldığında sayfayı sıfırla!
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
                P A T I E N T S
              </h1>
            </div>
          </div>
        </div>
        <PatientsDashboard />
        <Card title={"Patient List"} icon={<PiUsers />} color={"cyan"}>
          <div className="grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder='Search "Patients"'
              className="h-14 text-sm rounded-md bg-dry border border-border px-4"
              onChange={handleSearch}
            />
            <div className="text-sm relative w-full ">
              <div className="w-full">
                <div className="relative h-10 w-full min-w-[200px]">
                  <button
                    onClick={() => setPage(1)}
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
                    <th className="cursor-pointer hover:bg-cyan-300">Action</th>
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
                            patient.photo !== "null" &&
                            patient.photo !== null &&
                            patient.photo !== ""
                              ? patient.photo
                              : patient.gender === 2
                              ? "/images/male.png"
                              : patient.gender === 1
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
                            <BloodType bloodType={patient.bloodGroup} />
                          </span>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {patient.gender === 2 ? (
                          <span className="py-1 px-4 bg-cyan-300 text-cyan-500 bg-opacity-10 text-xs rounded-xl">
                            Male
                          </span>
                        ) : patient.gender === 1 ? (
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
                        {formatDate(patient.createdAt)}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        <div className="flex justify-end">
                          <Link
                            to="/patientProfile"
                            onClick={() => dispatch(setPatientId(patient.id))}
                            className="w-28 h-9 text-white bg-green-300 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            <img
                              src="/images/eye.png"
                              alt="detail"
                              className="h-7 mr-2"
                            />
                            Detail
                          </Link>
                          <Link
                            to="/patientDelete"
                            onClick={() => {
                              // dispatch(setIsShowError());
                              dispatch(setPatientId(patient.id));
                            }}
                            className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            <img
                              src="/images/delete.png"
                              alt="detail"
                              className="h-4 mr-2"
                            />
                            Delete
                          </Link>
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
                    onClick={() => setPage(page - 1)}
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
                    onClick={() => setPage(page + 1)}
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
export default PatientsHome;
