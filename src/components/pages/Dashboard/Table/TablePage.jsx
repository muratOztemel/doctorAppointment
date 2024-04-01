import { useState } from "react";
import { array } from "prop-types";
import Flags from "../../../Dasboards/Flags/Flags";
import Modal from "../../../UI/Modal";
import SortableTable from "../../../Table/SortableTable";

const TablePage = ({ patients }) => {
  const [isShowError, setIsShowError] = useState(false);
  const config = [
    {
      label: "#",
      render: (patient) => patient.id,
      sortValue: (patient) => patient.id,
    },
    {
      label: "Photo",
      render: (patient) => (
        <img
          src={
            patient.photo !== null && patient.photo !== ""
              ? patient.photo
              : patient.gender === "Male"
              ? "/images/male.png"
              : "/images/female.png"
          }
          className="w-12 h-12 rounded-full object-cover border border-border"
        />
      ),
    },
    {
      label: "Patient",
      render: (patient) => (
        <div>
          <h4 className="text-sm font-medium">
            {patient.name} {patient.surname}
          </h4>
          <p className="text-xs mt-1 text-gray-500">{patient.phoneNumber}</p>
        </div>
      ),
      sortValue: (patient) => patient.name,
    },
    {
      label: "Language",
      render: (patient) => <Flags language={patient.language} />,
      sortValue: (patient) => patient.language,
    },
    {
      label: "Created At",
      render: (patient) => patient.createdAt,
      sortValue: (patient) => patient.createdAt,
    },
    {
      label: "Gender",
      render: (patient) =>
        patient.gender === "Male" ? (
          <span className="py-1 px-4 bg-cyan-300 text-cyan-500 bg-opacity-10 text-xs rounded-xl">
            Male
          </span>
        ) : (
          <span className="py-1 px-4 bg-pink-300 text-pink-500 bg-opacity-10 text-xs rounded-xl">
            Female
          </span>
        ),
      sortValue: (patient) => patient.gender,
    },

    {
      label: "Age",
      render: (patient) => {
        // Doğum tarihini ayrıştırma
        const birthDateArray = patient.birthDate.split(".");
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
        return age; // Yaşı döndürme
      },
      sortValue: (patient) => patient.birthDate,
    },
    {
      label: "Blood Group",
      render: (patient) =>
        patient.bloodGroup !== null && patient.bloodGroup !== "" ? (
          <span className="py-1 px-4 bg-slate-300 text-red-500 bg-opacity-10 text-xs rounded-xl">
            {patient.bloodGroup}
          </span>
        ) : (
          ""
        ),
      sortValue: (patient) => patient.bloodGroup,
    },

    {
      label: "Actions",
      render: () => {
        return (
          <div className="flex justify-end">
            <a
              href="#"
              className="w-28 h-9 text-white bg-green-300 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
              <img src="/images/eye.png" alt="detail" className="h-7 mr-2" />
              Detail
            </a>
            <a
              href="#"
              onClick={() => setIsShowError(true)}
              className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
              <img src="/images/delete.png" alt="detail" className="h-4 mr-2" />
              Delete
            </a>
            <Modal
              setIsShowError={setIsShowError}
              isShowError={isShowError}
              message={`Are you sure you want to delete user`}
            />
          </div>
        );
      },
    },
  ];

  const keyFn = (patient) => {
    return patient.id;
  };

  return (
    <div>
      {patients.length !== 0 ? (
        <SortableTable config={config} patients={patients} keyFn={keyFn} />
      ) : (
        "No Data Found"
      )}
    </div>
  );
};
export default TablePage;

TablePage.propTypes = {
  patients: array,
};
