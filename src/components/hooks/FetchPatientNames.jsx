import { useEffect, useState } from "react";
import { useGetPatientByIdQuery } from "../../redux/features/api/apiSlice";

const useFetchPatientNames = (appointments) => {
  const [patientNames, setPatientNames] = useState({});

  useEffect(() => {
    const fetchPatientNames = async () => {
      const names = {};

      for (const appointment of appointments) {
        const { data: patientData } = await useGetPatientByIdQuery(
          appointment.patientId
        );
        names[appointment.patientId] = patientData
          ? `${patientData.name} ${patientData.surname}`
          : "Unknown Patient";
      }

      setPatientNames(names);
    };

    if (appointments.length > 0) {
      fetchPatientNames();
    }
  }, [appointments]);

  return patientNames;
};

export default useFetchPatientNames;
