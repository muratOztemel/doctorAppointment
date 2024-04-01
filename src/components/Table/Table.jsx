import { array, func } from "prop-types";
import { Fragment } from "react";

const Table = ({ patients, config, keyFn }) => {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return (
      <th
        key={column.label}
        className="text-start text-sm font-medium py-3 px-2 whitespace-nowrap">
        {column.label}
      </th>
    );
  });

  const renderedRows = patients.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td
          key={column.label}
          className="text-start text-sm py-4 px-2 whitespace-nowrap">
          {column.render(rowData)}
        </td>
      );
    });

    return (
      <tr
        key={keyFn(rowData)}
        className="border-b border-cyan-100 hover:bg-cyan-50 transition">
        {renderedCells}
      </tr>
    );
  });

  return (
    <table className="table-auto w-full">
      <thead className="bg-cyan-50 rounded-md overflow-hidden">
        <tr>{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
};
export default Table;

Table.propTypes = {
  config: array,
  patients: array,
  keyFn: func,
};
