import { useDispatch } from "react-redux";
import { useAddNewPatientMutation } from "../../../redux/features/api/apiSlice";
import Spinner from "../../UI/Spinner";
import { setUserRegisterForm } from "../../../redux/slices/usersSlice";
import { useFormik } from "formik";
import { schema } from "./reigisterSchema";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerData } from "./registerData";
const RegisterForm = () => {
  const dispatch = useDispatch();
  const [addNewPatient, { data, isError, isLoading }] =
    useAddNewPatientMutation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const addIpAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (err) {
      console.error("Yeni hastaya IP eklenirken hata oluştu:", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      idNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthDate: "",
      phoneNumber: "",
      terms: false,
    },
    validationSchema: schema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const ip = await addIpAddress();
        const newPatientData = {
          name: values.name,
          surname: values.surname,
          idNumber: values.idNumber,
          birthDate: values.birthDate,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          phoneNumber: values.phoneNumber,
          terms: values.terms,
          ipAddress: ip,
        };

        dispatch(setUserRegisterForm(newPatientData));
        await addNewPatient(newPatientData).unwrap();
        navigate("/success");
      } catch (err) {
        console.error("Yeni hastaya ekleme hatası:", err);
        setFieldError("general", "Beklenmeyen bir hata oluştu.");
      }
    },
  });

  if (isLoading) return <Spinner />;
  if (isError) return <div>Hata: {isError.toString()}</div>;

  return (
    <div className="flex justify-center items-center bg-gray-50  vh-120 h-screen">
      <div className="bg-white p-4 rounded w-[450px] my-6 mx-10">
        <h2 className="text-center text-xl font-bold text-gray-900">
          <strong>Register</strong>
        </h2>
        <form className="space-y-4 mt-6" onSubmit={formik.handleSubmit}>
          {registerData.map((input) => (
            <div key={input.id} className="relative w-full flex flex-col">
              <div className="relative">
                <input
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={formik.handleChange}
                  value={formik.values[input.id]}
                  className={`shadow appearance-none items-center border rounded w-full py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formik.touched[input.id] && formik.errors[input.id]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {input.icon && (
                  <span className="input-icon absolute inset-y-0 right-0 flex items-center pr-3">
                    <input.icon className="w-5 h-5 text-gray-500" />
                  </span>
                )}
              </div>
              {formik.touched[input.id] && formik.errors[input.id] && (
                <p className="text-red-500 text-xs italic mt-1">
                  {formik.errors[input.id]}
                </p>
              )}
            </div>
          ))}
          {formik.errors.submit && (
            <p className="text-red-500 text-center">{formik.errors.submit}</p>
          )}

          <div className="relative w-full flex flex-col">
            <div className="flex justify-center items-center mx-2">
              <input
                id="terms"
                type="checkbox"
                onChange={formik.handleChange}
                onClick={() => setChecked(!checked)}
                checked={checked}
                value={formik.values.terms}
                className="form-checkbox h-5 w-5 text-gray-600"
                required
              />
              <span className="ml-2 text-gray-700">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="text-green-600 hover:text-green-900 "
                >
                  Kullanıcı sözleşmesini kabul ediyorum.
                </button>
              </span>

              {/* Modal */}
              {isOpen && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-5 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold">
                      Kullanıcı Sözleşmesi
                    </h2>
                    <p>
                      Burada kullanıcı sözleşmesi metniniz eklegit add{" "}
                      <div className=""></div>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        setChecked(true);
                      }}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                      Kabul Et
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-700"
          >
            Register
          </button>
          <div className="mt-2 flex w-full">
            <Link
              to="/"
              className="text-white w-full mt-4 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;
