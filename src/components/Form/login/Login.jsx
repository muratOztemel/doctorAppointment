import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthenticationMutation } from "../../../redux/features/api/apiSlice";
import { setUserLogin } from "../../../redux/slices/usersSlice";
import { setPatientId } from "../../../redux/slices/patientSlice";
import { setDoctorId } from "../../../redux/slices/doctorsSlice";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";
import LoginSchema from "./LoginSchema";
import { loginData } from "./loginData";
import { toast } from "react-toastify";
import Spinner from "../../UI/Spinner";

let audio = new Audio("/sounds/heartbeat.mp3");

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [wrongP, setWrongP] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [authentication, { isLoading }] = useAuthenticationMutation();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const playHeartbeatSound = () => {
    if (!audio.playing) {
      audio.loop = true;
      audio.play();
    }
  };

  const stopHeartbeatSound = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  useEffect(() => {
    if (isLoading) {
      playHeartbeatSound();
      setIsModalVisible(true);
    } else {
      stopHeartbeatSound();
      setIsModalVisible(false);
    }

    return () => {
      stopHeartbeatSound();
    };
  }, [isLoading]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        setIsModalVisible(true);

        const delayPromise = new Promise((resolve) =>
          setTimeout(resolve, 1000)
        );
        const result = await authentication({
          username: values.username,
          password: values.password,
        });

        await delayPromise;

        if (result?.error?.originalStatus === 400) {
          setWrongP(result.error.data);
          setIsModalVisible(false);
          return;
        }

        const token = result.data.accessToken;

        if (token) {
          localStorage.setItem("token", token);
          const decodedToken = jwtDecode(token);

          const userRole =
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
          const primarysid =
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/primarysid"
            ];
          const groupSid =
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid"
            ];
          const userId =
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"
            ];
          const username =
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ];

          if (userRole === "Patient") {
            dispatch(setPatientId(groupSid));
          } else if (userRole === "Doctor") {
            dispatch(setDoctorId(Number(primarysid)));
          }

          dispatch(setUserLogin({ userId, username, token, userRole }));

          navigate(
            userRole === "Admin"
              ? "/dashboard/admin"
              : userRole === "Patient"
              ? "/dashboard/patient/"
              : "/dashboard/doctor"
          );
        }
      } catch (error) {
        console.error("Error user login:", error);
        toast.error("An error occurred during login. Please try again.");
      } finally {
        setTimeout(() => {
          setIsModalVisible(false);
          stopHeartbeatSound();
        }, 5000);
      }
    },
  });

  return (
    <>
      {isModalVisible && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <Spinner />
          </div>
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
      <p className="text-gray-700 mb-6">Please sign in to your account</p>
      <p className="text-red-500 text-center">{wrongP}</p>
      <form onSubmit={formik.handleSubmit}>
        {loginData.map((field) => (
          <div key={field.id} className="relative w-full flex my-4 flex-col">
            <div className="relative">
              <input
                id={field.id}
                name={field.name}
                type={
                  field.id === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : field.type
                }
                placeholder={field.placeholder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name]}
                className={`shadow appearance-none items-center border rounded w-full py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.touched[field.id] && formik.errors[field.id]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {field.id === "password" && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 mr-6">
                  {showPassword ? (
                    <img src="/images/icons/hide-eye.jpg" alt="hide" />
                  ) : (
                    <img src="/images/icons/show-eye.jpg" alt="show" />
                  )}
                </button>
              )}
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
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="text-white w-full mb-4 bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Login
        </button>
        <p>
          <Link to="/auth/forgotPassword" className="text-purple-500">
            Forgot Password?
          </Link>
        </p>
        <p>Haven't you registered yet?</p>
      </form>
      <div className="mt-2 flex w-full">
        <Link
          to="/auth/register"
          className="text-white w-full mt-4 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Create account
        </Link>
      </div>
      <div>
        <Link
          to="/"
          className="text-center flex justify-center items-center hover:text-red-500 mt-6">
          Go to Homepage
        </Link>
      </div>
    </>
  );
}

export default Login;
