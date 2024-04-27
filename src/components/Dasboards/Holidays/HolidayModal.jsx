import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useAddNewHolidayMutation,
  useUpdateHolidayMutation,
} from "../../../redux/features/api/apiSlice";

const HolidayModal = ({ holiday, onClose, isAddingNew }) => {
  const [addNewHoliday, { isLoading: isAdding }] = useAddNewHolidayMutation();
  const [updateHoliday, { isLoading: isUpdating }] = useUpdateHolidayMutation();

  // Formik kullanarak form durum yönetimi ve doğrulama kuralları
  const formik = useFormik({
    initialValues: {
      name: holiday ? holiday.name : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Holiday name is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (isAddingNew) {
          await addNewHoliday({ name: values.name }).unwrap();
        } else {
          await updateHoliday({
            id: holiday.id,
            updatedHoliday: {
              id: holiday.id,
              name: values.name,
              updatedAt: new Date().toISOString(),
              status: true,
            },
          }).unwrap();
        }
        onClose(); // Form başarıyla gönderildikten sonra modal kapatılır
      } catch (error) {
        console.error("Failed to process holiday:", error);
      }
    },
  });

  return (
    <div className="flex flex-col justify-start gap-5 p-4 bg-cyan-50 shadow-md rounded-lg">
      <h2 className="text-lg font-bold text-cyan-700">
        {isAddingNew ? "Add New Holiday" : "Edit Holiday"}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900">
            Holiday Name:
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

export default HolidayModal;
