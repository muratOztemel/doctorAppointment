import DefaultImage from "../hooks/DefaultImage";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGetPatientByIdQuery } from "../../redux/features/api/apiSlice.js";
import { setPatientId } from "../../redux/slices/patientSlice.js";
import Flags from "../Dasboards/Flags/Flags.jsx";
import BloodType from "../Dasboards/Services/BloodType.jsx";

const ListPatient = ({ appointment }) => {
  const dispatch = useDispatch();
  const { sortField, sortOrder, searchTerm, filter } = useSelector(
    (state) => state.tablePatients
  );

  const {
    data: patient,
    isLoading,
    isError,
  } = useGetPatientByIdQuery(appointment.patientId, {
    skip: !appointment.patientId,
  });

  if (isLoading) {
    return (
      <tr>
        <td colSpan="12">Loading...</td>
      </tr>
    );
  }
  if (isError) {
    return (
      <tr>
        <td colSpan="12">Error!</td>
      </tr>
    );
  }

  if (!patient) {
    return (
      <tr>
        <td colSpan="12">No patient data available.</td>
      </tr>
    );
  }

  // Ensure patient is an array
  const patientArray = Array.isArray(patient) ? patient : [patient];

  // Remove duplicate patients
  const uniquePatients = patientArray.filter(
    (value, index, self) => index === self.findIndex((p) => p.id === value.id)
  );

  const ageCalculate = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    let age = currentYear - birthDate.getFullYear();
    if (
      currentMonth < birthDate.getMonth() + 1 ||
      (currentMonth === birthDate.getMonth() + 1 &&
        currentDay < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return (
    <>
      {uniquePatients.map((patient) => (
        <tr
          key={patient.id}
          className="border-b border-cyan-100 hover:bg-cyan-50 transition">
          <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
            {patient.id}
          </td>
          <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
            <img
              src={DefaultImage(patient)}
              alt={appointment.patientFullName}
              className="w-12 h-12 rounded-full object-cover border border-border"
            />
          </td>
          <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
            {patient.name}
          </td>
          <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
            {patient.surname}
          </td>
          <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
            {patient.bloodGroup !== null && patient.bloodGroup !== "" ? (
              <span className="py-1 px-4 bg-slate-300 text-red-500 bg-opacity-10 text-xs rounded-xl">
                <BloodType bloodType={patient.bloodGroup} />
              </span>
            ) : (
              ""
            )}
          </td>
          <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
            {patient.gender === 1 ? (
              <span className="py-1 px-4 bg-cyan-300 text-cyan-500 bg-opacity-10 text-xs rounded-xl">
                Male
              </span>
            ) : patient.gender === 2 ? (
              <span className="py-1 px-4 bg-pink-300 text-pink-500 bg-opacity-10 text-xs rounded-xl">
                Female
              </span>
            ) : (
              <span className="py-1 px-4 bg-gray-300 text-gray-500 bg-opacity-10 text-xs rounded-xl">
                Agender
              </span>
            )}
          </td>
          <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
            {ageCalculate(patient.birthDate)}
          </td>
          <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
            <Flags language={patient.language} />
          </td>
          <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
            {patient.phoneNumber}
          </td>
          <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
            {formatDate(patient.createdAt)}
          </td>
          <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
            <Link
              to={`/dashboard/doctor/patient/${patient.id}/${patient.name}${patient.surname}`}
              onClick={() => dispatch(setPatientId(patient.id))}
              className="w-28 h-9 text-white bg-amber-300 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
              <img src="/images/eye.png" alt="detail" className="h-7 mr-2" />
              Detail
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ListPatient;
