import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useAddNewMedicineMutation,
  useUpdateMedicineMutation,
} from "../../../redux/features/api/apiSlice";

const MedicineModal = ({ medicine, onClose, isAddingNew }) => {
  const [addNewMedicine, { isLoading: isAdding }] = useAddNewMedicineMutation();
  const [updateMedicine, { isLoading: isUpdating }] =
    useUpdateMedicineMutation();

  // Formik kullanarak form durum yönetimi ve doğrulama kuralları
  const formik = useFormik({
    initialValues: {
      name: medicine ? medicine.name : "",
      type: medicine ? medicine.type : "",
      amount: medicine ? medicine.amount : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Medicine name is required"),
      type: Yup.string(),
      amount: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        if (isAddingNew) {
          await addNewMedicine({
            name: values.name,
            type: values.type,
            amount: values.amount,
          }).unwrap();
        } else {
          await updateMedicine({
            id: medicine.id,
            updatedMedicine: {
              id: medicine.id,
              name: values.name,
              type: values.type,
              amount: values.amount,
              updatedAt: new Date().toISOString(),
              status: true,
            },
          }).unwrap();
        }
        onClose(); // Form başarıyla gönderildikten sonra modal kapatılır
      } catch (error) {
        console.error("Failed to process medicine:", error);
      }
    },
  });

  return (
    <div className="flex flex-col justify-start gap-5 p-4 bg-cyan-50 shadow-md rounded-lg">
      <h2 className="text-lg font-bold text-cyan-700">
        {isAddingNew ? "Add New Medicine" : "Edit Medicine"}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900">
            Medicine Name:
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
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-gray-900">
            Medicine Type:
          </label>
          <input
            id="type"
            name="type"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
            className={`block w-80 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none ${
              formik.touched.type && formik.errors.type ? "border-red-500" : ""
            }`}
          />
          {formik.touched.type && formik.errors.type ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.type}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900">
            Medicine Amount:
          </label>
          <input
            id="amount"
            name="amount"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
            className={`block w-80 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none ${
              formik.touched.amount && formik.errors.amount
                ? "border-red-500"
                : ""
            }`}
            required
          />
          {formik.touched.amount && formik.errors.amount ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.amount}
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

export default MedicineModal;
