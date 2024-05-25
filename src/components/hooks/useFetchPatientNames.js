import { useState, useEffect } from "react";
import { useGetPatientByIdQuery } from "../../redux/features/api/apiSlice";

const useFetchPatientNames = (appointments) => {
  const [patientNames, setPatientNames] = useState({});

  const { data: patient } = await useGetPatientByIdQuery(
          appointment.patientId,
          { skip: !appointment.patientId }
        )

  

  return {patient.name}
};

export default useFetchPatientNames;
