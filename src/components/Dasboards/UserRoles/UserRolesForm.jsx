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
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";

const UserRolesForm = () => {
  const [selectedUserRole, setSelectedUserRole] = useState(null);
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetUsersQuery();
  const {
    data: roles,
    isLoading: isLoadingRoles,
    isError: isErrorRoles,
  } = useGetRolesQuery();
  const {
    data: userRoles,
    isLoading: isLoadingUserRoles,
    isError: isErrorUserRoles,
  } = useGetUserRolesQuery();
  const [addUserRole] = useAddNewUserRoleMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUserRole] = useDeleteUserRoleMutation();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const formikAdd = useFormik({
    initialValues: {
      userId: "",
      roleId: "",
      status: true,
    },
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
      await addUserRole(payload);
      toast.success("User role added successfully!");
      formikAdd.resetForm();
    },
  });

  const formikEdit = useFormik({
    initialValues: {
      id: selectedUserRole?.id || null,
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
        id: values.id,
        userId: Number(values.userId),
        roleId: Number(values.roleId),
        status: values.status,
      };
      const result = await updateUserRole({
        id: values.id,
        updatedUserRole: {
          id: Number(values.id),
          userId: Number(values.userId),
          roleId: Number(values.roleId),
          status: values.status,
        },
      });
      toast.success("User role updated successfully!");
      setSelectedUserRole(null);
      formikEdit.resetForm();
    },
  });

  const handleEdit = (userRole) => {
    setSelectedUserRole(userRole);
  };

  const handleDelete = (id) => {
    setRoleToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (roleToDelete) {
      await deleteUserRole(roleToDelete).unwrap();
      setRoleToDelete(null);
      setShowConfirmModal(false);
      toast.success("User role deleted successfully!");
    }
  };

  const inputClass =
    "block w-60 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  if (isLoadingUsers || isLoadingRoles || isLoadingUserRoles)
    return <p>Loading...</p>;
  if (isErrorUsers || isErrorRoles || isErrorUserRoles)
    return <p>Error loading roles.</p>;

  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"User Roles"} />
      <Card
        title={"Manage User Roles"}
        icon={<FaUserDoctor />}
        color={"cyan"}
        className="mt-5 p-2">
        <div className="container gap-4 mt-5">
          <form onSubmit={formikAdd.handleSubmit} className="mb-4">
            <table className="table-auto w-full">
              <thead className="bg-cyan-50 rounded-md overflow-hidden">
                <tr>
                  <th className="cursor-pointer hover:bg-cyan-300">User</th>
                  <th className="cursor-pointer hover:bg-cyan-300">Role</th>
                  <th className="cursor-pointer hover:bg-cyan-300">Status</th>
                  <th className="cursor-pointer hover:bg-cyan-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                  <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                    <select
                      id="userId"
                      name="userId"
                      onChange={formikAdd.handleChange}
                      value={formikAdd.values.userId}
                      className={inputClass}>
                      <option value="">Select User Email</option>
                      {users?.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.userName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                    <select
                      id="roleId"
                      name="roleId"
                      onChange={formikAdd.handleChange}
                      value={formikAdd.values.roleId}
                      className={inputClass}>
                      <option value="">Select Role</option>
                      {roles?.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="checkbox"
                        name="status"
                        checked={formikAdd.values.status}
                        onChange={formikAdd.handleChange}
                      />
                      <span className="ml-2">Active</span>
                    </label>
                  </td>
                  <td className="text-start text-sm py-4 px-2 whitespace-nowrap flex justify-center items-center">
                    <button
                      type="submit"
                      className="w-28 h-9 text-white bg-green-300 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                      Add
                    </button>
                  </td>
                </tr>
                {userRoles?.map((userRole) => (
                  <tr
                    key={userRole.id}
                    className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                    <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                      {formikEdit.values.id === userRole.id ? (
                        <select
                          id="userId"
                          name="userId"
                          onChange={formikEdit.handleChange}
                          value={formikEdit.values.userId}
                          className={inputClass}>
                          {users?.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.userName}
                            </option>
                          ))}
                        </select>
                      ) : (
                        users?.find((user) => user.id === userRole.userId)
                          ?.userName || ""
                      )}
                    </td>
                    <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                      {formikEdit.values.id === userRole.id ? (
                        <select
                          id="roleId"
                          name="roleId"
                          onChange={formikEdit.handleChange}
                          value={formikEdit.values.roleId}
                          className={inputClass}>
                          {roles?.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        roles?.find((role) => role.id === userRole.roleId)
                          ?.name || ""
                      )}
                    </td>
                    <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                      {formikEdit.values.id === userRole.id ? (
                        <label className="inline-flex items-center mt-2">
                          <input
                            type="checkbox"
                            name="status"
                            checked={formikEdit.values.status}
                            onChange={formikEdit.handleChange}
                          />
                          <span className="ml-2">Active</span>
                        </label>
                      ) : userRole.status ? (
                        "Active"
                      ) : (
                        "Inactive"
                      )}
                    </td>
                    <td className="text-start text-sm py-4 px-2 whitespace-nowrap flex justify-center items-center">
                      {formikEdit.values.id === userRole.id ? (
                        <>
                          <button
                            type="button"
                            className="w-28 h-9 text-white bg-green-300 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
                            onClick={formikEdit.handleSubmit}>
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={formikEdit.resetForm}
                            className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleEdit(userRole)}
                            className="w-28 h-9 text-white bg-amber-300 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            <FaEdit className="h-5 mr-2" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(userRole.id)}
                            className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            <FaTrashAlt className="h-5 mr-2" />
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </Card>
      {showConfirmModal && (
        <ConfirmModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleDeleteConfirm}
          message="Are you sure you want to delete this role?"
        />
      )}
    </div>
  );
};

export default UserRolesForm;
