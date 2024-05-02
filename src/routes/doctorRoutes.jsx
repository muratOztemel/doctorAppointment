import ErrorPage from "../pages/ErrorPage";
import DashboardDoctorLayout from "../layouts/DashboardDoctorLayout";
import DashboardDoctorPage from "../pages/DashboardDoctor/DashboardDoctorPage";
import ProtectedRoute from "../components/Security/ProtectedRoute";

export const doctorRoutes = [
  {
    path: "/dashboard/doctor/doctorDashboard",
    element: (
      <ProtectedRoute allowedRoles={["Doctor"]}>
        <DashboardDoctorLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardDoctorPage />,
      },
    ],
  },
];
