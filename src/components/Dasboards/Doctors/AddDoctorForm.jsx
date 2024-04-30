import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetUsersQuery,
  useGetBranchesQuery,
} from "../../../redux/features/api/apiSlice";

const AddDoctorForm = () => {
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
  const { data: branches, isLoading: isLoadingBranches } =
    useGetBranchesQuery();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      title: "",
      userId: "",
      branchId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      surname: Yup.string().required("Surname is required"),
      title: Yup.string().required("Title is required"),
      userId: Yup.number().required("User is required"),
      branchId: Yup.number().required("Branch is required"),
    }),
    onSubmit: (values) => {
      console.log("Form values:", values);
      // Place API call function here
    },
  });

  if (isLoadingUsers || isLoadingBranches) {
    return <div>Loading...</div>;
  }

  const clss =
    "block w-80 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        className={clss}
        onChange={formik.handleChange}
        value={formik.values.name}
      />

      <label htmlFor="surname">Surname:</label>
      <input
        id="surname"
        name="surname"
        type="text"
        className={clss}
        onChange={formik.handleChange}
        value={formik.values.surname}
      />

      <label htmlFor="title">Title:</label>
      <input
        id="title"
        name="title"
        type="text"
        className={clss}
        onChange={formik.handleChange}
        value={formik.values.title}
      />

      <label htmlFor="userId">User:</label>
      <select
        id="userId"
        name="userId"
        className={clss}
        onChange={formik.handleChange}
        value={formik.values.userId}>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.userName}
          </option>
        ))}
      </select>

      <label htmlFor="branchId">Branch:</label>
      <select
        id="branchId"
        name="branchId"
        className={clss}
        onChange={formik.handleChange}
        value={formik.values.branchId}>
        {branches.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddDoctorForm;
