import { useState } from "react";
import {
  useGetRolesQuery,
  useDeleteRoleMutation,
  useAddNewRoleMutation,
  useUpdateRoleMutation,
} from "../../../redux/features/api/apiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import TitleCard from "../../UI/Cards/TitleCard";
import Card from "../../UI/Cards/Card";
import { FaUserDoctor } from "react-icons/fa6";
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";

const RolesList = () => {
  const { data: roles, isLoading, isError } = useGetRolesQuery();
  const [deleteRole] = useDeleteRoleMutation();
  const [addRole] = useAddNewRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);

  const newRoleFormik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Role name is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await addRole(values).unwrap();
      resetForm();
      toast.success("Role added successfully.", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  const editRoleFormik = useFormik({
    initialValues: {
      id: null,
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Role name is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await updateRole({
        id: values.id,
        updatedRole: {
          id: values.id,
          name: values.name,
          updatedAt: new Date().toISOString(),
          status: true,
        },
      }).unwrap();
      resetForm();
      setEditingRoleId(null);
      toast.success("Role edited successfully.", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  const handleDeleteConfirm = async () => {
    if (roleToDelete) {
      await deleteRole(roleToDelete).unwrap();
      setRoleToDelete(null);
      setShowConfirmModal(false);
      toast.error("Role deleted successfully.", {
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
  };

  const handleDelete = (id) => {
    setRoleToDelete(id);
    setShowConfirmModal(true);
  };

  const handleEdit = (role) => {
    setEditingRoleId(role.id);
    editRoleFormik.setValues(role);
  };

  const handleCancelEdit = () => {
    setEditingRoleId(null);
    editRoleFormik.resetForm();
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading roles.</p>;

  const inputClass =
    "block w-full h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"R O L E S"} />
      <Card
        title={"Role List"}
        icon={<FaUserDoctor />}
        color={"cyan"}
        className="mt-5">
        <form onSubmit={newRoleFormik.handleSubmit} className="w-full mb-4">
          <table className="table-auto w-full mt-5">
            <thead className="bg-cyan-50 rounded-md overflow-hidden">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                  New
                </td>
                <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                  <input
                    type="text"
                    name="name"
                    value={newRoleFormik.values.name}
                    onChange={newRoleFormik.handleChange}
                    placeholder="Role Name"
                    className={inputClass}
                  />
                </td>
                <td className="text-start text-sm py-4 px-2 whitespace-nowrap flex justify-center items-center">
                  <button
                    type="submit"
                    className="w-28 h-9 text-white bg-green-300 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                    Add
                  </button>
                </td>
              </tr>
              {roles?.map((role) => (
                <tr
                  key={role.id}
                  className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                  <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                    {role.id}
                  </td>
                  <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                    {editingRoleId === role.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editRoleFormik.values.name}
                        onChange={editRoleFormik.handleChange}
                        placeholder="Enter role name"
                        className={inputClass}
                      />
                    ) : (
                      role.name
                    )}
                  </td>
                  <td className="text-start text-sm py-4 px-2 whitespace-nowrap flex justify-center items-center">
                    {editingRoleId === role.id ? (
                      <>
                        <button
                          type="submit"
                          onClick={editRoleFormik.handleSubmit}
                          className="w-28 h-9 text-white bg-green-300 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleEdit(role)}
                          className="w-28 h-9 text-white bg-amber-300 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(role.id)}
                          className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
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

export default RolesList;
