import React from "react";
import { useFormik } from "formik";
import {
  useAddNewDoctorWorkingDaysMutation,
  useUpdateDoctorWorkingDaysMutation,
} from "../../../redux/features/api/apiSlice";

const DoctorWorkingDaysForm = ({ doctorId, closeModal }) => {
  const [addNewWorkingDay] = useAddNewDoctorWorkingDaysMutation();
  const [updateWorkingDay] = useUpdateDoctorWorkingDaysMutation();

  const formik = useFormik({
    initialValues: {
      doctorId: doctorId || "",
      days: "",
      startTime: "",
      endTime: "",
      slotDuration: "",
    },
    onSubmit: async (values) => {
      if (doctorId) {
        await updateWorkingDay({ ...values, id: doctorId }).unwrap();
      } else {
        await addNewWorkingDay(values).unwrap();
      }
      closeModal();
    },
  });

  return (
    <div className="modal-backdrop">
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="days"
          onChange={formik.handleChange}
          value={formik.values.days}
        />
        <input
          type="time"
          name="startTime"
          onChange={formik.handleChange}
          value={formik.values.startTime}
        />
        <input
          type="time"
          name="endTime"
          onChange={formik.handleChange}
          value={formik.values.endTime}
        />
        <input
          type="text"
          name="slotDuration"
          onChange={formik.handleChange}
          value={formik.values.slotDuration}
        />
        <button type="submit">Save</button>
        <button onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default DoctorWorkingDaysForm;
