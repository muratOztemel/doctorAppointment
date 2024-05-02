import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetUsersQuery,
  useGetBranchesQuery,
  useAddNewDoctorMutation,
} from "../../../redux/features/api/apiSlice";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

const AddDoctorModal = ({ onClose, user }) => {
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
  const { data: branches, isLoading: isLoadingBranches } =
    useGetBranchesQuery();
  const [addNewDoctor] = useAddNewDoctorMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      title: "",
      userId: user.userId || "",
      branchId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(2, "Name need at least 3 character"),
      surname: Yup.string()
        .required("Surname is required")
        .min(2, "Name need at least 3 character"),
      title: Yup.string().required("Title is required"),
      userId: Yup.number().required("User is required"),
      branchId: Yup.number().required("Branch is required"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await addNewDoctor({ ...values }).unwrap();
        if (result?.error?.originalStatus == 200) {
          console.log("1");
          toast(result.error?.data, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "success",
          });
          onClose();
        } else {
          console.log("2");
          toast(result.error?.data, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "success",
          });
          onClose();
        }
        onClose();
      } catch (error) {
        console.error("Failed to process form:", error);
        onClose();
      }
    },
  });

  if (isLoadingUsers || isLoadingBranches) {
    return <div>Loading...</div>;
  }

  const handleOutsideClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const clss =
    "block w-80 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col justify-start gap-5 p-4 shadow-md rounded-lg bg-cyan-50">
        <div className="modal-container">
          <h2 className="text-lg font-bold text-cyan-700">Add Doctor</h2>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={clss}
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <small className="text-red-600">{formik.errors.name}</small>
              )}
            </div>
            <div>
              <label htmlFor="surname">Surname:</label>
              <input
                id="surname"
                name="surname"
                type="text"
                value={formik.values.surname}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={clss}
                {...formik.getFieldProps("surname")}
              />
              {formik.touched.surname && formik.errors.surname && (
                <small className="text-red-600">{formik.errors.surname}</small>
              )}
            </div>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                name="title"
                type="text"
                value={formik.values.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={clss}
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <small className="text-red-600">{formik.errors.title}</small>
              )}
            </div>
            <div>
              <label htmlFor="userId">User:</label>
              <select
                id="userId"
                name="userId"
                className={clss}
                value={formik.values.userId}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                {...formik.getFieldProps("userId")}>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.userName}
                  </option>
                ))}
              </select>
              {formik.touched.userId && formik.errors.userId && (
                <small className="text-red-600">{formik.errors.userId}</small>
              )}
            </div>
            <div>
              <label htmlFor="branchId">Branch:</label>
              <select
                id="branchId"
                name="branchId"
                value={formik.values.branchId}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={clss}
                {...formik.getFieldProps("branchId")}>
                <option>Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
              {formik.touched.branchId && formik.errors.branchId && (
                <small className="text-red-600">{formik.errors.branchId}</small>
              )}
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="submit"
                disabled={isLoadingUsers || isLoadingBranches}
                className="w-28 h-9 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-500 font-medium rounded-lg text-base inline-flex px-3 py-2.5 justify-center items-center text-center mr-2">
                <FaSave className="mr-2" />
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-28 h-9 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-500 font-medium rounded-lg text-base inline-flex px-3 py-2.5 justify-center items-center text-center mr-2">
                <MdCancel className="mr-2" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorModal;
