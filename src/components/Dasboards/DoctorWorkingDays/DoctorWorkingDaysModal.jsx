import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetDoctorsQuery,
  useAddNewDoctorWorkingDaysMutation,
  useUpdateDoctorWorkingDaysMutation,
} from "../../../redux/features/api/apiSlice";
import { toast } from "react-toastify";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const mapDaysToNumbers = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

const mapNumbersToDays = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

const DoctorWorkingDaysModal = ({ workingDay, onClose, isAddingNew }) => {
  const [addNewDoctorWorkingDays, { isLoading: isAdding }] =
    useAddNewDoctorWorkingDaysMutation();
  const { data: doctors, isLoading: isLoadingDoctors } = useGetDoctorsQuery();
  const [updateDoctorWorkingDays, { isLoading: isUpdating }] =
    useUpdateDoctorWorkingDaysMutation();
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    if (workingDay) {
      const daysArray = workingDay.days
        .split(",")
        .map((num) => mapNumbersToDays[num]);
      setSelectedDays(daysArray);
    } else {
      setSelectedDays([]);
    }
  }, [workingDay]);

  const formik = useFormik({
    initialValues: {
      doctorId: workingDay?.doctorId || "",
      days: workingDay?.days || "",
      startTime: workingDay?.startTime || "",
      endTime: workingDay?.endTime || "",
      slotDuration: workingDay?.slotDuration || "",
    },
    validationSchema: Yup.object({
      doctorId: Yup.number(),
      days: Yup.string(),
      startTime: Yup.string(),
      endTime: Yup.string(),
      slotDuration: Yup.string(),
    }),
    onSubmit: async (values) => {
      const daysNumbers = selectedDays
        .map((day) => mapDaysToNumbers[day])
        .join(",");
      const submitValues = { ...values, days: daysNumbers };
      console.log(submitValues);
      try {
        if (isAddingNew) {
          await addNewDoctorWorkingDays(submitValues);
          toast.success(
            "The Doctor's working day has been created successfully.",
            {
              position: "bottom-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        } else {
          await updateDoctorWorkingDays({
            id: workingDay?.id,
            updatedDoctorWorkingDays: {
              ...submitValues,
              id: workingDay?.id,
            },
          });
          toast.success("The user has been updated successfully.", {
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
        onClose();
      } catch (error) {
        console.error("Error updating or adding user", error);
      }
    },
  });

  const handleOutsideClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const inputClass =
    "block w-60 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  if (isLoadingDoctors) {
    return <p>Loading doctors...</p>;
  }

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-lg font-bold text-cyan-700">
          {isAddingNew ? "Add New Working Day" : "Edit Working Day"}
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="doctorId">Select a Doctor:</label>
            <select
              id="doctorId"
              name="doctorId"
              className={inputClass}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.doctorId}>
              <option value="">Select a Doctor</option>
              {doctors?.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} {doctor.surname}
                </option>
              ))}
            </select>
            {formik.touched.doctorId && formik.errors.doctorId ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.doctorId}
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {weekDays.map((day) => (
              <button
                type="button"
                key={day}
                onClick={() => toggleDay(day)}
                className={`w-full text-center py-2 rounded ${
                  selectedDays.includes(day)
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-200"
                }`}>
                {day}
              </button>
            ))}
          </div>
          <input
            type="hidden"
            name="days"
            value={selectedDays.map((day) => mapDaysToNumbers[day]).join(",")}
          />
          <div>
            <input
              type="text"
              name="startTime"
              placeholder="Start Time"
              className={inputClass}
              onBlur={formik.handleBlur}
              value={formik.values.startTime}
              onChange={formik.handleChange}
            />
            {formik.touched.startTime && formik.errors.startTime ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.startTime}
              </div>
            ) : null}
          </div>
          <div>
            <input
              type="text"
              name="endTime"
              placeholder="End Time"
              className={inputClass}
              onBlur={formik.handleBlur}
              value={formik.values.endTime}
              onChange={formik.handleChange}
            />
            {formik.touched.endTime && formik.errors.endTime ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.endTime}
              </div>
            ) : null}
          </div>
          <div>
            <input
              type="text"
              name="slotDuration"
              placeholder="Slot Duration"
              className={inputClass}
              onBlur={formik.handleBlur}
              value={formik.values.slotDuration}
              onChange={formik.handleChange}
            />
            {formik.touched.slotDuration && formik.errors.slotDuration ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.slotDuration}
              </div>
            ) : null}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorWorkingDaysModal;
