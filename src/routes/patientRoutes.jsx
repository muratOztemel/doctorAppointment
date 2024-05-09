import DashboardPatientLayout from "../layouts/DashboardPatientLayout/DashboardPatientLayout";
import ErrorPage from "../pages/ErrorPage";
import DashboardPatientPage from "../pages/DashboardPatient/DashboardPatientPage";
import PatientProfile from "../components/PatientDashboards/PatientProfile";
import ProtectedRoute from "../components/Security/ProtectedRoute";
import PatientSettings from "../components/PatientDashboards/PatientSettings";

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
        path: "profile",
        element: <PatientProfile />,
      },
      {
        path: "settings",
        element: <PatientSettings />,
      },
    ],
  },
];
