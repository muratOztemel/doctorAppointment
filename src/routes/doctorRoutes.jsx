import ErrorPage from "../pages/ErrorPage";
import DashboardDoctorLayout from "../layouts/DashboardDoctorLayout";
import DashboardDoctorPage from "../pages/DashboardDoctor/DashboardDoctorPage";

export const doctorRoutes = [
  {
    path: "/doctorDashboard",
    element: <DashboardDoctorLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardDoctorPage />,
      },
    ],
  },
];
