import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  useGetPatientByIdQuery,
  useGetTreatmentsQuery,
  useGetPrescriptionMedicinesByPrescriptiontIdQuery,
  useGetMedicineByIdQuery,
} from "../../../redux/features/api/apiSlice.js";
import BloodType from "../Services/BloodType.jsx";
import { format } from "date-fns";
import PatientStickyLink from "../Services/PatientStickyLink.jsx";

const PatientMedicalRecords = () => {
  const navigate = useNavigate();
  const { id: patientId } = useParams();

  const {
    data: patient,
    isError: isErrorPatient,
    isLoading: isLoadingPatient,
  } = useGetPatientByIdQuery(patientId);

  if (isLoadingPatient) return <p>Loading...</p>;
  if (isErrorPatient) return <p>Error fetching patient data.</p>;

  const patientName = `${patient.name} ${patient.surname}`;

  return (
    <>
      <div className="xl:px-8 px-2">
        <div className="flex items-center text-center gap-4">
          <div className="mt-10 flex gap-4 bg-white border border-cyan-500 border-dashed rounded-lg py-3 px-4 text-md w-full">
            <div className="p-3">
              <button
                className="bg-white border border-cyan-500 border-dashed rounded-lg text-md p-3"
                onClick={() => navigate(-1)}
                href="/patients">
                <img src="/images/leftArrow.png" alt="go back" />
              </button>
            </div>
            <div>
              <span className="absolute ml-[52px] mt-[88px] font-semibold bg-red-500 rounded-full px-2 py-0.5 text-sm text-white text-center">
                {patient.bloodGroup !== null && patient.bloodGroup !== "" ? (
                  <BloodType bloodType={patient.bloodGroup} />
                ) : (
                  "--"
                )}
              </span>
            </div>
            <div className="p-4 ml-36">
              <h1 className="text-xl font-semibold">
                {patient.name} {patient.surname}
              </h1>
              <p className="text-xs text-gray-500">{patient.phone}</p>
            </div>
          </div>
        </div>
        <div>
          <img
            src={
              patient.photo !== "null" &&
              patient.photo !== null &&
              patient.photo !== ""
                ? patient.photo
                : patient.gender === 2
                ? "/images/male.png"
                : patient.gender === 1
                ? "/images/female.png"
                : "/images/agender.png"
            }
            alt={patientName}
            className="mt-[-120px] ml-[100px] w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
          />
        </div>

        <div className="grid grid-cols-12 gap-6 my-8 items-center">
          <div className="col-span-12 flex flex-col items-center justify-center gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28 ">
            <div className="gap-2 flex-col justify-center items-center text-center">
              <h2 className="text-sm font-semibold">
                {patient.name} {patient.surname}
              </h2>
              <p className="text-xs text-gray-500">{patient.email}</p>
              <p className="text-xs">{patient.phone}</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 px-2 xl:px-12 w-full">
              <PatientStickyLink
                patientId={patientId}
                patientName={patientName}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6">
            <h1 className="text-sm font-medium sm:block hidden mb-2">
              Medical Records
            </h1>
            <MedicalRecords patientId={patientId} />
          </div>
        </div>
      </div>
    </>
  );
};

const MedicalRecords = ({ patientId }) => {
  const {
    data: treatments,
    isLoading: isLoadingTreatments,
    isError: isErrorTreatments,
  } = useGetTreatmentsQuery();

  if (isLoadingTreatments) return <p>Loading medical records...</p>;
  if (isErrorTreatments) return <p>Error fetching medical records.</p>;

  return (
    <>
      {treatments?.map((treatment) => (
        <PrescriptionDetails key={treatments.id} prescription={treatment} />
      ))}
    </>
  );
};

const PrescriptionDetails = ({ treatment }) => {
  console.log(treatment);
  const {
    data: medicines,
    isLoading: isLoadingMedicines,
    isError: isErrorMedicines,
  } = useGetPrescriptionMedicinesByPrescriptiontIdQuery(prescription.id);

  if (isLoadingMedicines) return <p>Loading medicines...</p>;
  if (isErrorMedicines) return <p>Error loading medicines.</p>;

  return (
    <div className="bg-cyan-50 items-start grid grid-cols-12 gap-4 rounded-xl border-[1px] border-cyan-100 p-6 mb-4">
      <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
        <p className="text-xs text-main font-light">
          <span className="font-medium">Complaint:</span>{" "}
          {prescription.complains}
        </p>
        <p className="text-xs text-main font-light">
          <span className="font-medium">Diagnosis:</span>{" "}
          {prescription.diognasis}
        </p>
        <p className="text-xs text-main font-light">
          <span className="font-medium">Treatment:</span>{" "}
          {prescription.vitalSigns}
        </p>
        <p className="text-xs text-main font-light">
          <span className="font-medium">Treatment:</span>{" "}
          {prescription.treatmentDetails}
        </p>
        <p className="text-xs text-main font-light">
          <span className="font-medium">Prescription:</span>
          {medicines?.map((medicine) => (
            <MedicineDetails key={medicine.id} medicine={medicine} />
          ))}
        </p>
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

  if (isLoading) return <li>Loading medicine name...</li>;
  if (isError) return <li>Error loading medicine name.</li>;

  return <> {medicineData?.name}, </>;
};

export default PatientMedicalRecords;
