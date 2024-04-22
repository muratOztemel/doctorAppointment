import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAddNewPatientMutation } from "../../../redux/features/api/apiSlice";
import Spinner from "../../UI/Spinner";
import {
  setUserRegisterForm,
  setUserLogin,
} from "../../../redux/slices/usersSlice";
import { registerData } from "./registerData";
import { useFormik } from "formik";
import { schema } from "./reigisterSchema";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { id: userId, email: email } = useParams();
  const [addNewPatient, { data, isError, isLoading }] =
    useAddNewPatientMutation();
  const navigate = useNavigate();

  const addIpAddress = async () => {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      idNumber: "",
      birthDate: "",
      phoneNumber: "",
      ipAddress: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        toast("Giriş Başarılı. Yönetim Paneline Yönlendiriliyorsunuz!", {
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
        const ip = await addIpAddress();
        const newPatientData = {
          id: 0,
          userId: userId,
          name: values.name,
          surname: values.surname,
          identyNo: values.idNumber,
          birthDate: values.birthDate,
          phoneNumber: values.phoneNumber,
          ipAddress: ip,
          email: email,
          Country: "Turkey",
          Language: "Turkish",
          Nationality: "Turkish",
        };

        dispatch(setUserRegisterForm(newPatientData));

        await addNewPatient(newPatientData);
        navigate(`/dashboardPatient`);
      } catch (err) {
        console.error("Error adding new product:", err);
      }
    },
  });

  // Form içinde genel hata mesajını göstermek için
  {
    formik.errors.general && (
      <p className="text-red-500 text-center">{formik.errors.general}</p>
    );
  }

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {isError.toString()}</div>;

  return (
    <>
      <h2 className="text-center text-xl font-bold text-gray-900">
        <strong>Continue Registration</strong>
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
        <button
          type="submit"
          className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-700">
          Confirmation Email
        </button>
      </form>
    </>
  );
};
export default RegisterForm;
