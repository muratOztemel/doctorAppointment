import { registerData } from "./registerData";
import { useFormik } from "formik";
import { schema } from "./reigisterSchema";
/* import { Link } from "react-router-dom";
 */ import { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormdata] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      idNumber: "",
      birthDate: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      terms: false,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/register")
  //     .then((ressponse) => setFormdata(ressponse.data))
  //     .catch((err) => console.log(err));
  // }, []);

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
                  className="text-green-600 hover:text-green-900 ">
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
                    <p>Burada kullanıcı sözleşmesi metniniz yer alacak.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        setChecked(true);
                      }}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                      Kabul Et
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-700">
            Kayıt Ol
          </button>
          {/*    <Link to={"/userForm"}>UserForm </Link> */}
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;
