import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import LoginSchema from "./LoginSchema"; // Yup ile oluşturulmuş schema'nızın yolu
import { loginData } from "./loginData"; // Giriş formu alanlarınızı içeren dizi
import axios from "axios";
import { useEffect, useState } from "react";

function Login() {
  const [formData, setFormdata] = useState({});
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  useEffect(() => {
    axios
      .get("http://localhost:3000/login")
      .then((ressponse) => setFormdata(ressponse.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex justify-center items-center bg-gray-50 vh-100 h-screen">
      <div className="bg-white p-4 rounded w-[400px] my-6 mx-10 h-[400px] shadow-lg">
        <h2 className="text-center text-xl font-bold text-gray-900">Login</h2>

        <form onSubmit={formik.handleSubmit}>
          {loginData.map((field) => (
            <div key={field.id} className="relative w-full flex my-4 flex-col">
              <div className="relative">
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.id]}
                  className={`shadow appearance-none items-center border rounded w-full py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formik.touched[field.id] && formik.errors[field.id]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {field.icon && (
                  <span className="input-icon absolute inset-y-0 right-0 flex items-center pr-3">
                    <field.icon className="w-5 h-5 text-gray-500" />
                  </span>
                )}
              </div>
              {formik.touched[field.id] && formik.errors[field.id] && (
                <p className="text-red-500 text-xs italic mt-1">
                  {formik.errors[field.id]}
                </p>
              )}
            </div>
          ))}
          {formik.errors.submit && (
            <p className="text-red-500 text-center">{formik.errors.submit}</p>
          )}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="text-white w-full mb-4 bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
          <p>Siz hala kaydolmadınız mı?</p>
          <div className="mt-2 flex w-full">
            <Link
              to="/register"
              className="text-white w-full mt-4 bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sing Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
