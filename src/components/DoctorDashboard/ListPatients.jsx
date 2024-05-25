import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetPatientByIdQuery } from "../../redux/features/api/apiSlice.js";

import Card from "../UI/Cards/Card.jsx";

import { PiUsers } from "react-icons/pi";
import Flags from "../Dasboards/Flags/Flags.jsx";
import Modal from "../UI/Modal/ModalConfirmation.jsx";
import BloodType from "../Dasboards/Services/BloodType.jsx";

const ListPatient = ({ appointment }) => {
  const [page, setPage] = useState(1);
  const [isShowError, setIsShowError] = useState(false);

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  const sortedPatients = patient?.length
    ? [...patient].sort((a, b) => {
        // Tarih alanı için özel karşılaştırma
        if (sortField === "birthdate") {
          // Tarih string'lerini Date objelerine dönüştür
          const dateA = new Date(a.birthDate);
          const dateB = new Date(b.birthDate);
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

  const ageCalculate = (birthDateString) => {
    // Doğum tarihini Date nesnesine dönüştürme
    const birthDate = new Date(birthDateString);

    // Bugünkü tarihi alma
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // JavaScript'te aylar 0'dan başlar, bu yüzden +1 ekliyoruz
    const currentDay = today.getDate();

    // Yaş hesaplama
    let age = currentYear - birthDate.getFullYear();
    if (
      currentMonth < birthDate.getMonth() + 1 || // Ayları karşılaştırırken 1 eklemeyi unutmayın
      (currentMonth === birthDate.getMonth() + 1 &&
        currentDay < birthDate.getDate())
    ) {
      age--;
    }
    return age; // Yaşı döndürme
  };

  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const day = date.getDate().toString().padStart(2, "0"); // Günü al ve iki basamaklı yap
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ayı al (0'dan başladığı için 1 ekliyoruz) ve iki basamaklı yap
    const year = date.getFullYear(); // Yılı al
    return `${day}.${month}.${year}`; // Formatı DD.MM.YYYY olarak döndür
  }

  return (
    <tr className="border-b border-cyan-100 hover:bg-cyan-50 transition">
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
        {patient.id}
      </td>
      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
        <img
          src={
            patient.photo !== "null" &&
            patient.photo !== null &&
            patient.photo !== ""
              ? patient.photo
              : patient.gender === 1
              ? "/images/male.png"
              : patient.gender === 2
              ? "/images/female.png"
              : "/images/agender.png"
          }
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
        <div className="flex justify-end">
          <Link
            to="/patientProfile"
            onClick={() => dispatch(setPatientId(patient.id))}
            className="w-28 h-9 text-white bg-amber-300 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
            <img src="/images/eye.png" alt="detail" className="h-7 mr-2" />
            Detail
          </Link>
          {isShowError && (
            <Modal
              setIsShowError={setIsShowError}
              isShowError={isShowError}
              message={`Are you sure you want to delete user`}
            />
          )}
        </div>
      </td>
    </tr>
  );
};
export default ListPatient;
