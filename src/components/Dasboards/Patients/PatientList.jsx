const PatientList = () => {
  return (
    <tr className="border-b border-border hover:bg-greyed transitions">
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">1</td>
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
        <div className="flex gap-4 items-center">
          <span className="w-12">
            <img
              src="/murat.jpeg"
              alt="Hugo Lloris"
              className="w-full h-12 rounded-full object-cover border border-border"
            />
          </span>
          <div>
            <h4 className="text-sm font-medium">Murat Öztemel</h4>
            <p className="text-xs mt-1 text-textGray">532 711 87 92</p>
          </div>
        </div>
      </td>
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
        Mar 12, 2022
      </td>
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
        <span className="py-1 px-4 bg-subMain text-teal-500 bg-opacity-10 text-xs rounded-xl">
          Paid
        </span>
      </td>
    </tr>
  );
};
export default PatientList;
