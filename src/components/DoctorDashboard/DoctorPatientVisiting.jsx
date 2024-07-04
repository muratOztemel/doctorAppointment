import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DefaultImage from "../hooks/DefaultImage";
import { useSelector } from "react-redux";
import {
  useGetPatientByIdQuery,
  useGetAppointmentByIdQuery,
  useAddNewTreatmentMutation,
  useUpdateTreatmentMutation,
  useGetTreatmentsQuery,
  useGetTreatmentByIdQuery,
  useAddNewPrescriptionMutation,
  useAddNewPrescriptionMedicineMutation,
  useGetPrescriptionsQuery,
  useGetPrescriptionMedicinesByTreatmentIdQuery,
  useAppointmentUpdateMutation,
} from "../../redux/features/api/apiSlice";
import BloodType from "../Dasboards/Services/BloodType";
import ModalMedicine from "./ModalMedicine";
import { toast } from "react-toastify";
import { format } from "date-fns";
import PatientStickyLink from "./PatientStickyLink";

const DoctorPatientVisiting = () => {
  const [treatmentId, setTreatmentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicinesData, setSelectedMedicinesData] = useState([]);
  const navigate = useNavigate();
  const { id: patientIdParam, apId: appointmentIdParam } = useParams();
  const { doctorId } = useSelector((state) => state.doctors);

  const patientId = Number(patientIdParam);
  const appointmentId = Number(appointmentIdParam);
  const doctorIdNumber = Number(doctorId);

  const {
    data: patient,
    isError: isErrorPatient,
    isLoading: isLoadingPatient,
  } = useGetPatientByIdQuery(patientId, {
    skip: !patientId,
  });

  const {
    data: appointment,
    isError: isErrorAppointment,
    isLoading: isLoadingAppointment,
  } = useGetAppointmentByIdQuery(appointmentId, {
    skip: !appointmentId,
  });

  const {
    data: treatments,
    isLoading: isLoadingTreatments,
    isError: isErrorTreatments,
  } = useGetTreatmentsQuery();

  const { data: prescriptions } = useGetPrescriptionsQuery();
  const { data: prescriptionMedicinesByTreatmentId } =
    useGetPrescriptionMedicinesByTreatmentIdQuery(treatmentId, {
      skip: !treatmentId,
    });

  const [addNewTreatment] = useAddNewTreatmentMutation();
  const [addNewPrescription] = useAddNewPrescriptionMutation();
  const [updateTreatment] = useUpdateTreatmentMutation();
  const [updateAppointment] = useAppointmentUpdateMutation();
  const [addNewPrescriptionMedicine] = useAddNewPrescriptionMedicineMutation();

  const formik = useFormik({
    initialValues: {
      complains: "",
      diagnosis: "",
      vitalSigns: "",
      treatmentDetails: "",
      prescriptions: [],
    },
    validationSchema: Yup.object({
      complains: Yup.string().required("Complains is required"),
      diagnosis: Yup.string().required("Diagnosis is required"),
      vitalSigns: Yup.string().required("Vital signs are required"),
      treatmentDetails: Yup.string().required("Treatment details are required"),
    }),
    onSubmit: async (values) => {
      console.log("Selected Medicines Data:", selectedMedicinesData);
      try {
        const treatmentData = {
          doctorId: doctorIdNumber,
          patientId,
          apointmentId: appointmentId,
          complains: values.complains,
          diognasis: values.diagnosis,
          vitalSigns: values.vitalSigns,
          treatmentDetails: values.treatmentDetails,
        };

        const result = await updateTreatment({
          id: treatmentId,
          updatedTreatment: {
            id: treatmentId,
            ...treatmentData,
          },
        });

        const resultPR = await addNewPrescription({
          treatmentId: treatmentId,
          description: values.treatmentDetails,
        });

        console.log("Prescription Result:", resultPR.data);

        const promises = selectedMedicinesData.map((medicine) =>
          medicine.medicines.map((med) => {
            const instructionValue = med.instructions === "before meal" ? 0 : 1;
            const prescriptionMedicineData = {
              prescriptionId: resultPR.data.id,
              medicineId: med.id,
              dosage: med.dosage || "No dosage",
              instruction: instructionValue,
              description: med.description || "No description",
              morningUsage: medicine.dosages.morning ?? false,
              afternoonUsage: medicine.dosages.afternoon ?? false,
              eveningUsage: medicine.dosages.evening ?? false,
            };
            console.log(
              "Prescription Medicine Data:",
              prescriptionMedicineData
            );
            return addNewPrescriptionMedicine(prescriptionMedicineData);
          })
        );

        await Promise.all(promises.flat());

        const resultAp = await updateAppointment({
          id: appointmentId,
          updatedAppointment: {
            id: appointmentId,
            doctorId: doctorIdNumber,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            patientId,
            status: 2,
          },
        });

        console.log(resultAp);

        toast.success("The treatment has been created successfully.", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        console.error("Error creating treatment or prescription:", error);
        toast.error("An error occurred while creating the treatment.", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    const checkAndCreateTreatment = async () => {
      try {
        const existingTreatment = treatments?.find((treatment) => {
          console.log(
            `Checking treatment ${treatment.id} with appointmentId ${treatment.apointmentId}`
          );
          return treatment.apointmentId === appointmentId;
        });
        console.log("existingTreatment:", existingTreatment);

        if (existingTreatment) {
          console.log("Existing treatment found:", existingTreatment);
          setTreatmentId(existingTreatment.id);

          // Update formik values with the existing treatment data
          formik.setValues({
            complains: existingTreatment.complains || "",
            diagnosis: existingTreatment.diognasis || "",
            vitalSigns: existingTreatment.vitalSigns || "",
            treatmentDetails: existingTreatment.treatmentDetails || "",
            prescriptions: prescriptions
              .filter(
                (prescription) =>
                  prescription.treatmentId === existingTreatment.id
              )
              .map((prescription) => ({
                ...prescription,
                medicines:
                  prescriptionMedicinesByTreatmentId?.filter(
                    (medicine) => medicine.prescriptionId === prescription.id
                  ) || [],
              })),
          });
          setSelectedMedicinesData(
            prescriptions
              .filter(
                (prescription) =>
                  prescription.treatmentId === existingTreatment.id
              )
              .map((prescription) => ({
                id: prescription.id,
                medicines:
                  prescriptionMedicinesByTreatmentId?.filter(
                    (medicine) => medicine.prescriptionId === prescription.id
                  ) || [],
              }))
          );
        } else {
          console.log("Creating new treatment...");
          const result = await addNewTreatment({
            doctorId: doctorIdNumber,
            patientId,
            apointmentId: appointmentId,
            complains: "",
            diognasis: "",
            vitalSigns: "",
            treatmentDetails: "",
          });
          console.log(result);
          if (result.data && result.data.id) {
            console.log("New treatment created:", result.data);
            setTreatmentId(result.data.id);
          } else {
            throw new Error("Failed to create new treatment");
          }
        }
      } catch (error) {
        console.error("Error in checkAndCreateTreatment:", error);
      }
    };

    if (appointmentId) {
      checkAndCreateTreatment();
    }
  }, [appointmentId]);

  if (isLoadingPatient || isLoadingAppointment || isLoadingTreatments) {
    return <div>Loading...</div>;
  }

  if (isErrorPatient || isErrorAppointment || isErrorTreatments) {
    return <div>Error loading data.</div>;
  }

  const inputClass =
    "block pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? "--" : format(date, "yyyy-MM-dd");
  };

  const formatTime = (timeStr) => {
    const time = new Date(`1970-01-01T${timeStr}Z`);
    return isNaN(time.getTime()) ? "--" : format(time, "HH:mm");
  };

  const handleRemoveMedicine = (medicineId) => {
    setSelectedMedicinesData((prevState) =>
      prevState.filter((medicine) => medicine.id !== medicineId)
    );
  };

  const patientName = `${patient?.name} ${patient?.surname}`;

  return (
    <>
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
          <p className="text-xs text-gray-500">{patient.phoneNumber}</p>
        </div>
        <div className="ml-auto p-4">
          <p className="text-3xl text-green-500">
            {appointment.appointmentDate
              ? formatDate(appointment.appointmentDate)
              : "--"}{" "}
            {appointment.appointmentTime
              ? formatTime(appointment.appointmentTime)
              : "--"}
          </p>
        </div>
      </div>
      <div>
        <img
          src={DefaultImage(patient)}
          alt={appointment?.patientFullName || "Patient"}
          className="mt-[-120px] ml-[100px] w-36 h-36 bg-white rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
        />
      </div>

      <div className="grid grid-cols-12 gap-6 my-8 items-start">
        <div className="col-span-12 flex flex-col items-center justify-center gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28 ">
          <div className="gap-2 flex-col justify-center items-center text-center">
            <h2 className="text-sm font-semibold">
              {patient.name} {patient.surname}
            </h2>
            <p className="text-xs text-gray-500">{patient.email}</p>
            <p className="text-xs text-center">{patient.phone}</p>
          </div>

          <div className="flex flex-col gap-3 px-2 xl:px-12 w-full">
            <PatientStickyLink
              patientId={patientId}
              patientName={patientName}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6">
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center justify-between font-semibold text-gray-900 leading-8">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">Patient Visiting</span>
              </div>
            </div>

            <div className="text-gray-700">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col text-sm">
                  <div className="px-4 py-2 font-semibold">Complains</div>
                  <div className="px-4 py-2 w-full">
                    <textarea
                      rows="2"
                      name="complains"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.complains}
                      className={`${inputClass} w-full`}></textarea>
                    {formik.touched.complains && formik.errors.complains && (
                      <small className="text-red-600">
                        {formik.errors.complains}
                      </small>
                    )}
                  </div>
                </div>
                <div className="flex flex-col text-sm">
                  <div className="px-4 py-2 font-semibold">Diagnosis</div>
                  <div className="px-4 py-2 w-full">
                    <textarea
                      rows="2"
                      name="diagnosis"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.diagnosis}
                      className={`${inputClass} w-full`}></textarea>
                    {formik.touched.diagnosis && formik.errors.diagnosis && (
                      <small className="text-red-600">
                        {formik.errors.diagnosis}
                      </small>
                    )}
                  </div>
                </div>
                <div className="flex flex-col text-sm">
                  <div className="px-4 py-2 font-semibold">Vital Signs</div>
                  <div className="px-4 py-2 w-full">
                    <textarea
                      rows="2"
                      name="vitalSigns"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.vitalSigns}
                      className={`${inputClass} w-full`}></textarea>
                    {formik.touched.vitalSigns && formik.errors.vitalSigns && (
                      <small className="text-red-600">
                        {formik.errors.vitalSigns}
                      </small>
                    )}
                  </div>
                </div>
                <div className="flex flex-col text-sm">
                  <div className="px-4 py-2 font-semibold">
                    Treatment Details
                  </div>
                  <div className="px-4 py-2 w-full">
                    <textarea
                      rows="2"
                      name="treatmentDetails"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.treatmentDetails}
                      className={`${inputClass} w-full`}></textarea>
                    {formik.touched.treatmentDetails &&
                      formik.errors.treatmentDetails && (
                        <small className="text-red-600">
                          {formik.errors.treatmentDetails}
                        </small>
                      )}
                  </div>
                </div>
                <div className="flex flex-col text-sm">
                  <div className="px-4 py-2 font-semibold">Medicine</div>
                  {selectedMedicinesData.length > 0 && (
                    <div className="w-full flex flex-col gap-2 px-4 py-2">
                      {selectedMedicinesData.map((medicine, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 border border-cyan-500 rounded-lg">
                          {medicine.medicines}
                          <div>
                            <span className="font-semibold text-sm">
                              {medicine.medicines
                                .map((med) => med.name)
                                .join(", ")}
                            </span>
                            <div>
                              Quantity: {medicine.quantity}, Dosage Quantity:{" "}
                              {medicine.dosageQuantity}, Instructions:{" "}
                              {medicine.instructions}
                            </div>
                            <div>
                              Dosages:{" "}
                              {Object.entries(medicine.dosages || {})
                                .filter(([key, value]) => value)
                                .map(([key]) => key)
                                .join(", ")}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="w-12 h-10 bg-cyan-100 text-cyan-600 rounded-md flex justify-center items-center mr-4"
                            onClick={() => handleRemoveMedicine(medicine.id)}>
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 352 512"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg">
                              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-sm">
                  <div className="px-4 py-2 font-semibold">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="text-cyan-500 flex justify-center gap-2 rounded-lg border border-cyan-500 border-dashed py-4 w-full text-sm">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                      </svg>{" "}
                      Add Medicine
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 w-full col-span-3">
                  <button
                    type="button"
                    className="w-full flex justify-center items-center flex-rows gap-4 hover:opacity-80 transitions bg-red-500 text-white text-sm font-medium px-2 py-4 rounded"
                    onClick={() => navigate(-1)}>
                    Cancel Visiting
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-white text-xl"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path>
                    </svg>
                  </button>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center flex-rows gap-4 hover:opacity-80 transitions bg-green-700 text-white text-sm font-medium px-2 py-4 rounded">
                    Finish Visiting
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="text-white text-xl"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalMedicine
          onConfirm={(medicinesData) => {
            console.log("Medicines Data from Modal:", medicinesData);
            setSelectedMedicinesData([...selectedMedicinesData, medicinesData]);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default DoctorPatientVisiting;
