import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useAddNewRoleMutation,
  useUpdateRoleMutation,
} from "../../../redux/features/api/apiSlice";
import { useRef } from "react";

const UserModal = ({ role, onClose, isAddingNew }) => {
  const modalRef = useRef();
  useEffect(() => {
    function handleOutsideClick(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const [addNewRole, { isLoading: isAdding }] = useAddNewRoleMutation();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();

  // Formik kullanarak form durum yönetimi ve doğrulama kuralları
  const formik = useFormik({
    initialValues: {
      name: role ? role.name : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Role name is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (isAddingNew) {
          await addNewRole({ name: values.name }).unwrap();
        } else {
          console.log("Updating role:", values);
          await updateRole({
            id: role.id,
            updatedRole: {
              id: role.id,
              name: values.name,
              updatedAt: new Date().toISOString(),
              status: true,
            },
          }).unwrap();
        }
        onClose(); // Form başarıyla gönderildikten sonra modal kapatılır
      } catch (error) {
        console.error("Failed to process role:", error);
      }
    },
  });

  return (
    <div className="flex flex-col justify-start gap-5 p-4 bg-cyan-50 shadow-md rounded-lg">
      <h2 className="text-lg font-bold text-cyan-700">
        {isAddingNew ? "Add New Role" : "Edit Role"}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900">
            Role Name:
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

export default UserModal;
