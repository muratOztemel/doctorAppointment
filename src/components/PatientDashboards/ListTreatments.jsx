import {
  useGetPrescriptionsByTreatmentIdQuery,
  useGetPrescriptionMedicinesByPrescriptiontIdQuery,
  useGetMedicineByIdQuery,
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
      <div className="flex flex-col gap-4 bg-white p-4 rounded-xl shadow-md mb-4">
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
  } = useGetPrescriptionMedicinesByPrescriptiontIdQuery(prescription.id);

  if (isLoadingMedicines) {
    return <p>Loading medicines...</p>;
  }

  if (isErrorMedicines) {
    return <p>Error loading medicines.</p>;
  }

  return (
    <div className="p-4 bg-cyan-50 rounded-xl shadow-md mb-4">
      <h3 className="text-lg font-semibold text-gray-700">Prescription:</h3>
      <p className="text-gray-600">{prescription.description}</p>
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700">Medicines:</h4>
        <div className="flex text-gray-600 gap-4">
          {medicines?.map((medicine) => (
            <MedicineDetails key={medicine.id} medicine={medicine} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MedicineDetails = ({ medicine }) => {
  const {
    data: medicineData,
    isLoading,
    isError,
  } = useGetMedicineByIdQuery(medicine.medicineId);

  if (isLoading) {
    return <p>Loading medicine name...</p>;
  }

  if (isError) {
    return <p>Error loading medicine name.</p>;
  }

  return (
    <div className="bg-cyan-100 p-2 rounded">
      <p>
        Medicine Name: <strong>{medicineData?.name}</strong>
      </p>
      <p>Dosage Quantity: {medicine.dosageQuantity}</p>
      <p>Quantity: {medicine.quantity}</p>
      <p>Instruction: {medicine.instruction}</p>
      <p>Description: {medicine.description}</p>
      <p>Morning Usage: {medicine.morningUsage ? "Yes" : "No"}</p>
      <p>Afternoon Usage: {medicine.afternoonUsage ? "Yes" : "No"}</p>
      <p>Evening Usage: {medicine.eveningUsage ? "Yes" : "No"}</p>
    </div>
  );
};

export default ListTreatments;
