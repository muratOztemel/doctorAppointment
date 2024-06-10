import DoctorDetail from "../components/Main/DoctorDetail";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import About from "../pages/Main/About";
import Contact from "../pages/Main/Contact";
import Doctors from "../pages/Main/Doctors";
import Faq from "../pages/Main/Faq";
import HomePage from "../pages/Main/HomePage";
import Services from "../pages/Main/Services";
import Unauthorized from "../pages/Unauthorized";

export const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/doctor/:id",
        element: <DoctorDetail />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
];
