import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useAddNewBranchMutation,
  useUpdateBranchMutation,
} from "../../../redux/features/api/apiSlice";

const BranchModal = ({ branch, onClose, isAddingNew }) => {
  const [addNewBranch, { isLoading: isAdding }] = useAddNewBranchMutation();
  const [updateBranch, { isLoading: isUpdating }] = useUpdateBranchMutation();

  // Formik kullanarak form durum yönetimi ve doğrulama kuralları
  const formik = useFormik({
    initialValues: {
      name: branch ? branch.name : "",
      status: branch ? branch.status : true, // status başlangıç değeri
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Branch name is required"),
      status: Yup.boolean().required("Status is required"), // Status için doğrulama
    }),
    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        status: values.status === "true" ? true : false,
      };

      try {
        if (isAddingNew) {
          await addNewBranch(payload).unwrap();
        } else {
          await updateBranch({
            id: branch.id,
            updatedBranch: {
              id: branch.id,
              updatedAt: new Date().toISOString(),
              ...payload,
            },
          }).unwrap();
        }
        onClose(); // Form başarıyla gönderildikten sonra modal kapatılır
      } catch (error) {
        console.error("Failed to process branch:", error);
      }
    },
  });

  return (
    <div className="flex flex-col justify-start gap-5 p-4 bg-cyan-50 shadow-md rounded-lg">
      <h2 className="text-lg font-bold text-cyan-700">
        {isAddingNew ? "Add New Branch" : "Edit Branch"}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4 flex flex-col gap-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900">
              Branch Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`block w-80 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
              }`}
              required
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900">
              Status:
            </label>
            <select
              id="status"
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
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

export default BranchModal;
