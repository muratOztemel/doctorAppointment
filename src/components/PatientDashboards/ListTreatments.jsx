import {
  useGetPrescriptionsByTreatmentIdQuery,
  useGetPrescriptionMedicinesByPrescriptionIdQuery,
} from "../../redux/features/api/apiSlice";
import { format } from "date-fns";

const ListTreatments = ({ treatment }) => {
  const {
    data: prescriptions,
    isLoading: isLoadingPrescriptions,
    isError: isErrorPrescriptions,
  } = useGetPrescriptionsByTreatmentIdQuery(treatment.id);

  if (isLoadingPrescriptions) {
    return <p>Loading...</p>;
  }

  if (isErrorPrescriptions) {
    return <p>Error loading prescriptions.</p>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-8 gap-4 bg-white p-4 rounded-xl shadow-md mb-4">
        <div className="col-span-8">
          <h3 className="text-lg font-semibold text-gray-700">Complains:</h3>
          <p className="text-gray-600">{treatment.complains}</p>
        </div>
        <div className="col-span-8">
          <h3 className="text-lg font-semibold text-gray-700">Diagnosis:</h3>
          <p className="text-gray-600">{treatment.diognasis}</p>
        </div>
        <div className="col-span-8">
          <h3 className="text-lg font-semibold text-gray-700">Vital Signs:</h3>
          <p className="text-gray-600">{treatment.vitalSigns}</p>
        </div>
        <div className="col-span-8">
          <h3 className="text-lg font-semibold text-gray-700">
            Treatment Details:
          </h3>
          <p className="text-gray-600">{treatment.treatmentDetails}</p>
        </div>
      </div>
      {prescriptions?.map((prescription) => (
        <PrescriptionDetails
          key={prescription.id}
          prescription={prescription}
        />
      ))}
    </div>
  );
};

const PrescriptionDetails = ({ prescription }) => {
  const {
    data: medicines,
    isLoading: isLoadingMedicines,
    isError: isErrorMedicines,
  } = useGetPrescriptionMedicinesByPrescriptionIdQuery(prescription.id);

  if (isLoadingMedicines) {
    return <p>Loading medicines...</p>;
  }

  if (isErrorMedicines) {
    return <p>Error loading medicines.</p>;
  }

  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow-md mb-4">
      <h3 className="text-lg font-semibold text-gray-700">Prescription:</h3>
      <p className="text-gray-600">{prescription.description}</p>
      <p className="text-gray-600">
        Created At:{" "}
        {format(new Date(prescription.createdAt), "yyyy-MM-dd HH:mm")}
      </p>
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700">Medicines:</h4>
        <ul className="list-disc list-inside text-gray-600">
          {medicines?.map((medicine) => (
            <li key={medicine.id}>
              <p>Medicine ID: {medicine.medicineId}</p>
              <p>Dosage Quantity: {medicine.dosageQuantity}</p>
              <p>Quantity: {medicine.quantity}</p>
              <p>Instruction: {medicine.instruction}</p>
              <p>Description: {medicine.description}</p>
              <p>Morning Usage: {medicine.morningUsage ? "Yes" : "No"}</p>
              <p>Afternoon Usage: {medicine.afternoonUsage ? "Yes" : "No"}</p>
              <p>Evening Usage: {medicine.eveningUsage ? "Yes" : "No"}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListTreatments;
