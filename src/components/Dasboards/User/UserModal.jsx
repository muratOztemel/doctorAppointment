import {
  useAddNewUserMutation,
  useUpdateUserMutation,
  useAddNewUserRoleMutation,
  useUpdateUserRoleMutation,
} from "../../../redux/features/api/apiSlice";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const UserModal = ({ user, roles, onClose, onSubmit, isAddingNew }) => {
  const [addNewUser, { isLoading: isAdding }] = useAddNewUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [addNewUserRole] = useAddNewUserRoleMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  function generatePassword(length = 10) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  const formik = useFormik({
    initialValues: {
      userName: user ? user.userName : "",
      roleId: user ? user.roleId : roles[0]?.id || "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Email is required"),
      roleId: Yup.number().required("Role is required"),
    }),
    onSubmit: async (values) => {
      const payload = {
        email: values.userName,
        password: isAddingNew ? generatePassword() : undefined,
        status: true,
      };

      try {
        if (isAddingNew) {
          await addNewUser(payload);
          toast.success("The user has been created successfully.", {
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
          if (user.email === !values.userName) {
            await updateUser({
              id: user.id,
              updatedUser: {
                id: user.id,
                email: values.userName,
                password: user.password,
                status: true,
              },
            });
          }
          await addNewUserRole({
            userId: user.id,
            roleId: values.roleId,
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

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col justify-start gap-5 p-4 bg-cyan-50 shadow-md rounded-lg">
        <div className="modal-container">
          <h2 className="text-lg font-bold text-cyan-700">
            {isAddingNew ? "Add New User" : "Edit User"}
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
              <div>
                <label htmlFor="userName">Email:</label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                  className={`block w-80 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none ${
                    formik.touched.userName && formik.errors.userName
                      ? "input-error"
                      : ""
                  }`}
                />
                {formik.touched.userName && formik.errors.userName && (
                  <p className="error">{formik.errors.userName}</p>
                )}
              </div>
              {!isAddingNew && (
                <div>
                  <label htmlFor="roleId">Role:</label>
                  <select
                    id="roleId"
                    name="roleId"
                    onChange={formik.handleChange}
                    value={formik.values.roleId}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    onBlur={formik.handleBlur}>
                    <option>Selecet Role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.roleId && formik.errors.roleId && (
                    <p className="error">{formik.errors.roleId}</p>
                  )}
                </div>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                disabled={isAdding || isUpdating}
                className="bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-white text-sm px-4 py-2 text-center">
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-700 text-white font-medium rounded-lg text-sm px-4 py-2 text-center">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
