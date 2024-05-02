import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetUsersQuery,
  useGetRolesQuery,
  useGetUserRolesQuery,
  useAddNewUserRoleMutation,
  useUpdateUserRoleMutation,
  useDeleteUserRoleMutation,
} from "../../../redux/features/api/apiSlice";
import TitleCard from "../../UI/Cards/TitleCard";
import Card from "../../UI/Cards/Card";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const UserRolesForm = ({ onClose }) => {
  const [selectedUserRole, setSelectedUserRole] = useState(null);
  const { data: users } = useGetUsersQuery();
  const { data: roles } = useGetRolesQuery();
  const { data: userRoles } = useGetUserRolesQuery();
  const [addUserRole] = useAddNewUserRoleMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUserRole] = useDeleteUserRoleMutation();

  const formik = useFormik({
    initialValues: {
      userId: selectedUserRole?.userId || "",
      roleId: selectedUserRole?.roleId || "",
      status: selectedUserRole?.status || true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      userId: Yup.number().required("User is required"),
      roleId: Yup.number().required("Role is required"),
      status: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      const payload = {
        userId: Number(values.userId),
        roleId: Number(values.roleId),
        status: values.status,
      };

      if (selectedUserRole) {
        console.log("updateuserRole");
        await updateUserRole({ id: selectedUserRole.id, ...payload }).unwrap();
        alert("User role updated successfully!");
      } else {
        console.log("addUserRole");
        await addUserRole(payload).unwrap();
        alert("User role added successfully!");
      }
      console.log("reset");
      resetForm();
    },
  });

  const resetForm = () => {
    setSelectedUserRole(null);
    formik.resetForm();
    if (onClose) onClose();
  };

  const handleEdit = (userRole) => {
    setSelectedUserRole(userRole);
  };

  const handleDelete = async (id) => {
    await deleteUserRole(id).unwrap();
    alert("User role deleted successfully!");
    resetForm();
  };

  const inputClass =
    "block w-60 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"User Roles"} />
      <Card
        title={"Manage User Roles"}
        icon={<FaUserDoctor />}
        color={"cyan"}
        className="mt-5 p-2">
        <div className="container gap-4 mt-5">
          <form onSubmit={formik.handleSubmit} className="mb-4">
            <div>
              <label htmlFor="userId">User</label>
              <select
                id="userId"
                name="userId"
                onChange={formik.handleChange}
                value={formik.values.userId}
                className={inputClass}>
                <option>Select User Email</option>
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.userName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="roleId">Role</label>
              <select
                id="roleId"
                name="roleId"
                onChange={formik.handleChange}
                value={formik.values.roleId}
                className={inputClass}>
                {roles?.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <label className="inline-flex items-center mt-2">
              <input
                type="checkbox"
                name="status"
                checked={formik.values.status}
                onChange={formik.handleChange}
              />
              <span className="ml-2">Active</span>
            </label>
            <div className="mt-3">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {selectedUserRole ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded ml-2">
                Cancel
              </button>
            </div>
          </form>
          <table className="min-w-full leading-normal">
            <thead className="bg-cyan-50 rounded-md overflow-hidden">
              <tr>
                <th className="cursor-pointer hover:bg-cyan-300">User</th>
                <th className="cursor-pointer hover:bg-cyan-300">Role</th>
                <th className="cursor-pointer hover:bg-cyan-300">Status</th>
                <th className="cursor-pointer hover:bg-cyan-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userRoles?.map((userRole) => (
                <tr
                  key={userRole.id}
                  className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                  <td className="text-center text-sm py-4 px-2 whitespace-nowrap">
                    {
                      users.find((user) => user.id === userRole.userId)
                        ?.userName
                    }
                  </td>
                  <td className="text-center text-sm py-4 px-2 whitespace-nowrap">
                    {roles.find((role) => role.id === userRole.roleId)?.name}
                  </td>
                  <td className="text-center text-sm py-4 px-2 whitespace-nowrap">
                    {userRole.status ? "Active" : "Inactive"}
                  </td>
                  <td className="text-center text-sm py-4 px-2 whitespace-nowrap flex justify-center items-center">
                    <button
                      onClick={() => handleEdit(userRole)}
                      className="w-28 h-9 text-white bg-amber-300 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                      <img
                        src="/images/eye.png"
                        alt="detail"
                        className="h-7 mr-2"
                      />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(userRole.id)}
                      className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                      <img
                        src="/images/delete.png"
                        alt="detail"
                        className="h-4 mr-2"
                      />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default UserRolesForm;
