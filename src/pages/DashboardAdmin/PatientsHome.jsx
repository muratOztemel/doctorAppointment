import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  setPatientId,
  setSortField,
  setSortOrder,
  setSearchTerm,
  setFilter,
} from "../../redux/slices/tablePatientsSlice.js";
import { useGetPatientsPageQuery } from "../../redux/features/api/apiSlice.js";
import Card from "../../components/UI/Cards/Card.jsx";
import { PiUsers } from "react-icons/pi";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import PatientsDashboard from "../../components/Layout/Dashboard/PatientsDashboard.jsx";
import Flags from "../../components/Dasboards/Flags/Flags.jsx";
import ModalDeletePatient from "../../components/UI/Modal/ModalDeletePatient.jsx";
import BloodType from "../../components/Dasboards/Services/BloodType.jsx";
import TitleCard from "../../components/UI/Cards/TitleCard.jsx";

const PatientsHome = () => {
  const [page, setPage] = useState(1);
  const [isShowError, setIsShowError] = useState(false);
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

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

  const handleBloodGroupChange = (e) => {
    const selectedBloodGroup = Number(e.target.value);
    setBloodGroupFilter(selectedBloodGroup);
    dispatch(setFilter(selectedBloodGroup));
  };

  const handleGenderChange = (e) => {
    const selectedGender = Number(e.target.value);
    setGenderFilter(selectedGender);
    dispatch(setFilter(selectedGender)); // Filter state güncellendi
  };

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

  const filteredAndSortedPatients = sortedPatients?.filter((patient) => {
    const matchesBloodGroup = bloodGroupFilter
      ? patient.bloodGroup === bloodGroupFilter
      : true;
    const matchesGender = genderFilter ? patient.gender === genderFilter : true;
    return (
      matchesBloodGroup &&
      matchesGender &&
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
    if (e.target.value.length > 1) {
      dispatch(setSearchTerm(e.target.value));
      setPage(1); // Arama yapıldığında sayfayı sıfırla!
    }
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
    setPage(1); // Filter yapıldığında sayfayı sıfırla!
    dispatch(setFilter("1"));
  };

  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"P A T I E N T S"} />
        <PatientsDashboard />
        <Card title={"Patient List"} icon={<PiUsers />} color={"cyan"}>
          <div className="grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 mt-6">
            <div className="flex flex-col justify-center">
              <input
                type="text"
                placeholder='Search "Patients"'
                // pattern="[A-Za-z]{2,}"
                className="h-14 text-sm rounded-md bg-dry border border-border px-4"
                onChange={handleSearch}
              />
              {/* <p className="text-xs text-gray-500 ml-4">
                at least 2 characters
              </p> */}
            </div>
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
                    onChange={handleBloodGroupChange}
                    className="bg-slate-500 text-white  peer h-14 w-full rounded-[7px] p-3">
                    <option value="">All Blood Groups</option>
                    <option value="1">A+</option>
                    <option value="2">A-</option>
                    <option value="3">B+</option>
                    <option value="4">B-</option>
                    <option value="5">AB+</option>
                    <option value="6">AB-</option>
                    <option value="7">O+</option>
                    <option value="8">O-</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="text-sm relative w-full ">
              <div className="w-full">
                <div className="relative h-10 w-full min-w-[200px]">
                  <select
                    onChange={handleGenderChange}
                    className="bg-slate-700 text-white  peer h-14 w-full rounded-[7px] p-3">
                    <option value="">All Gender</option>
                    <option value="2">Female</option>
                    <option value="1">Male</option>
                    <option value="3">Other</option>
                    <option value="4">Other</option>
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
                              : patient.gender === 1
                              ? "/images/male.png"
                              : patient.gender === 2
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
                        {patient.gender === 1 ? (
                          <span className="py-1 px-4 bg-cyan-300 text-cyan-500 bg-opacity-10 text-xs rounded-xl">
                            Male
                          </span>
                        ) : patient.gender === 2 ? (
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
                            to={`/dashboard/admin/patient/${patient.id}/${patient.name}${patient.surname}`}
                            onClick={() => dispatch(setPatientId(patient.id))}
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
                              dispatch(setPatientId(patient.id));
                              setIsShowError(true);
                            }}
                            className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            <img
                              src="/images/delete.png"
                              alt="detail"
                              className="h-4 mr-2"
                            />
                            Delete
                          </button>
                          {isShowError && (
                            <ModalDeletePatient
                              setIsShowError={setIsShowError}
                              isShowError={isShowError}
                              message={`Are you sure you want to delete user`}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination Controls */}
              {!isFetching && <p>Loading more users...</p>}
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <div className="flex justify-center m-4">
                  <button
                    href="#"
                    onClick={() => setPage(page - 1)}
                    className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <FaArrowLeftLong className="w-3.5 h-3.5 me-2" />
                    Previous
                  </button>
                  <button
                    href="#"
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
    </>
  );
};
export default PatientsHome;
