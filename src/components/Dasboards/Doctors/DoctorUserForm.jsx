import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRef } from "react";
import emailjs from "@emailjs/browser"; // Doğru import ifadesi

const DoctorUserForm = () => {
  function generatePassword(length = 10) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  /* const form = useRef(null); // Form ref'ini kullanmak için useRef hook'u */

  const initialValues = {
    userName: "",
    password: generatePassword(),
    createdAt: new Date().toISOString(),
    status: true,
  };

  /*   const validationSchema = Yup.object().shape({
    user_email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  }); */
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    /*     emailjs
      .sendForm(
        "service_2zvjxxw",
        "template_joaggto",
        form.current,
        "x_lflcBSv3vS4P2hK"
      )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
          setSubmitting(false);
        },
        (error) => {
          console.log("Failed to send email.", error.text);
          setSubmitting(false);
        }
      ); */
  };

  const clss =
    "block w-80 h-10 pl-4 pr-4 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none";

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div>
              <label htmlFor="userName">Doctor Email Address:</label>
              <Field name="userName" type="email" className={clss} />
              <ErrorMessage name="userName" component="div" />
            </div>
            <button
              type="submit"
              className="w-80 h-10 bg-cyan-700 rounded mt-4 text-white text-lg">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DoctorUserForm;
