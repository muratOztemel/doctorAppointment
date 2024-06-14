import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  setDoctorId,
  setSortField,
  setSortOrder,
  setSearchTerm,
  setFilter,
  resetFilters, // yeni action
} from "../../redux/slices/tableDoctorsSlice.js";
import { useGetDoctorsQuery } from "../../redux/features/api/apiSlice.js";
import Card from "../../components/UI/Cards/Card.jsx";
import {
  FaUserDoctor,
  FaArrowRightLong,
  FaArrowLeftLong,
} from "react-icons/fa6";
import ModalDeleteDoctor from "../../components/UI/Modal/ModalDeleteDoctor.jsx";
import TitleCard from "../../components/UI/Cards/TitleCard.jsx";
import DefaultImage from "../../components/hooks/DefaultImage.jsx";

const DoctorsHome = () => {
  const [page, setPage] = useState(1);
  const [isShowError, setIsShowError] = useState(false);
  const [searchTermLocal, setSearchTermLocal] = useState("");

  const dispatch = useDispatch();
  const { sortField, sortOrder, searchTerm, filter } = useSelector(
    (state) => state.tableDoctors
  );

  const {
    data: doctor,
    error,
    isLoading,
  } = useGetDoctorsQuery({
    page,
    searchTerm,
    sortField,
    sortOrder,
    filter,
  });

  const defaultImage = DefaultImage(doctor?.doctorInfo);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const sortedDoctors = doctor?.length
    ? [...doctor].sort((a, b) => {
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

  const filteredAndSortedDoctors = sortedDoctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    setSearchTermLocal(e.target.value);
    dispatch(setSearchTerm(e.target.value));
    setPage(1); // Arama yapıldığında sayfayı sıfırla!
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setPage(1);
    setSearchTermLocal("");
  };

  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"D O C T O R S"} />
        <Card
          title={"Doctors List"}
          icon={<FaUserDoctor />}
          color={"cyan"}
          className="mt-5">
          <div className="flex gap-2 mt-5">
            <input
              type="text"
              placeholder='Search "Doctors"'
              className="h-14 w-full text-sm rounded-md bg-dry border border-border px-4"
              value={searchTermLocal}
              onChange={handleSearch}
            />
            <button
              onClick={handleReset}
              className="w-full h-14 bg-green-300 rounded-md text-white hover:bg-green-600">
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
                  {filteredAndSortedDoctors.map((doctor) => (
                    <tr
                      key={doctor.id}
                      className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {doctor.id}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        <img
                          src={
                            doctor?.doctorInfo?.photo !== "null" &&
                            doctor?.doctorInfo?.photo !== null &&
                            doctor?.doctorInfo?.photo !== ""
                              ? doctor?.doctorInfo?.photo
                              : doctor?.doctorInfo?.gender === 1
                              ? "/images/male.png"
                              : doctor?.doctorInfo?.gender === 2
                              ? "/images/female.png"
                              : "/images/agender.png"
                          }
                          className="w-12 h-12 rounded-full object-cover border border-border"
                        />
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {doctor.name}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {doctor.surname}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {doctor?.doctorInfo?.phoneNumber}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {formatDate(doctor.createdAt)}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        <div className="flex justify-end">
                          <Link
                            to={`/dashboard/admin/doctor/${doctor.id}/${doctor.name} ${doctor.surname}`}
                            onClick={() => dispatch(setDoctorId(doctor.id))}
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
                              dispatch(setDoctorId(doctor.id));
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
                            <ModalDeleteDoctor
                              setIsShowError={setIsShowError}
                              isShowError={isShowError}
                              message={`Are you sure you want to delete doctor`}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center m-4">
                <button
                  href="#"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className={`flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    page === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}>
                  <FaArrowLeftLong className="w-3.5 h-3.5 me-2" />
                  Previous
                </button>
                <button
                  href="#"
                  onClick={() => setPage(page + 1)}
                  disabled={filteredAndSortedDoctors.length === 0}
                  className={`flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    filteredAndSortedDoctors.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}>
                  Next
                  <FaArrowRightLong className="w-3.5 h-3.5 ms-2" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
export default DoctorsHome;
