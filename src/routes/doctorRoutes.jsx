import ErrorPage from "../pages/ErrorPage";
import DashboardDoctorLayout from "../layouts/DashboardDoctorLayout/DashboardDoctorLayout";
import DashboardDoctorPage from "../pages/DashboardDoctor/DashboardDoctorPage";
import ProtectedRoute from "../components/Security/ProtectedRoute";
import DashboardDoctorAppointmentList from "../pages/DashboardDoctor/DashboardDoctorAppointmentList";
import DashboardDoctorPatientList from "../pages/DashboardDoctor/DashboardDoctorPatientList";
import DashboardDoctorPatientProfile from "../pages/DashboardDoctor/DashboardDoctorPatientProfile";
import DashboardDoctorVisiting from "../pages/DashboardDoctor/DashboardDoctorVisiting";
import DashboardDoctorProfile from "../pages/DashboardDoctor/DashboardDoctorProfile";
import DashboardDoctorSettings from "../pages/DashboardDoctor/DashboardDoctorSettings";
import DashboardDoctorPatientAppointments from "../pages/DashboardDoctor/DashboardDoctorPatientAppointments";
import DashboardDoctorPatientMedicalRecords from "../pages/DashboardDoctor/DashboardDoctorPatientMedicalRecords";

export const doctorRoutes = [
  {
    path: "/dashboard/doctor/",
    element: (
      // <ProtectedRoute allowedRoles={["Doctor"]}>
      <DashboardDoctorLayout />
      // </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardDoctorPage />,
      },
      {
        path: "appointments",
        element: <DashboardDoctorAppointmentList />,
      },
      {
        path: "medicalRecords/:id/:name",
        element: <DashboardDoctorPatientMedicalRecords />,
      },
      {
        path: "patientAppointments/:id/:name",
        element: <DashboardDoctorPatientAppointments />,
      },
      {
        path: "patients",
        element: <DashboardDoctorPatientList />,
      },
      {
        path: "patient/:id/:name",
        element: <DashboardDoctorPatientProfile />,
      },
      {
        path: "visiting/:id/:apId/:name",
        element: <DashboardDoctorVisiting />,
      },
      {
        path: "profile",
        element: <DashboardDoctorProfile />,
      },
      {
        path: "settings",
        element: <DashboardDoctorSettings />,
      },
    ],
  },
];
