import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const DoctorForm = ({ branches, userId }) => {
  const initialValues = {
    branchId: "",
    name: "",
    surname: "",
    title: "",
    createdBy: userId,
    updatedBy: userId,
    userId,
  };

  const validationSchema = Yup.object().shape({
    branchId: Yup.number().required("Branch ID is required"),
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    title: Yup.string().required("Title is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  const clss =
    "block w-80 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <div>
              <label htmlFor="branchId">Branch ID:</label>
              <Field as="select" name="branchId" type="number" className={clss}>
                <option value="">Select a branch</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="branchId"
                component="div"
                className="text-red-500"
              />
            </div>

            <div>
              <label htmlFor="name">Name:</label>
              <Field name="name" type="text" className={clss} />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>

            <div>
              <label htmlFor="surname">Surname:</label>
              <Field name="surname" type="text" className={clss} />
              <ErrorMessage
                name="surname"
                component="div"
                className="text-red-500"
              />
            </div>

            <div>
              <label htmlFor="title">Title:</label>
              <Field name="title" type="text" className={clss} />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500"
              />
            </div>

            <div>
              <label htmlFor="userId">User ID:</label>
              <Field name="userId" type="number" className={clss} />
              <ErrorMessage
                name="userId"
                component="div"
                className="text-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-56 h-10 bg-cyan-700 rounded mt-4 text-white text-lg">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DoctorForm;
