import { useState } from "react";

const useSort = (patients, config) => {
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const setSortColumn = (label) => {
    if (sortBy && label !== sortBy) {
      setSortOrder("asc");
      setSortBy(label);
      return;
    }

    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  // Only sort data if sortOrder && sortBy are not null
  // Make a copy of the 'data' prop
  // Find the correct sortValue function and use it for sorting
  let sortedData = patients;

  if (sortOrder && sortBy) {
    const { sortValue } = config.find((column) => column.label === sortBy);
    sortedData = [...patients].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;

      if (typeof valueA === "string" && typeof valueB === "string") {
        // Assuming date format is "DD.MM.YYYY"
        const dateA = new Date(valueA.split(".").reverse().join("-"));
        const dateB = new Date(valueB.split(".").reverse().join("-"));
        return (dateA.getTime() - dateB.getTime()) * reverseOrder;
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return (valueA - valueB) * reverseOrder;
      } else if (valueA instanceof Date && valueB instanceof Date) {
        return (valueA.getTime() - valueB.getTime()) * reverseOrder;
      } else {
        // Handle other types of comparisons if needed
        // For example, throw an error or handle gracefully
        return 0;
      }
    });
  }
  /*  if (sortOrder && sortBy) {
    const { sortValue } = config.find((column) => column.label === sortBy);
    sortedData = [...patients].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;

      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  } */

  return {
    sortOrder,
    sortBy,
    sortedData,
    setSortColumn,
  };
};
export default useSort;
