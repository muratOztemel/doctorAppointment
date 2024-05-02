import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useAddNewDoctorWorkingDaysMutation,
  useUpdateDoctorWorkingDaysMutation,
} from "../../../redux/features/api/apiSlice";

const DoctorWorkingDaysModal = ({ day, onClose, isAddingNew }) => {
  const [addNewDoctorWorkingDay, { isLoading: isAdding }] =
    useAddNewDoctorWorkingDaysMutation();
  const [updateDoctorWorkingDay, { isLoading: isUpdating }] =
    useUpdateDoctorWorkingDaysMutation();

  // Formik kullanarak form durum yönetimi ve doğrulama kuralları
  const formik = useFormik({
    initialValues: {
      name: day ? day.name : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Day name is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (isAddingNew) {
          await addNewDoctorWorkingDay({ name: values.name }).unwrap();
        } else {
          await updateDoctorWorkingDay({
            id: day.id,
            updatedDoctorWorkingDay: {
              id: day.id,
              name: values.name,
              updatedAt: new Date().toISOString(),
              status: true,
            },
          }).unwrap();
        }
        onClose(); // Form başarıyla gönderildikten sonra modal kapatılır
      } catch (error) {
        console.error("Failed to process day:", error);
      }
    },
  });

  return (
    <div className="flex flex-col justify-start gap-5 p-4 bg-cyan-50 shadow-md rounded-lg">
      <h2 className="text-lg font-bold text-cyan-700">
        {isAddingNew ? "Add New Day" : "Edit Day"}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900">
            Day Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`block w-80 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none ${
              formik.touched.name && formik.errors.name ? "border-red-500" : ""
            }`}
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          ) : null}
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-700 text-white font-medium rounded-lg text-sm px-4 py-2 text-center">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isAdding || isUpdating}
            className="bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-white text-sm px-4 py-2 text-center">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorWorkingDaysModal;
