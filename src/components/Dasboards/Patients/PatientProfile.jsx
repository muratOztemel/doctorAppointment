import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  useGetPatientByIdQuery,
  useUpdatePatientMutation,
} from "../../../redux/features/api/apiSlice";
import Spinner from "../../UI/Spinner";
import {
  FaBoxArchive,
  FaRegCalendarDays,
  FaUser,
  FaHeartPulse,
} from "react-icons/fa6";
import BloodType from "../Services/BloodType.jsx";
import { Link } from "react-router-dom";
import { countries } from "../Services/Countries";
import { bloodGroups } from "../Services/BloodGroups";
import { format } from "date-fns";
import { toast } from "react-toastify";
import PatientStickyLink from "../Services/PatientStickyLink.jsx";

const PatientProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: patientId } = useParams();

  const {
    data: patient,
    isError,
    isLoading,
  } = useGetPatientByIdQuery(patientId);
  const [updatePatient] = useUpdatePatientMutation();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [nationality, setNationality] = useState("TC");

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      nationality: "TC",
      identyType: "",
      identyNo: "",
      country: "",
      language: "",
      birthDate: "",
      gender: "",
      email: "",
      phoneNumber: "",
      bloodGroup: "",
      photo: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      surname: Yup.string().required("Surname is required"),
      nationality: Yup.string(),
      identyType: Yup.number(),
      identyNo: Yup.number(),
      country: Yup.string(),
      language: Yup.string(),
      birthDate: Yup.date(),
      gender: Yup.number(),
      email: Yup.string().email("Invalid email address"),
      phoneNumber: Yup.string(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "photo" && file) {
          formData.append("file", file);
        } else {
          formData.append(key, values[key]);
        }
      });
      await updatePatient({
        id: patient.id,
        updatedPatient: {
          id: patient.id,
          name: values.name,
          surname: values.surname,
          nationality: values.nationality,
          identyType: values.identyType,
          identyNo: values.identyNo,
          country: values.country,
          language: values.language,
          birthDate: values.birthDate,
          gender: Number(values.gender),
          email: values.email,
          phoneNumber: values.phoneNumber,
          bloodGroup: Number(values.bloodGroup),
          photo: file?.name
            ? `/images/fotos/patients/${file.name}`
            : patient.photo,
          userId: patient.userId,
        },
      });
      toast.success("Your profile has been updated successfully.", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  useEffect(() => {
    if (patient) {
      formik.setValues({
        name: patient.name,
        surname: patient.surname,
        nationality: patient.nationality,
        identyType: patient.identyType,
        identyNo: patient.identyNo,
        country: patient.country,
        language: patient.language,
        birthDate: patient.birthDate.split("T")[0], // Just date part
        gender: patient.gender,
        email: patient.email,
        phoneNumber: patient.phoneNumber,
        photo: patient.photo,
        bloodGroup: patient.bloodGroup,
      });
      if (patient.photo) {
        setPreview(patient.photo);
      }
    }
  }, [patient]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching patient.</p>;

  const inputClass =
    "block w-full h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  const bloodTypeOptions = [
    { id: 1, label: "A+" },
    { id: 2, label: "A-" },
    { id: 3, label: "B+" },
    { id: 4, label: "B-" },
    { id: 5, label: "AB+" },
    { id: 6, label: "AB-" },
    { id: 7, label: "0+" },
    { id: 8, label: "0-" },
  ];

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
            alt={`${patient.name} ${patient.surname}`}
            className="mt-[-120px] ml-[100px] w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
          />
          <div className="mt-[-146px] ml-[100px] w-36 h-36 rounded-full bg-white p-2 items-center"></div>
        </div>

        <div className="grid grid-cols-12 gap-6 my-8 items-start">
          <div className="col-span-12 flex flex-col items-center justify-center gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] p-6 lg:sticky top-28 ">
            <div className="gap-2 flex-col justify-center items-center text-center">
              <h2 className="text-sm font-semibold">
                {patient.name} {patient.surname}
              </h2>
              <p className="text-xs text-gray-500">{patient.email}</p>
              <p className="text-xs">{patient.phone}</p>
            </div>

            <div className="flex flex-col justify-center items-center gap-3 px-2 xl:px-12 w-full">
              <PatientStickyLink
                patientId={patientId}
                patientName={patientName}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-6 border-[1px]">
            <div className="flex flex-col gap-6">
              <form
                onSubmit={formik.handleSubmit}
                className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className={inputClass}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <small className="text-red-600">{formik.errors.name}</small>
                  )}
                </div>
                <div>
                  <label htmlFor="surname">Surname</label>
                  <input
                    id="surname"
                    name="surname"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.surname}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    onChange={formik.handleChange}
                    value={formik.values.country}
                    className={inputClass}>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {patient.country === ""
                          ? "Select Country"
                          : country === patient.country
                          ? country
                          : country}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="bloodGroup" className="block text-sm">
                    Blood Group
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    onChange={formik.handleChange}
                    value={formik.values.bloodGroup}
                    className={inputClass}>
                    <option>Select Blood Group</option>
                    {bloodTypeOptions.map((bloodGroup) => (
                      <option key={bloodGroup.id} value={bloodGroup.id}>
                        {patient.bloodGroup === ""
                          ? "Select Blood Group"
                          : bloodGroup.id === patient.bloodGroup
                          ? bloodGroup.label
                          : bloodGroup.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="language" className="block text-sm">
                    Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    onChange={formik.handleChange}
                    value={formik.values.language}
                    className={inputClass}>
                    {patient.language === "" ? (
                      <option>Select Language</option>
                    ) : patient.language === "Turkce" ? (
                      <>
                        <option value="Turkce">Turkce</option>
                        <option value="English">English</option>
                      </>
                    ) : (
                      <>
                        <option value="English">English</option>
                        <option value="Turkce">Turkce</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label htmlFor="birthDate" className="block text-sm">
                    Birthdate
                  </label>
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.birthDate}
                    className={inputClass}
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="gender" className="block text-sm">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                    className={inputClass}>
                    <option value="1">Female</option>
                    <option value="2">Male</option>
                    <option value="3">Agender</option>
                    <option value="4">Nothing</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label htmlFor="email" className="block text-sm">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    className={inputClass}
                    readOnly
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="phoneNumber" className="block text-sm">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    className={inputClass}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <small className="text-red-600">
                      {formik.errors.phoneNumber}
                    </small>
                  )}
                </div>
                <div>
                  <label htmlFor="file">Profile Image</label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                </div>
                {/* Nationality and Identity Details */}
                <div>
                  <div className="flex items-center mb-4 mt-6">
                    <label className="inline-flex items-center mr-6">
                      <input
                        type="radio"
                        name="nationality"
                        value="TC"
                        onChange={() => setNationality("TC")}
                        checked={nationality === "TC"}
                        className="form-radio"
                      />
                      <span className="ml-2">TC</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="nationality"
                        value="Other"
                        onChange={() => setNationality("Other")}
                        checked={nationality === "Other"}
                        className="form-radio"
                      />
                      <span className="ml-2">Other</span>
                    </label>
                  </div>
                  {nationality === "TC" && (
                    <div>
                      <label htmlFor="identyNo" className="block text-sm">
                        Identity Number
                      </label>
                      <input
                        id="identyNo"
                        name="identyNo"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.identyNo}
                        className={inputClass}
                      />
                    </div>
                  )}
                  {nationality === "Other" && (
                    <div>
                      <label htmlFor="identyType" className="block text-sm">
                        Identity Type
                      </label>
                      <select
                        id="identyType"
                        name="identyType"
                        onChange={formik.handleChange}
                        value={formik.values.identyType}
                        className={inputClass}>
                        <option value="">Select an Option</option>
                        <option value="Passport">Passport</option>
                        <option value="IdentyCard">Identity Card</option>
                      </select>
                    </div>
                  )}
                  {nationality === "Other" &&
                    formik.values.identyType === "Passport" && (
                      <div>
                        <label htmlFor="passportNo" className="block text-sm">
                          Passport Number
                        </label>
                        <input
                          id="passportNo"
                          name="passportNo"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.passportNo}
                          className={inputClass}
                        />
                      </div>
                    )}
                  {nationality === "Other" &&
                    formik.values.identyType === "IdentyCard" && (
                      <div>
                        <label htmlFor="identyCardNo" className="block text-sm">
                          Identity Card Number
                        </label>
                        <input
                          id="identyCardNo"
                          name="identyCardNo"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.identyCardNo}
                          className={inputClass}
                        />
                      </div>
                    )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 w-full col-span-3">
                  <button className="w-full flex justify-center items-center flex-rows gap-4 hover:opacity-80 transitions bg-red-500 text-white text-sm font-medium px-2 py-4 rounded">
                    Delete Patient
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
                    Update Patient
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
              {/*               <div className="flex justify-between items-center gap-4">
                <h1 className="text-sm font-medium sm:block hidden">
                  Medical Record
                </h1>
                <div className="sm:w-1/4 w-full">
                  <Link
                    to="/addMedical"
                    className="w-full flex flex-rows justify-center gap-4 hover:opacity-80 transitions bg-cyan-500 text-white text-sm font-medium px-2 py-4 rounded">
                    New Record
                  </Link>
                </div>
              </div>
              <div className="bg-cyan-50 items-start grid grid-cols-12 gap-4 rounded-xl border-[1px] border-cyan-100 p-6">
                <div className="col-span-12 md:col-span-2">
                  <p className="text-xs text-black font-medium">13, Jan 2021</p>
                </div>
                <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
                  <p className="text-xs text-main font-light">
                    <span className="font-medium">Complaint:</span> Bleeding
                    Gums, Toothache, bad breath
                  </p>
                  <p className="text-xs text-main font-light">
                    <span className="font-medium">Diagnosis:</span> Gingivitis,
                    Caries, Periodontitis
                  </p>
                  <p className="text-xs text-main font-light">
                    <span className="font-medium">Treatment:</span> Filling,
                    Post&amp;Core, Implant, Extraction
                  </p>
                  <p className="text-xs text-main font-light">
                    <span className="font-medium">Prescription:</span>{" "}
                    Paracetamol, Amoxicillin, Ibuprofen, Asp...
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4 flex flex-rows gap-2 ml-28">
                  <button className="flex justify-center items-center text-sm bg-cyan-300 hover:bg-cyan-500 hover:text-amber-500 text-white border-cyan-50 border-opacity-5 hover:border-cyan-500 rounded-md w-2/4 md:w-10 h-10">
                    <img src="/images/eye.png" alt="detail" className="h-7" />
                  </button>
                  <button className="flex justify-center items-center text-sm bg-red-300 hover:bg-red-500 hover:text-amber-500 text-white border-red-50 border-opacity-5 hover:border-red-500 rounded-md w-2/4 md:w-10 h-10">
                    <img
                      src="/images/delete.png"
                      alt="detail"
                      className="h-4"
                    />
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
