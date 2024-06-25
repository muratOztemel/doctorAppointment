import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetDoctorByIdQuery,
  useGetDoctorInfoByDoctorIdQuery,
  useGetHolidayByDoctorIdQuery,
  useAddNewHolidayMutation,
  useUpdateHolidayMutation,
  useDeleteHolidayMutation,
  useGetBranchesQuery,
} from "../../../redux/features/api/apiSlice.js";
import BloodType from "../Services/BloodType.jsx";
import DoctorStickyLink from "../Services/DoctorStickyLink.jsx";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ConfirmModal from "../../UI/Modal/ConfirmModal.jsx";

const DoctorHolidays = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id: doctorId } = useParams();
  doctorId = Number(doctorId);

  const {
    data: doctor,
    isError: isErrorDoctor,
    isLoading: isLoadingDoctor,
  } = useGetDoctorByIdQuery(doctorId);
  const {
    data: doctorInfo,
    isError: isDoctorInfoError,
    isLoading: isDoctorInfoLoading,
  } = useGetDoctorInfoByDoctorIdQuery(doctorId);

  const {
    data: holidays = [],
    isLoading: isLoadingHolidays,
    isError: isErrorHolidays,
    error: holidaysError, // Log the error details
  } = useGetHolidayByDoctorIdQuery(doctorId);

  const [addHoliday] = useAddNewHolidayMutation();
  const [updateHoliday] = useUpdateHolidayMutation();
  const [deleteHoliday] = useDeleteHolidayMutation();

  const {
    data: branches,
    isLoading: isLoadingBranches,
    isError: isErrorBranches,
  } = useGetBranchesQuery();

  const doctorName = `${doctor?.name} ${doctor?.surname}`;

  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState(null);

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
    validationSchema: Yup.object({
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date().required("End date is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // const startDate = new Date(values.startDate).toISOString();
        // const endDate = new Date(values.endDate).toISOString();

        console.log(values);
        if (selectedHoliday) {
          const result = await updateHoliday({
            id: selectedHoliday.id,
            updatedHoliday: {
              ...values,
              doctorId,
              userId: doctor?.userId,
            },
          });
          console.log(result);
          toast.success("Holiday updated successfully.", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          const result = await addHoliday({
            ...values,
            doctorId,
            userId: doctor?.userId,
          }).unwrap();
          console.log(result);
          toast.success("Holiday added successfully.", {
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
        resetForm();
        setSelectedHoliday(null);
      } catch (error) {
        toast.error("Failed to save holiday.", {
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

  const handleEdit = (holiday) => {
    setSelectedHoliday(holiday);
    formik.setValues({
      startDate: holiday.startDate.split("T")[0],
      endDate: holiday.endDate.split("T")[0],
    });
  };

  const handleDelete = (id) => {
    setHolidayToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (holidayToDelete) {
      await deleteHoliday(holidayToDelete).unwrap();
      setHolidayToDelete(null);
      setShowConfirmModal(false);
      toast.success("Holiday deleted successfully!", {
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
  };

  if (
    isLoadingDoctor ||
    isDoctorInfoLoading ||
    isLoadingHolidays ||
    isLoadingBranches
  ) {
    return <div>Loading...</div>;
  }

  if (
    isErrorDoctor ||
    isDoctorInfoError ||
    isErrorHolidays ||
    isErrorBranches
  ) {
    console.error("Error loading data:", {
      doctor: isErrorDoctor,
      doctorInfo: isDoctorInfoError,
      holidays: isErrorHolidays,
      branches: isErrorBranches,
      holidaysError, // Log the error details
    });
    return <div>Error loading the doctor's data!</div>;
  }

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

          <div className="flex flex-col gap-3 lg:col-span-8 bg-white rounded-xl border-[1px] p-6">
            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4">Doctor Holidays</h2>
              <form onSubmit={formik.handleSubmit} className="mb-6">
                <div className="flex flex-col gap-4">
                  <label>
                    Start Date:
                    <input
                      type="date"
                      name="startDate"
                      value={formik.values.startDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`block w-full mt-1 ${
                        formik.touched.startDate && formik.errors.startDate
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.startDate && formik.errors.startDate ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.startDate}
                      </div>
                    ) : null}
                  </label>
                  <label>
                    End Date:
                    <input
                      type="date"
                      name="endDate"
                      value={formik.values.endDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`block w-full mt-1 ${
                        formik.touched.endDate && formik.errors.endDate
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.endDate && formik.errors.endDate ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.endDate}
                      </div>
                    ) : null}
                  </label>
                  <button
                    type="submit"
                    className={`mt-4 px-4 py-2 ${
                      selectedHoliday ? "bg-amber-300" : "bg-green-500"
                    }  text-white rounded`}>
                    {selectedHoliday ? "Update Holiday" : "Add Holiday"}
                  </button>
                </div>
              </form>
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="bg-cyan-50 rounded-md overflow-hidden">
                    <tr>
                      <th className="text-left py-2 px-4">Start Date</th>
                      <th className="text-left py-2 px-4">End Date</th>
                      <th className="text-left py-2 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holidays?.map((holiday) => (
                      <tr
                        key={holiday.id}
                        className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                        <td className="py-2 px-4">
                          {format(new Date(holiday.startDate), "yyyy-MM-dd")}
                        </td>
                        <td className="py-2 px-4">
                          {format(new Date(holiday.endDate), "yyyy-MM-dd")}
                        </td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleEdit(holiday)}
                            className="w-28 h-9 text-white bg-amber-300 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(holiday.id)}
                            className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {holidays.length === 0 && (
                      <tr>
                        <td colSpan="3" className="py-2 px-4 text-center">
                          No holidays found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleDeleteConfirm}
          message="Are you sure you want to delete this holiday?"
        />
      )}
    </>
  );
};

export default DoctorHolidays;
