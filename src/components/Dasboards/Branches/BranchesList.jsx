import { useState } from "react";
import {
  useGetBranchesQuery,
  useDeleteBranchMutation,
  useAddNewBranchMutation,
  useUpdateBranchMutation,
} from "../../../redux/features/api/apiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import TitleCard from "../../UI/Cards/TitleCard";
import Card from "../../UI/Cards/Card";
import { FaUserDoctor } from "react-icons/fa6";
import ConfirmModal from "./ConfirmModal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const BranchesList = () => {
  const { data: branches, isLoading, isError } = useGetBranchesQuery();
  const [deleteBranch] = useDeleteBranchMutation();
  const [addBranch] = useAddNewBranchMutation();
  const [updateBranch] = useUpdateBranchMutation();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);

  const formikAdd = useFormik({
    initialValues: {
      name: "",
      status: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Branch name is required"),
      status: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      await addBranch(values).unwrap();
      toast.success("Branch added successfully");
      formikAdd.resetForm();
    },
  });

  const formikEdit = useFormik({
    initialValues: {
      id: selectedBranch?.id || null,
      name: selectedBranch?.name || "",
      status: selectedBranch?.status || true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Branch name is required"),
      status: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      await updateBranch({
        id: values.id,
        updatedBranch: {
          ...values,
        },
      }).unwrap();
      toast.success("Branch updated successfully");
      setSelectedBranch(null);
      formikEdit.resetForm();
    },
  });

  const handleEdit = (branch) => {
    setSelectedBranch(branch);
  };

  const handleDelete = (id) => {
    setBranchToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (branchToDelete) {
      await deleteBranch(branchToDelete).unwrap();
      toast.success("Branch deleted successfully");
      setBranchToDelete(null);
      setShowConfirmModal(false);
    }
  };

  const inputClass =
    "block w-60 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading branches.</p>;

  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"B R A N C H E S"} />
      <Card
        title={"Branch List"}
        icon={<FaUserDoctor />}
        color={"cyan"}
        className="mt-5">
        <div className="container gap-4 mt-5">
          <form onSubmit={formikAdd.handleSubmit} className="mb-4">
            <table className="table-auto w-full">
              <thead className="bg-cyan-50 rounded-md overflow-hidden">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Status</th>
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
                      onChange={formikAdd.handleChange}
                      value={formikAdd.values.name}
                      className={inputClass}
                      placeholder="Enter branch name"
                    />
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
                {branches?.map((branch) => (
                  <tr
                    key={branch.id}
                    className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                    <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                      {branch.id}
                    </td>
                    <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                      {formikEdit.values.id === branch.id ? (
                        <input
                          type="text"
                          name="name"
                          onChange={formikEdit.handleChange}
                          value={formikEdit.values.name}
                          className={inputClass}
                        />
                      ) : (
                        branch.name
                      )}
                    </td>
                    <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                      {formikEdit.values.id === branch.id ? (
                        <label className="inline-flex items-center mt-2">
                          <input
                            type="checkbox"
                            name="status"
                            checked={formikEdit.values.status}
                            onChange={formikEdit.handleChange}
                          />
                          <span className="ml-2">Active</span>
                        </label>
                      ) : branch.status ? (
                        "Active"
                      ) : (
                        "Inactive"
                      )}
                    </td>
                    <td className="text-start text-sm py-4 px-2 whitespace-nowrap flex justify-center items-center">
                      {formikEdit.values.id === branch.id ? (
                        <>
                          <button
                            type="submit"
                            className="w-28 h-9 text-white bg-green-300 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
                            onClick={formikEdit.handleSubmit}>
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => formikEdit.resetForm()}
                            className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleEdit(branch)}
                            className="w-28 h-9 text-white bg-amber-300 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            <FaEdit className="h-5 mr-2" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(branch.id)}
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
          message="Are you sure you want to delete this branch?"
        />
      )}
    </div>
  );
};

export default BranchesList;
