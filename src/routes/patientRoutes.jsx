import DashboardPatientLayout from "../layouts/DashboardPatientLayout/DashboardPatientLayout";
import ErrorPage from "../pages/ErrorPage";
import DashboardPatientPage from "../pages/DashboardPatient/DashboardPatientPage";
import DashboardPatientAppointments from "../pages/DashboardPatient/DashboardPatientAppointments";
import DashboardPatientFavoriteDoctors from "../pages/DashboardPatient/DashboardPatientFavoriteDoctors";
import PatientProfile from "../components/PatientDashboards/PatientProfile";
import ProtectedRoute from "../components/Security/ProtectedRoute";
import PatientSettings from "../components/PatientDashboards/PatientSettings";
import DashboardGetAppointment from "../pages/DashboardPatient/DashboardGetAppointment";
import DashboardPatientDoctorProfile from "../pages/DashboardPatient/DashboardPatientDoctorProfile";

export const patientRoutes = [
  {
    path: "/dashboard/patient/",
    element: <DashboardPatientLayout />,
    errorElement: <ErrorPage />,
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
        path: "getAppointmentDoctor",
        element: <DashboardGetAppointment />,
      },
      {
        path: "mydoctors",
        element: <DashboardPatientFavoriteDoctors />,
      },
      {
        path: "doctor/:id/:name",
        element: <DashboardPatientDoctorProfile />,
      },
      {
        path: "settings",
        element: <PatientSettings />,
      },
    ],
  },
];
