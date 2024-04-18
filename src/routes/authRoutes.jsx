import AuthLayout from "../layouts/AuthLayout";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import RegisterPageContinue from "../pages/Auth/RegisterPageContinue";

export const authRoutes = [
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "registerContinue/:id/:email",
        element: <RegisterPageContinue />,
      },
    ],
  },
];
