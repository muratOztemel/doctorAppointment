import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const DoctorForm = () => {
  const initialValues = {
    branchId: "",
    name: "",
    surname: "",
    title: "",
    createdBy: "",
    updatedBy: "",
    userId: "",
  };

  const validationSchema = Yup.object().shape({
    branchId: Yup.number()
      .required("Branch ID is required")
      .positive("Branch ID must be positive"),
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    title: Yup.string().required("Title is required"),
    createdBy: Yup.number()
      .required("Created By is required")
      .positive("Creator ID must be positive"),
    updatedBy: Yup.number()
      .required("Updated By is required")
      .positive("Updater ID must be positive"),
    userId: Yup.number()
      .required("User ID is required")
      .positive("User ID must be positive"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h1>Doctor Information Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <div>
              <label htmlFor="branchId">Branch ID:</label>
              <Field name="branchId" type="number" />
              <ErrorMessage name="branchId" component="div" />
            </div>

            <div>
              <label htmlFor="name">Name:</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="surname">Surname:</label>
              <Field name="surname" type="text" />
              <ErrorMessage name="surname" component="div" />
            </div>

            <div>
              <label htmlFor="title">Title:</label>
              <Field name="title" type="text" />
              <ErrorMessage name="title" component="div" />
            </div>

            <div>
              <label htmlFor="createdBy">Created By:</label>
              <Field name="createdBy" type="number" />
              <ErrorMessage name="createdBy" component="div" />
            </div>

            <div>
              <label htmlFor="updatedBy">Updated By:</label>
              <Field name="updatedBy" type="number" />
              <ErrorMessage name="updatedBy" component="div" />
            </div>

            <div>
              <label htmlFor="userId">User ID:</label>
              <Field name="userId" type="number" />
              <ErrorMessage name="userId" component="div" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DoctorForm;
