import DashboardPatientLayout from "../layouts/DashboardPatientLayout/DashboardPatientLayout";
import ErrorPage from "../pages/ErrorPage";
import DashboardPatientPage from "../pages/DashboardPatient/DashboardPatientPage";
import DashboardPatientAppointments from "../pages/DashboardPatient/DashboardPatientAppointments";
import PatientProfile from "../components/PatientDashboards/PatientProfile";
import ProtectedRoute from "../components/Security/ProtectedRoute";
import PatientSettings from "../components/PatientDashboards/PatientSettings";
import PatientAppointments from "../components/PatientDashboards/PatientAppointments";

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
        path: "appointments",
        element: <DashboardPatientAppointments />,
      },
      {
        path: "settings",
        element: <PatientSettings />,
      },
    ],
  },
];
