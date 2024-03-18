import { number, string } from "prop-types";
import Flags from "../Flags/Flags";

const PatientList = (props) => {
  const {
    id,
    photos,
    name,
    surname,
    phoneNumber,
    createdAt,
    gender,
    birthDate,
    language,
  } = props;

  const age = () => {
    var birthday = new Date(birthDate);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);

    return ageDate.getFullYear() - 1970;
  };
  return (
    <tr className="border-b border-border hover:bg-greyed transitions">
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">{id}</td>
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
        <div className="flex gap-4 items-center">
          <span className="w-12">
            <img
              src={photos}
              className="w-full h-12 rounded-full object-cover border border-border"
            />
          </span>
          <div>
            <h4 className="text-sm font-medium">
              {name} {surname}
            </h4>
            <p className="text-xs mt-1 text-textGray">{phoneNumber}</p>
          </div>
        </div>
      </td>
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
        <Flags language={language} />
      </td>
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
        {createdAt}
      </td>
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
        {gender === 0 ? (
          <span className="py-1 px-4 bg-cyan-300 text-cyan-500 bg-opacity-10 text-xs rounded-xl">
            Male
          </span>
        ) : (
          <span className="py-1 px-4 bg-pink-300 text-pink-500 bg-opacity-10 text-xs rounded-xl">
            Female
          </span>
        )}
      </td>
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
        <span className="py-1 px-4 bg-slate-300 text-slate-500 bg-opacity-10 text-xs rounded-xl">
          {age()}
        </span>
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

PatientList.propTypes = {
  id: string,
  photos: string,
  name: string,
  surname: string,
  phoneNumber: string,
  createdAt: string,
  gender: number,
  birthDate: string,
  language: string,
};
