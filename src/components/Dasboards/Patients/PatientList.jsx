import { number, string } from "prop-types";
import Flags from "../Flags/Flags";

const PatientList = (props) => {
  const {
    id,
    photo,
    name,
    surname,
    phoneNumber,
    createdAt,
    gender,
    birthDate,
    language,
    bloodGroup,
  } = props;

  // Doğum tarihini ayrıştırma
  const birthDateArray = birthDate.split(".");
  const birthDay = parseInt(birthDateArray[0], 10);
  const birthMonth = parseInt(birthDateArray[1], 10);
  const birthYear = parseInt(birthDateArray[2], 10);

  // Bugünkü tarihi alma
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1; // JavaScript'te aylar 0'dan başlar
  const currentYear = today.getFullYear();

  // Yaş hesaplama
  let age = currentYear - birthYear;
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--;
  }

  return (
    <tr className="border-b border-cyan-100 hover:bg-cyan-50 transition">
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">{id}</td>
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
        <div className="flex gap-4 items-center">
          <span className="w-12">
            <img
              src={
                photo !== null && photo !== ""
                  ? photo
                  : gender === "Male"
                  ? "/images/male.png"
                  : "/images/female.png"
              }
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
        {gender === "Male" ? (
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
          {age}
        </span>
      </td>
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
        <span className="py-1 px-4 bg-slate-300 text-slate-500 bg-opacity-10 text-xs rounded-xl">
          {bloodGroup !== null || bloodGroup !== "" ? bloodGroup : "--"}
        </span>
      </td>
      <td className="flex items-center justify-end gap-4 py-4 px-2 whitespace-nowrap">
        <button className="w-24 inline-flex items-center px-4 py-2 bg-green-300 hover:bg-green-500 text-white text-sm font-medium rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-5 w-5 mr-2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"></path>
          </svg>
          Detail
        </button>
        <button className="items-end w-24 inline-flex px-4 py-2 bg-red-300 hover:bg-red-500 text-white text-sm font-medium rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          Delete
        </button>
      </td>
    </tr>
  );
};
export default PatientList;

PatientList.propTypes = {
  id: number,
  photo: string,
  name: string,
  surname: string,
  phoneNumber: string,
  createdAt: string,
  gender: string,
  birthDate: string,
  language: string,
  bloodGroup: string,
};
