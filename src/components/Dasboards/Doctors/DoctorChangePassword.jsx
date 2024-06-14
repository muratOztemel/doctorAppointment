import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetDoctorByIdQuery,
  useGetDoctorInfoByDoctorIdQuery,
  useGetBranchesQuery,
  useUpdateUserMutation,
  useGetUserByIdQuery,
} from "../../../redux/features/api/apiSlice.js";
import Spinner from "../../UI/Spinner.jsx";
import BloodType from "../Services/BloodType.jsx";
import DoctorStickyLink from "../Services/DoctorStickyLink.jsx";
import { toast } from "react-toastify";

const DoctorChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id: doctorId } = useParams();
  doctorId = Number(doctorId);

  const {
    data: doctor,
    isError: isErrorDoctor,
    isLoading: isLoadingDoctor,
  } = useGetDoctorByIdQuery(doctorId, { skip: !doctorId });

  const {
    data: doctorInfo,
    isDoctorInfoError,
    isDoctorInfoLoading,
  } = useGetDoctorInfoByDoctorIdQuery(doctorId);

  const {
    data: user,
    isError: isErrorUser,
    isLoading: isLoadingUser,
  } = useGetUserByIdQuery(doctor ? doctor.userId : null, {
    skip: !doctor || !doctor.userId,
  });

  const { data: branches, isLoading: isLoadingBranches } =
    useGetBranchesQuery();

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await updateUser({
          id: doctor.userId,
          updatedUser: {
            id: doctor.userId,
            email: user.userName,
            password: values.newPassword,
            status: true,
          },
        }).unwrap();
        toast.success("Password updated successfully", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        resetForm();
      } catch (error) {
        toast.error("Failed to update password", {
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
  });

  if (
    isLoadingDoctor ||
    isLoadingBranches ||
    isDoctorInfoLoading ||
    isLoadingUser
  ) {
    return <div>Loading...</div>;
  }

  if (isErrorDoctor || isDoctorInfoError || isErrorUser) {
    return <div>Error loading the doctor's data!</div>;
  }

  const doctorName = `${doctor?.name} ${doctor?.surname}`;

  const inputClass =
    "block w-full h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

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
              <h1 className="text-xl font-semibold">{doctorName}</h1>
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
            alt={doctorName}
            className="mt-[-120px] ml-[100px] w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
          />
        </div>

        <div className="grid grid-cols-12 gap-6 my-8 items-start">
          <div className="col-span-12 flex flex-col items-center justify-center gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] p-6 lg:sticky top-28 ">
            <div className="gap-2 flex-col justify-center items-center text-center">
              <h2 className="text-sm font-semibold">{doctorName}</h2>
              <p className="text-xs text-gray-500">{doctor.email}</p>
              <p className="text-xs">{doctor.phone}</p>
            </div>

            <div className="flex flex-col justify-center items-center gap-3 px-2 xl:px-12 w-full">
              <DoctorStickyLink doctorId={doctorId} doctorName={doctorName} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:col-span-8 bg-white rounded-xl border-[1px] p-6">
            <form
              onSubmit={formik.handleSubmit}
              className="col-span-3 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                  <input
                    type="password"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputClass} ${
                      formik.touched.newPassword && formik.errors.newPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm`}
                  />
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.newPassword}
                    </div>
                  ) : null}
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputClass} ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm`}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                </label>
              </div>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorChangePassword;
