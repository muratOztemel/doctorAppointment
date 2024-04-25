import {
  useAddNewUserMutation,
  useUpdateUserMutation,
} from "../../../redux/features/api/apiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserModal = ({ user, roles, onClose, isAddingNew }) => {
  const [addNewUser, { isLoading: isAdding }] = useAddNewUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const formik = useFormik({
    initialValues: {
      userName: user.userName,
      roleId: user.role?.id || roles[0]?.id,
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("User name is required"),
      roleId: Yup.number().required("Role is required"), // Rolün seçilmesi zorunlu
    }),
    onSubmit: async (values) => {
      const payload = {
        userName: values.userName,
        roleId: values.roleId,
      };

      if (isAddingNew) {
        await addNewUser(payload).unwrap();
      } else {
        await updateUser({ id: user.id, ...payload }).unwrap();
      }

      onClose();
    },
  });

  if (!roles.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-start gap-5 p-4 bg-cyan-50 shadow-md rounded-lg">
      <h2 className="text-lg font-bold text-cyan-700">
        {isAddingNew ? "Add New User" : "Edit User"}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4 flex flex-col gap-6">
          <div>
            <label htmlFor="userName">User Name:</label>
            <input
              id="userName"
              name="userName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.userName}
              className="block w-80 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="roleId">Role:</label>
            <select
              id="roleId"
              name="roleId"
              onChange={formik.handleChange}
              value={formik.values.roleId}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
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

export default UserModal;
