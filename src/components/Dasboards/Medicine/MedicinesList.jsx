import { useState } from "react";
import {
  useGetMedicinesQuery,
  useDeleteMedicineMutation,
  useAddNewMedicineMutation,
  useUpdateMedicineMutation,
} from "../../../redux/features/api/apiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import TitleCard from "../../UI/Cards/TitleCard";
import Card from "../../UI/Cards/Card";
import { FaUserDoctor } from "react-icons/fa6";
import { toast } from "react-toastify";

const MedicinesList = () => {
  const { data: medicines, isLoading, isError } = useGetMedicinesQuery();
  const [deleteMedicine] = useDeleteMedicineMutation();
  const [addNewMedicine] = useAddNewMedicineMutation();
  const [updateMedicine] = useUpdateMedicineMutation();
  const [editableMedicine, setEditableMedicine] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState(null);

  const handleDeleteConfirm = async () => {
    if (medicineToDelete) {
      try {
        await deleteMedicine(medicineToDelete).unwrap();
        setMedicineToDelete(null);
        setShowConfirmModal(false);
        toast.success("Medicine deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete medicine.");
      }
    }
  };

  const handleDelete = (id) => {
    setMedicineToDelete(id);
    setShowConfirmModal(true);
  };

  const handleEdit = (medicine) => {
    setEditableMedicine(medicine);
    formikEdit.setValues({
      id: medicine.id || "",
      name: medicine.name || "",
      type: medicine.type || "",
      amount: medicine.amount || "",
      treatment: medicine.treatment || "",
    });
  };

  const formikEdit = useFormik({
    initialValues: {
      id: "",
      name: "",
      type: "",
      amount: "",
      treatment: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      type: Yup.string(),
      amount: Yup.string(),
      treatment: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await updateMedicine({
          id: values.id,
          updatedMedicine: {
            id: values.id,
            name: values.name,
            type: values.type,
            amount: values.amount,
            treatment: values.treatment,
            updatedAt: new Date().toISOString(),
            status: true,
          },
        });
        toast.success("Medicine updated successfully.");
        resetForm();
        setEditableMedicine(null);
      } catch (error) {
        toast.error("Failed to update medicine.");
      }
    },
  });

  const formikAdd = useFormik({
    initialValues: {
      name: "",
      type: "",
      amount: "",
      treatment: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      type: Yup.string(),
      amount: Yup.string(),
      treatment: Yup.string().required("Treatment is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await addNewMedicine({
          name: values.name,
          type: values.type,
          amount: values.amount,
          treatment: values.treatment,
        });
        console.log(result);
        toast.success("Medicine added successfully.");
        resetForm();
      } catch (error) {
        toast.error("Failed to add medicine.");
      }
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading medicines.</p>;

  const inputClass =
    "block w-full h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"M E D I C I N E S"} />
      <Card
        title={"Medicine List"}
        icon={<FaUserDoctor />}
        color={"cyan"}
        className="mt-5">
        <form onSubmit={formikAdd.handleSubmit} className="mb-6 mt-6">
          <table className="table-auto w-full">
            <thead className="bg-cyan-50 rounded-md overflow-hidden">
              <tr>
                <th className="cursor-pointer hover:bg-cyan-300">ID</th>
                <th className="cursor-pointer hover:bg-cyan-300">Name</th>
                <th className="cursor-pointer hover:bg-cyan-300">Type</th>
                <th className="cursor-pointer hover:bg-cyan-300">Amount</th>
                <th className="cursor-pointer hover:bg-cyan-300">Treatment</th>
                <th className="cursor-pointer hover:bg-cyan-300">Actions</th>
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
                    value={formikAdd.values.name}
                    onChange={formikAdd.handleChange}
                    placeholder="Medicine Name"
                    className={inputClass}
                  />
                </td>
                <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                  <input
                    type="text"
                    name="type"
                    value={formikAdd.values.type}
                    onChange={formikAdd.handleChange}
                    placeholder="Medicine Type"
                    className={inputClass}
                  />
                </td>
                <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                  <input
                    type="text"
                    name="amount"
                    value={formikAdd.values.amount}
                    onChange={formikAdd.handleChange}
                    placeholder="Medicine Amount"
                    className={inputClass}
                  />
                </td>
                <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                  <input
                    type="text"
                    name="treatment"
                    value={formikAdd.values.treatment}
                    onChange={formikAdd.handleChange}
                    placeholder="Treatment"
                    className={inputClass}
                  />
                </td>
                <td className="text-start text-sm py-4 px-2 whitespace-nowrap flex justify-center items-center">
                  <button
                    type="submit"
                    onClick={formikAdd.handleSubmit}
                    className="w-28 h-9 text-white bg-green-300 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                    Add
                  </button>
                </td>
              </tr>
              {medicines?.map((medicine) => (
                <tr
                  key={medicine.id}
                  className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                  <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                    {medicine.id}
                  </td>
                  <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                    {editableMedicine?.id === medicine.id ? (
                      <input
                        type="text"
                        name="name"
                        value={formikEdit.values.name}
                        onChange={formikEdit.handleChange}
                        placeholder="Medicine Name"
                        className={inputClass}
                      />
                    ) : (
                      medicine.name
                    )}
                  </td>
                  <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                    {editableMedicine?.id === medicine.id ? (
                      <input
                        type="text"
                        name="type"
                        value={formikEdit.values.type}
                        onChange={formikEdit.handleChange}
                        placeholder="Medicine Type"
                        className={inputClass}
                      />
                    ) : (
                      medicine.type
                    )}
                  </td>
                  <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                    {editableMedicine?.id === medicine.id ? (
                      <input
                        type="text"
                        name="amount"
                        value={formikEdit.values.amount}
                        onChange={formikEdit.handleChange}
                        placeholder="Medicine Amount"
                        className={inputClass}
                      />
                    ) : (
                      medicine.amount
                    )}
                  </td>
                  <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                    {editableMedicine?.id === medicine.id ? (
                      <input
                        type="text"
                        name="treatment"
                        value={formikEdit.values.treatment}
                        onChange={formikEdit.handleChange}
                        placeholder="Treatment"
                        className={inputClass}
                      />
                    ) : (
                      medicine.treatment
                    )}
                  </td>
                  <td className="text-start text-sm py-4 px-2 whitespace-nowrap flex justify-center items-center">
                    {editableMedicine?.id === medicine.id ? (
                      <>
                        <button
                          type="submit"
                          onClick={formikEdit.handleSubmit}
                          className="w-28 h-9 text-white bg-green-300 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditableMedicine(null);
                            formikEdit.resetForm();
                          }}
                          className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleEdit(medicine)}
                          className="w-28 h-9 text-white bg-amber-300 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(medicine.id)}
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
        {showConfirmModal && (
          <div>
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true">
                  &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Confirm Deletion
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this medicine?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleDeleteConfirm}>
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setShowConfirmModal(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MedicinesList;
