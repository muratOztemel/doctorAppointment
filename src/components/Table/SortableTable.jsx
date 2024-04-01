import { array } from "prop-types";
import useSort from "../hooks/use-sort";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

import Table from "./Table";

const SortableTable = (props) => {
  const { config, patients } = props;
  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(
    patients,
    config
  );

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th
          onClick={() => setSortColumn(column.label)}
          className="cursor-pointer hover:bg-cyan-300">
          <div className="flex items-center">
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </div>
        </th>
      ),
    };
  });

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
