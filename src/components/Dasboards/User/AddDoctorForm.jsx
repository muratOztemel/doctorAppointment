import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import {
  useGetUsersQuery,
  useGetBranchesQuery,
  useAddNewDoctorMutation,
  useAddNewDoctorInfosMutation,
} from "../../../redux/features/api/apiSlice";
import { countries } from "../Services/Countries";

const AddDoctorForm = ({ onClose, user }) => {
  const [nationality, setNationality] = useState("TC");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
  const { data: branches, isLoading: isLoadingBranches } =
    useGetBranchesQuery();
  const [addNewDoctor] = useAddNewDoctorMutation();
  const [addNewDoctorInfos] = useAddNewDoctorInfosMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      title: "",
      branchId: 0,
      email: "",
      phoneNumber: "",
      photo: null,
      nationality: "TC",
      identyNo: "",
      identyType: "",
      passportNo: "",
      identyCardNo: "",
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
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      surname: Yup.string().required("Surname is required"),
      title: Yup.string().required("Title is required"),
      branchId: Yup.number().required("Branch name is required"),
      email: Yup.string(),
      phoneNumber: Yup.string().required("Phone number is required"),
      photo: Yup.mixed(),
      identyNo: Yup.string(),
      passportNo: Yup.string(),
      identyCardNo: Yup.string(),
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
      console.log("branchId", values.branchId);
      console.log(typeof values.branchId);
      console.log("userId", user.id);
      console.log("gender", values.gender);
      console.log("photo", formData);
      let result = await addNewDoctor({
        branchId: Number(values.branchId),
        name: values.name,
        surname: values.surname,
        title: values.title,
        userId: user.id,
      }).unwrap();
      console.log(result, "result");

      let infoResult = await addNewDoctorInfos({
        doctorId: result.doctorId,
        email: values.email,
        phoneNumber: values.phoneNumber,
        userId: user.id,
        nationality: values.nationality,
        identyType: values.identyType,
        identyNo: values.identyNo,
        country: values.country,
        language: values.language,
        birthDate: values.birthDate,
        gender: Number(values.gender),
        education: values.education,
        experience: values.experience,
        photo: "",
        about: values.about,
        members: values.members,
        articles: values.articles,
      }).unwrap();
      console.log("infoResult", infoResult);
    },
  });

  if (isLoadingUsers || isLoadingBranches) {
    return <div>Loading...</div>;
  }

  const handleOutsideClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

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

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-cyan-50 p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3">
              <div className="flex gap-3 flex-col w-full col-span-6">
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
                  <div className="lg:col-span-2 sm:col-span-4 col-span-12 bg-gray-200 flex justify-center items-center h-full text-3xl text-gray-400">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>+</span>
                    )}
                  </div>
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
                <small className="text-red-600">{formik.errors.surname}</small>
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
                <option>Select Gender</option>
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
                    {branch.name}
                  </option>
                ))}
              </select>
              {formik.touched.branchId && formik.errors.branchId && (
                <small className="text-red-600">{formik.errors.branchId}</small>
              )}
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
                readOnly
                value={user.userName}
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
                <option>Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
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
                <option>Select Language</option>
                <option value="Turkish">Turkish</option>
                <option value="English">English</option>
              </select>
            </div>
            <div className="col-span-1">
              <p className="text-sm">Members</p>
              <input
                id="members"
                name="members"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.members}
                className={inputClass}
              />
              {formik.touched.members && formik.errors.members && (
                <small className="text-red-600">{formik.errors.members}</small>
              )}
            </div>
            <div className="col-span-1">
              <p className="text-sm">Articles</p>
              <input
                id="articles"
                name="articles"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.articles}
                className={inputClass}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm">Education</p>
              <input
                id="education"
                name="education"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.education}
                className={inputClass}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm">Experience</p>
              <input
                id="experience"
                name="experience"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.experience}
                className={inputClass}
              />
            </div>
            <div className="col-span-1">
              <p className="text-sm">About</p>
              <input
                id="about"
                name="about"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.about}
                className={inputClass}
              />
            </div>
            <div className="col-span-3">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
                Submit
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorForm;
