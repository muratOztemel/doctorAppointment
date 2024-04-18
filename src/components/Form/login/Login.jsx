import { useDispatch } from "react-redux";
import { useAuthenticationMutation } from "../../../redux/features/api/apiSlice";
import usersSlice, { setUserLogin } from "../../../redux/slices/usersSlice";
import Spinner from "../../UI/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";
import LoginSchema from "./LoginSchema";
import { loginData } from "./loginData";
import { useEffect, useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [wrongP, setWrongP] = useState("");
  const dispatch = useDispatch();
  const [authentication, { data, isError, isLoading }] =
    useAuthenticationMutation();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        let result = await authentication({
          username: values.username,
          password: values.password,
        });

        if (result?.error?.originalStatus == 400) {
          setWrongP(result.error?.data);
          return;
        }

        const accessToken = result.data.accessToken;

        if (accessToken) {
          localStorage.setItem("token", accessToken);
          // Kullanıcı giriş bilgilerini Redux state'ine kaydet
          const decodedToken = jwtDecode(accessToken);
          const role =
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];

          dispatch(
            setUserLogin({
              username: values.username,
              token: accessToken,
              userRole: role,
            })
          );

          if (role === "Admin") {
            navigate("/dashboardAdmin");
          } else if (role === "Patient") {
            navigate("/dashboardPatient");
          }

          // Giriş başarılı, anasayfaya yönlendir
          // formik'in onSubmit içinde başarılı giriş sonrası
          // navigate("/dashboardPatient");
        }
      } catch (error) {
        console.error("Error user login:", error);
      }
    },
  });

  // Form içinde genel hata mesajını göstermek için
  {
    formik.errors.general && (
      <p className="text-red-500 text-center">{formik.errors.general}</p>
    );
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const role =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      if (role === "Admin") {
        navigate("/dashboardAdmin");
      } else if (role === "Patient") {
        navigate("/dashboardPatient");
      }
    }
  }, [navigate]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
      <p className="text-gray-700 mb-6">Please sign in to your account</p>
      <p className="text-red-500 text-center">{wrongP}</p>
      <form onSubmit={formik.handleSubmit}>
        {loginData.map((field) => (
          <div key={field.id} className="relative w-full flex my-4 flex-col">
            <div className="relative">
              <input
                id={field.id}
                name={field.id}
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
                    <img src="/images/icons/hide-eye.jpg" />
                  ) : (
                    <img src="/images/icons/show-eye.jpg" />
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
        {formik.errors.submit && (
          <p className="text-red-500 text-center">{formik.errors.submit}</p>
        )}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="text-white w-full mb-4 bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Login
        </button>
        <p>
          <Link className="text-purple-500">Forgot Password?</Link>
        </p>
        <p>Haven&apos;t you registered yet?</p>
      </form>
      <div className="mt-2 flex w-full">
        <Link
          to="/auth/register"
          className="text-white w-full mt-4 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Create account
        </Link>
      </div>
      <div className="mt-6">
        <button className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:bg-gray-100 hover:text-slate-900 hover:shadow transition duration-150">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="w-6 h-6"
            alt=""
          />{" "}
          <span>Login with Google</span>
        </button>
      </div>
    </>
  );
}

export default Login;
