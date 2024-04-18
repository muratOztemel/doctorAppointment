import DashboardPatientLayout from "../layouts/DashboardPatientLayout/DashboardPatientLayout";
import ErrorPage from "../pages/ErrorPage";
import DashboardPatientPage from "../pages/DashboardPatient/DashboardPatientPage";

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
    ],
  },
];
