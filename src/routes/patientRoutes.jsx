import DashboardPatientLayout from "../layouts/DashboardPatientLayout/DashboardPatientLayout";
import ErrorPage from "../pages/ErrorPage";
import DashboardPatientPage from "../pages/DashboardPatient/DashboardPatientPage";
import PatientProfile from "../components/PatientDashboards/PatientProfile";

export const patientRoutes = [
  {
    path: "/",
    element: <DashboardPatientLayout />,
    elementError: <ErrorPage />,
    children: [
      {
        path: "dashboardPatient",
        element: <DashboardPatientPage />,
      },
      {
        path: "dashboardPatientProfile",
        element: <PatientProfile />,
      },
    ],
  },
];
