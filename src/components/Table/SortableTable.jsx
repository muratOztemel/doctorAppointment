import { useState } from "react";
import { array } from "prop-types";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

import Table from "./Table";

const SortableTable = (props) => {
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const { config, patients } = props;

  const handleClick = (label) => {
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

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th
          onClick={() => handleClick(column.label)}
          className="cursor-pointer hover:bg-cyan-300">
          <div className="flex items-center">
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </div>
        </th>
      ),
    };
  });

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

      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  return <Table {...props} patients={sortedData} config={updatedConfig} />;
};
export default SortableTable;

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div>
        <FaCaretUp />
        <FaCaretDown />
      </div>
    );
  }

  if (sortOrder === null) {
    return (
      <div>
        <FaCaretUp />
        <FaCaretDown />
      </div>
    );
  } else if (sortOrder === "asc") {
    return (
      <div>
        <FaCaretUp />
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div>
        <FaCaretDown />
      </div>
    );
  }
}

SortableTable.propTypes = {
  config: array,
  patients: array,
};
