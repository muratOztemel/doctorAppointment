import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  setPatientId,
  setSortField,
  setSortOrder,
  setSearchTerm,
  setFilter,
} from "../../redux/slices/tablePatientsSlice.js";
import { useGetMedicinesPageQuery } from "../../redux/features/api/apiSlice.js";
import Card from "../../components/UI/Cards/Card.jsx";
import { PiUsers } from "react-icons/pi";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import Flags from "../../components/Dasboards/Flags/Flags.jsx";
import ModalDeleteMedicine from "../../components/UI/Modal/ModalDeleteMedicine.jsx";
import BloodType from "../../components/Dasboards/Services/BloodType.jsx";
import TitleCard from "../../components/UI/Cards/TitleCard.jsx";

const MedicinesHome = () => {
  const [page, setPage] = useState(1);
  const [isShowError, setIsShowError] = useState(false);

  const dispatch = useDispatch();
  const { sortField, sortOrder, searchTerm, filter } = useSelector(
    (state) => state.tableMedicines
  );

  const {
    data: medicines,
    error,
    isLoading,
  } = useGetMedicinesPageQuery({
    page,
    searchTerm,
    sortField,
    sortOrder,
    filter,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  /*   const sortedPatients = [...patients].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  }); */

  const sortedMedicines = patients?.length
    ? [...patients].sort((a, b) => {
        // Tarih alanı için özel karşılaştırma
        if (sortField === "createdAt") {
          // Tarih string'lerini Date objelerine dönüştür
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
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

  const filteredAndSortedMedicines = sortedMedicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    if (e.target.value.length > 1) {
      dispatch(setSearchTerm(e.target.value));
      setPage(1); // Arama yapıldığında sayfayı sıfırla!
    }
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
    setPage(1); // Filter yapıldığında sayfayı sıfırla!
  };

  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"M E D I C I N E S"} />
        <Card title={"Medicine List"} icon={<PiUsers />} color={"cyan"}>
          <div className="grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 mt-6">
            <div className="flex flex-col justify-center">
              <input
                type="text"
                placeholder='Search "Medicines"'
                pattern="[A-Za-z]{2,}"
                className="h-14 text-sm rounded-md bg-dry border border-border px-4"
                onChange={handleSearch}
              />
              <p className="text-xs text-gray-500 ml-4">
                at least 2 characters
              </p>
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
                  {filteredAndSortedMedicines.map((medicine) => (
                    <tr
                      key={medicine.id}
                      className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {medicine.id}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap"></td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {medicine.name}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap"></td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap"></td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap"></td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap"></td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap"></td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap"></td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {formatDate(medicine.createdAt)}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        <div className="flex justify-end">
                          <Link
                            to={`/medicine/${medicine.id}/${medicine.name}`}
                            onClick={() => dispatch(setPatientId(medicine.id))}
                            className="w-28 h-9 text-white bg-amber-300 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            <img
                              src="/images/eye.png"
                              alt="detail"
                              className="h-7 mr-2"
                            />
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              dispatch(setPatientId(medicine.id));
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
                            <ModalDeleteMedicine
                              setIsShowError={setIsShowError}
                              isShowError={isShowError}
                              message={`Are you sure you want to delete medicine`}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination Controls */}
              {/*                     {!isFetching && <p>Loading more users...</p>} */}
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
export default MedicinesHome;
