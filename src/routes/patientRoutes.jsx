import DashboardPatientLayout from "../layouts/DashboardPatientLayout/DashboardPatientLayout";
import ErrorPage from "../pages/ErrorPage";
import DashboardPatientPage from "../pages/DashboardPatient/DashboardPatientPage";
import PatientProfile from "../components/PatientDashboards/PatientProfile";
import ProtectedRoute from "../components/Security/ProtectedRoute";

export const patientRoutes = [
  {
    path: "/dashboard/patient/",
    element: <DashboardPatientLayout />,
    elementError: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPatientPage />,
      },
      {
        path: "dashboardPatientProfile",
        element: <PatientProfile />,
      },
    ],
  },
];
