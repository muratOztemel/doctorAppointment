import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCreateAuthenticationMutation } from "../../../redux/features/api/apiSlice";
import {
  decreaseTimer,
  resetTimer,
  setIsActive,
} from "../../../redux/slices/modalSlice.js";
import {
  setUserRegisterForm,
  setUserLogin,
} from "../../../redux/slices/usersSlice";
import { registerData } from "./RegisterData.js";
import { useFormik } from "formik";
import { schema } from "./RegisterSchema.js";
import { Link } from "react-router-dom";
import Spinner from "../../UI/Spinner";
import ModalConfirmation from "../../UI/Modal/ModalConfirmation.jsx";
import { toast } from "react-toastify";

const RegisterEmail = () => {
  const dispatch = useDispatch();
  const [authentication, { dataAuth, isErrorAuth, isLoadingAuth }] =
    useCreateAuthenticationMutation();
  const { timer, isActive } = useSelector((state) => state.modal);
  const { userLogin, userRegisterForm } = useSelector((state) => state.users);

  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [wrongP, setWrongP] = useState("");
  const [isShowConfirmation, setIsShowConfirmation] = useState(false);
  const [otpInputs, setOtpInputs] = useState("");

  useEffect(() => {
    let intervalId;
    if (isActive && timer > 0) {
      intervalId = setInterval(() => {
        dispatch(decreaseTimer());
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isActive, timer, dispatch]);

  const handleOtpChange = (otp) => {
    setOtpInputs(otp);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        toast("Kayıt başarılı. Kayda devama Yönlendiriliyorsunuz!", {
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
        let newUserLogin = {
          username: values.email,
        };
        const newUserData = {
          createdAt: new Date().toISOString(),
          updatedAt: null,
          status: false,
          userRoles: null,
        };
        dispatch(setUserRegisterForm(newUserData));
        let result = await authentication({
          email: values.email,
          password: values.password,
        });
        console.log(result?.data);
        setIsShowConfirmation(true);
        newUserLogin = {
          ...newUserLogin,
          userId: result?.data.id,
        };
        dispatch(setUserLogin(newUserLogin));
        if (result?.error?.originalStatus == 400) {
          setWrongP(result.error?.data);
          return;
        }
      } catch (err) {
        console.error("Error adding new product:", err);
      }
    },
  });

  // Show general message in Form
  {
    formik.errors.general && (
      <p className="text-red-500 text-center">{formik.errors.general}</p>
    );
  }

  if (isLoadingAuth) return <Spinner />;
  if (isErrorAuth) return <div>Error: {isErrorAuth.toString()}</div>;

  return (
    <>
      <h2 className="text-center text-xl font-semibold text-gray-900">
        Create a new account
      </h2>
      <h4 className="text-center text-gray-400">It's quick and easy</h4>
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
                className="text-gray-400 hover:text-gray-600 text-xs">
                I have read, understand and accept the User Agreement.
              </button>
            </span>
            {isShowConfirmation && (
              <ModalConfirmation
                onInputChange={handleOtpChange}
                setIsShowConfirmation={setIsShowConfirmation}
                isShowConfirmation={isShowConfirmation}
                email={userLogin.username}
                userId={userLogin.userId}
                message={`The activation code is sent to email address!`}
              />
            )}
            {/* Modal */}
            {isOpen && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-5 rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold">User agreement</h2>
                  <p>Your user agreement text will be located here.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setChecked(true);
                    }}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Accept
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-700">
          Confirmation Email
        </button>
        <div className="mt-2 flex w-full">
          <Link
            to="/auth/login"
            className="text-white w-full mt-4 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Already have an account?
          </Link>
        </div>
      </form>
    </>
  );
};
export default RegisterEmail;
