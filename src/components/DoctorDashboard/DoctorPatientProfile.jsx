import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  useGetPatientByIdQuery,
  useUpdatePatientMutation,
} from "../../redux/features/api/apiSlice";
import Spinner from "../UI/Spinner";
import {
  FaBoxArchive,
  FaRegCalendarDays,
  FaUser,
  FaHeartPulse,
} from "react-icons/fa6";
import BloodType from "../Dasboards/Services/BloodType";
import { Link } from "react-router-dom";
import { countries } from "../Dasboards/Services/Countries";
import { bloodGroups } from "../Dasboards/Services/BloodGroups";

const DoctorPatientProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: patientId } = useParams();

  const {
    data: patient,
    isError,
    isLoading,
  } = useGetPatientByIdQuery(patientId);
  const [updatePatient, { isSuccess }] = useUpdatePatientMutation();
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
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "photo" && file) {
          formData.append("file", file);
        } else {
          formData.append(key, values[key]);
        }
      });
      updatePatient({ id, formData });
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
  if (isSuccess) return <p>Patient updated successfully!</p>;

  const inputClass =
    "block w-60 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  return (
    <>
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
            <p className="text-xs text-gray-500">{patient.phoneNumber}</p>
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
      </div>

      <div className="grid grid-cols-12 gap-6 my-8 items-start">
        <div className="col-span-12 flex flex-col items-center justify-center gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28 ">
          <div className="gap-2 flex-col justify-center items-center text-center">
            <h2 className="text-sm font-semibold">
              {patient.name} {patient.surname}
            </h2>
            <p className="text-xs text-gray-500">{patient.email}</p>
            <p className="text-xs">{patient.phone}</p>
          </div>

          <div className="flex flex-col gap-3 px-2 xl:px-12 w-full">
            <Link
              to="/addMedical"
              className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
              <FaBoxArchive /> Medical Records
            </Link>
            <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
              <FaRegCalendarDays />
              Appointments
            </button>
            <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
              <FaUser /> Patient information
            </button>
            <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
              <FaHeartPulse />
              Health information
            </button>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="name">Name</label>
              <p>{patient.name}</p>
            </div>
            <div>
              <label htmlFor="surname">Surname</label>
              <p>{patient.surname}</p>
            </div>
            <div>
              <label htmlFor="country" className="block text-sm">
                Country
              </label>
              <p>{patient.country}</p>
            </div>
            <div>
              <label htmlFor="bloodGroup" className="block text-sm">
                Blood Group
              </label>
              <p>{patient.bloodGroup}</p>
            </div>
            <div>
              <label htmlFor="language" className="block text-sm">
                Language
              </label>
              <p>{patient.language}</p>
            </div>
            <div>
              <label htmlFor="birthDate" className="block text-sm">
                Birthdate
              </label>
              {patient.birthDate.split("T")[0]}
            </div>
            <div className="col-span-1">
              <label htmlFor="gender" className="block text-sm">
                Gender
              </label>
              <p>{patient.gender}</p>
            </div>
            <div className="col-span-1">
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              {patient.email}
            </div>
            <div className="col-span-1">
              <label htmlFor="phoneNumber" className="block text-sm">
                Phone Number
              </label>
              {patient.phoneNumber}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorPatientProfile;
