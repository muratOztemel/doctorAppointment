import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useGetDoctorByIdQuery } from "../../../redux/features/api/apiSlice";
import Spinner from "../../UI/Spinner";
import { FaRegCalendarDays, FaUser, FaUserDoctor } from "react-icons/fa6";
import { TbLockAccess } from "react-icons/tb";
import BloodType from "../Services/BloodType.jsx";
import { RiLockPasswordLine } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useGetBranchesQuery,
  useUpdateDoctorMutation,
  useUpdateDoctorInfosMutation,
  useGetDoctorInfoByDoctorIdQuery,
} from "../../../redux/features/api/apiSlice";
import { countries } from "../Services/Countries";
import { format } from "date-fns";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: doctorId } = useParams();
  const { data: doctor, isError, isLoading } = useGetDoctorByIdQuery(doctorId);
  const {
    data: doctorInfo,
    isDoctorInfoError,
    isDoctorInfoLoading,
  } = useGetDoctorInfoByDoctorIdQuery(doctorId);
  const [formInitialized, setFormInitialized] = useState(false);
  const [nationality, setNationality] = useState("TC");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
  const { data: branches, isLoading: isLoadingBranches } =
    useGetBranchesQuery();
  const [updateDoctor] = useUpdateDoctorMutation();
  const [updateDoctorInfos] = useUpdateDoctorInfosMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      title: "",
      branchId: 0,
      email: "",
      phoneNumber: "",
      photo: "",
      nationality: "TC",
      identyNo: "",
      identyType: "",
      // passportNo: "",
      // identyCardNo: "",
      country: "",
      language: "",
      gender: 0,
      birthDate: "",
      about: "",
      members: "",
      articles: "",
      education: "",
      experience: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      surname: Yup.string().required("Surname is required"),
      title: Yup.string().required("Title is required"),
      branchId: Yup.number().required("Branch name is required"),
      email: Yup.string(),
      phoneNumber: Yup.string().required("Phone number is required"),
      photo: Yup.mixed(),
      identyNo: Yup.string(),
      // passportNo: Yup.string(),
      // identyCardNo: Yup.string(),
      country: Yup.string(),
      language: Yup.string(),
      gender: Yup.string(),
      birthDate: Yup.date(),
      about: Yup.string(),
      members: Yup.string(),
      articles: Yup.string(),
      education: Yup.string(),
      experience: Yup.string(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }

      await updateDoctor({
        id: doctorId,
        updatedDoctor: {
          id: doctorId,
          branchId: Number(values.branchId),
          name: values.name,
          surname: values.surname,
          title: values.title,
          userId: doctor.userId,
        },
      });

      const result = await updateDoctorInfos({
        id: doctorInfo.id,
        updatedDoctorInfos: {
          id: doctorInfo.id,
          doctorId: doctorId,
          email: values.email,
          phoneNumber: values.phoneNumber,
          nationality: values.nationality,
          identyType: values.identyType,
          identyNo: values.identyNo,
          country: values.country,
          language: values.language,
          birthDate: values.birthDate,
          gender: Number(values.gender),
          education: values.education,
          experience: values.experience,
          photo: file?.name
            ? `/images/fotos/doctors/${file.name}`
            : doctor.doctorInfo.photo,
          about: values.about,
          members: values.members,
          articles: values.articles,
        },
      });
      console.log(result);
      toast.success("Your transaction has been completed successfully.", {
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
    if (!isLoading && doctor) {
      formik.setValues({
        name: doctor?.name || "",
        surname: doctor?.surname || "",
        title: doctor?.title || "",
        branchId: doctor?.branchId || 0,
        email: doctor?.doctorInfo.email || "",
        phoneNumber: doctor?.doctorInfo?.phoneNumber || "",
        photo: doctor?.doctorInfo?.photo || "",
        nationality: doctor?.doctorInfo?.nationality || "TC",
        identyNo: doctor?.doctorInfo?.identyNo || "",
        identyType: doctor?.doctorInfo?.identyType || "",
        passportNo: doctor?.doctorInfo?.passportNo || "",
        identyCardNo: doctor?.doctorInfo?.identyCardNo || "",
        country: doctor?.doctorInfo?.country || "",
        language: doctor?.doctorInfo?.language || "",
        gender: doctor?.doctorInfo?.gender || 0,
        birthDate: format(doctor?.doctorInfo?.birthDate, "yyyy-MM-dd") || "",
        about: doctor?.doctorInfo?.about || "",
        members: doctor?.doctorInfo?.members || "",
        articles: doctor?.doctorInfo?.articles || "",
        education: doctor?.doctorInfo?.education || "",
        experience: doctor?.doctorInfo?.experience || "",
      });
      setFormInitialized(true);
    }
  }, [isLoading, doctor]);

  if (isLoading || !formInitialized || !branches || isDoctorInfoLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isDoctorInfoError) {
    return <div>Error loading the doctor s data!</div>;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      formik.setFieldValue("photo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass =
    "block w-60 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  if (isError) return <div>Error: {isError.toString()}</div>;

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="xl:px-8 px-2">
        <div className="flex items-center text-center gap-4">
          <div className="mt-10 flex gap-4 bg-white border border-cyan-500 border-dashed rounded-lg py-3 px-4 text-md w-full">
            <div className="p-3">
              <button
                className="bg-white border border-cyan-500 border-dashed rounded-lg text-md p-3"
                onClick={() => navigate(-1)}
                href="/doctors">
                <img src="/images/leftArrow.png" alt="go back" />
              </button>
            </div>
            <div>
              <span className="absolute ml-[52px] mt-[88px] font-semibold bg-red-500 rounded-full px-2 py-0.5 text-sm text-white text-center">
                {doctor.bloodGroup !== null && doctor.bloodGroup !== "" ? (
                  <BloodType bloodType={doctor.bloodGroup} />
                ) : (
                  "--"
                )}
              </span>
            </div>
            <div className="p-4 ml-36">
              <h1 className="text-xl font-semibold">
                {doctor.name} {doctor.surname}
              </h1>
              <p className="text-xs text-gray-500">
                {doctor?.doctorInfo?.phoneNumber}
              </p>
            </div>
          </div>
        </div>
        <div>
          <img
            src={
              doctor?.doctorInfo?.photo !== "null" &&
              doctor?.doctorInfo?.photo !== null &&
              doctor?.doctorInfo?.photo !== ""
                ? doctor.doctorInfo.photo
                : ""
            }
            alt={`${doctor.name} ${doctor.surname}`}
            className="mt-[-120px] ml-[100px] w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
          />
        </div>

        <div className="grid grid-cols-12 gap-6 my-8 items-start">
          <div className="col-span-12 flex flex-col items-center justify-center gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-cyan-500 p-6 lg:sticky top-28 ">
            <div className="gap-2 flex-col justify-center items-center text-center">
              <h2 className="text-sm font-semibold">
                {doctor.name} {doctor.surname}
              </h2>
              <p className="text-xs text-gray-500">{doctor.email}</p>
              <p className="text-xs">{doctor.phone}</p>
            </div>

            <div className="flex flex-col gap-3 px-2 xl:px-12 w-full">
              <Link className=" bg-cyan-500  text-white text-sm gap-4 flex items-center w-full p-4 rounded">
                <FaUserDoctor />
                Personal Information
              </Link>
              <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
                <FaUser />
                Patients
              </button>
              <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
                <FaRegCalendarDays /> Appointments
              </button>
              <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
                <TbLockAccess />
                Access Control
              </button>
              <button className="bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white text-sm gap-4 flex items-center w-full p-4 rounded">
                <RiLockPasswordLine />
                Change Password
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3  gap-3 lg:col-span-8 bg-white rounded-xl border-[1px] border-cyan-500 p-6">
            <form
              onSubmit={formik.handleSubmit}
              className="grid grid-cols-3 gap-3 lg:col-span-8">
              <div className="flex gap-3 flex-col w-full col-span-2">
                <p className="text-sm">Profile Image</p>
                <div className="w-full text-center grid grid-cols-12 gap-4">
                  <div
                    className="px-6 lg:col-span-10 sm:col-span-8 col-span-12 pt-5 pb-6 border-2 border-dashed border-cyan-100 rounded-md cursor-pointer"
                    role="presentation"
                    tabIndex="0">
                    <input
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                    />

                    <p className="text-sm mt-2">
                      Drag your image here or click to select
                    </p>

                    <em className="text-xs text-gray-400">
                      (Only *.jpeg and *.png images will be accepted)
                    </em>
                  </div>
                  <div className="lg:col-span-2 sm:col-span-4 col-span-12">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : doctor?.doctorInfo?.photo ? (
                      <img
                        src={
                          doctor?.doctorInfo?.photo !== "null" &&
                          doctor?.doctorInfo?.photo !== null &&
                          doctor?.doctorInfo?.photo !== ""
                            ? doctor.doctorInfo.photo
                            : ""
                        }
                        alt={`${doctor.name} ${doctor.surname}`}
                        className="w-full h-32 rounded object-cover"
                      />
                    ) : (
                      <img
                        src="/images/icons/300x300.png"
                        alt="preview"
                        className="w-full h-32 rounded object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* Nationality and Identity Details */}
              <div className="col-span-1">
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
              <div className="col-span-1">
                <p className="text-sm">Title</p>
                <input
                  id="title"
                  name="title"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  className={inputClass}
                />
                {formik.touched.title && formik.errors.title && (
                  <small className="text-red-600">{formik.errors.title}</small>
                )}
              </div>
              <div className="col-span-1">
                <label htmlFor="name" className="block text-sm">
                  Name
                </label>
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
              <div className="col-span-1">
                <label htmlFor="surname" className="block text-sm">
                  Surname
                </label>
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.surname}
                  className={inputClass}
                />
                {formik.touched.surname && formik.errors.surname && (
                  <small className="text-red-600">
                    {formik.errors.surname}
                  </small>
                )}
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
                <label htmlFor="branchId" className="block text-sm">
                  Branches
                </label>
                <select
                  id="branchId"
                  name="branchId"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.branchId}
                  className={inputClass}>
                  <option>Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.id === 0
                        ? "Select Branch"
                        : branch.id === doctor.branchId
                        ? branch.name
                        : branch.name}
                    </option>
                  ))}
                  {formik.touched.branchId && formik.errors.branchId && (
                    <small className="text-red-600">
                      {formik.errors.branchId}
                    </small>
                  )}
                </select>
              </div>
              <div className="col-span-1">
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
                <label htmlFor="email" className="block text-sm">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  readOnly
                  className={inputClass}
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
              <div className="col-span-1">
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
                      {doctor.country === ""
                        ? "Select Country"
                        : country === doctor.country
                        ? country
                        : country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1">
                <label htmlFor="language" className="block text-sm">
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  onChange={formik.handleChange}
                  value={formik.values.language}
                  className={inputClass}>
                  {doctor.language === "" ? (
                    <option>Select Language</option>
                  ) : doctor.language === "Turkce" ? (
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
              <div className="col-span-3">
                <p className="text-sm">Members</p>
                <textarea
                  id="members"
                  name="members"
                  rows="3"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.members}
                  className={`${inputClass} !w-full`}
                />
                {formik.touched.members && formik.errors.members && (
                  <small className="text-red-600">
                    {formik.errors.members}
                  </small>
                )}
              </div>
              <div className="col-span-3">
                <p className="text-sm">Articles</p>
                <textarea
                  id="articles"
                  name="articles"
                  rows="3"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.articles}
                  className={`${inputClass} !w-full`}
                />
              </div>
              <div className="col-span-3">
                <p className="text-sm">Education</p>
                <textarea
                  id="education"
                  name="education"
                  rows="3"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.education}
                  className={`${inputClass} !w-full`}
                />
              </div>
              <div className="col-span-3">
                <p className="text-sm">Experience</p>
                <textarea
                  id="experience"
                  name="experience"
                  rows="3"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.experience}
                  className={`${inputClass} !w-full`}
                />
              </div>
              <div className="col-span-3">
                <p className="text-sm">About</p>
                <textarea
                  id="about"
                  name="about"
                  rows="3"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.about}
                  className={`${inputClass} !w-full`}
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 w-full col-span-3">
                <button className="w-full flex justify-center items-center flex-rows gap-4 hover:opacity-80 transitions bg-red-500 text-white text-sm font-medium px-2 py-4 rounded">
                  Delete Doctor
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
                  Save Changes
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
            </form>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
