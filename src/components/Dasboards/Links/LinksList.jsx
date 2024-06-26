import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetLinksQuery,
  useDeleteLinkMutation,
  useAddNewLinkMutation,
  useUpdateLinkMutation,
} from "../../../redux/features/api/apiSlice";
import TitleCard from "../../UI/Cards/TitleCard";
import Card from "../../UI/Cards/Card";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";

const LinksList = () => {
  const { data: links, isLoading, isError } = useGetLinksQuery();
  const [deleteLink] = useDeleteLinkMutation();
  const [addLink] = useAddNewLinkMutation();
  const [updateLink, { isLoading: isUpdating }] = useUpdateLinkMutation();
  const [selectedLink, setSelectedLink] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState(null);

  const formikAdd = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Link name is required"),
    }),
    onSubmit: async (values) => {
      await addLink(values).unwrap();
      toast.success("Link added successfully!");
      formikAdd.resetForm();
    },
  });

  const formikEdit = useFormik({
    initialValues: {
      id: selectedLink?.id || null,
      name: selectedLink?.name || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Link name is required"),
    }),
    onSubmit: async (values) => {
      await updateLink({
        id: selectedLink.id,
        updatedLink: {
          id: selectedLink.id,
          name: values.name,
          status: true,
        },
      }).unwrap();
      toast.success("Link updated successfully!");
      setSelectedLink(null);
      formikEdit.resetForm();
    },
  });

  const handleEdit = (link) => {
    setSelectedLink(link);
  };

  const handleDelete = (id) => {
    setLinkToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (linkToDelete) {
      await deleteLink(linkToDelete).unwrap();
      setLinkToDelete(null);
      setShowConfirmModal(false);
      toast.success("Link deleted successfully!");
    }
  };

  const inputClass =
    "block w-60 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading links.</p>;

  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"L I N K S"} />
      <Card
        title={"Link List"}
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
                      placeholder="Enter link name"
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
                {links?.map((link) => (
                  <tr
                    key={link.id}
                    className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                    <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                      {link.id}
                    </td>
                    <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                      {formikEdit.values.id === link.id ? (
                        <input
                          type="text"
                          name="name"
                          onChange={formikEdit.handleChange}
                          value={formikEdit.values.name}
                          className={inputClass}
                        />
                      ) : (
                        link.name
                      )}
                    </td>
                    <td className="text-start text-sm py-4 px-2 whitespace-nowrap flex justify-center items-center">
                      {formikEdit.values.id === link.id ? (
                        <>
                          <button
                            type="button"
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
                            onClick={() => handleEdit(link)}
                            className="w-28 h-9 text-white bg-amber-300 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            <FaEdit className="h-5 mr-2" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(link.id)}
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
          message="Are you sure you want to delete this link?"
        />
      )}
    </div>
  );
};

export default LinksList;
