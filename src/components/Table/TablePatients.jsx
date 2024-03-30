import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentPage,
  setSortField,
  setSortOrder,
  setSearchTerm,
  setFilter,
} from "../../redux/slices/tablePatientsSlice.js";
import { useGetPatientsQuery } from "../../../redux/features/api/apiSlice.js";

const TablePatients = () => {
  const dispatch = useDispatch();
  const {
    currentPage,
    itemsPerPage,
    sortField,
    sortOrder,
    searchTerm,
    filter,
  } = useSelector((state) => state.tablePatients);

  // RTK Query hook'unu kullanarak verileri yükleyin
  const {
    data: patients,
    error,
    isLoading,
  } = useGetPatientsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data
        ?.filter(
          (patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filter ? patient.bloodGroup === filter : true)
        )
        .sort((a, b) => {
          if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
          if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
          return 0;
        })
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
      // Diğer gerekli alanlarınız...
    }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedPatients = [...patients].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const filteredAndSortedPatients = sortedPatients
    .filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter ? patient.bloodGroup === filter : true)
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(patients.length / itemsPerPage);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };
  return (
    // TABLE PATIENTS
    <div>
      {/* Search and Filter Inputs */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sortField === "name" ? (sortOrder === "asc" ? "↓" : "↑") : ""}
            </th>
            {/* Other column headers */}
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              {/* Other column values */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
    // TABLE PATIENTS FINISH
  );
};
export default TablePatients;
