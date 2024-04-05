import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Security/ProtectedRoute.jsx";
import DashboardHome from "./components/pages/Dashboard/DashboardHome";
import PatientsHome from "./components/pages/Dashboard/PatientsHome";
import PatientProfile from "./components/Dasboards/Patients/PatientProfile";
import DeletePatient from "./components/Dasboards/Patients/DeletePatient";
import DoctorsHome from "./components/pages/Dashboard/DoctorsHome";
import AppointmentsHome from "./components/pages/Dashboard/AppointmentsHome";
import MedicineHome from "./components/pages/Dashboard/MedicineHome";
import SettingsHome from "./components/pages/Dashboard/SettingsHome";
import LeftSide from "./components/Layout/Dashboard/LeftSide";
import MainHeader from "./components/Layout/Dashboard/MainHeader";
import Login from "./components/Form/Login/Login.jsx";
import RegisterForm from "./components/Form/Register/RegisterForm";
import AddMedical from "./components/Dasboards/Medical/AddMedical.jsx";
import AddDoctor from "./components/Dasboards/Doctors/AddDoctor.jsx";
import DoctorProfile from "./components/Dasboards/Doctors/DoctorProfile.jsx";
import AppointmentProfile from "./components/Dasboards/Appointments/AppointmentProfile.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registerForm" element={<RegisterForm />} />
        <Route
          path="*"
          element={
            <>
              <div className="fixed z-50 inset-4 pointer-events-none"></div>
              <div className="bg-slate-50 xl:h-screen flex-col ">
                <div className="grid xl:grid-cols-12 w-full 2xl:max-w-[2000px]">
                  <LeftSide />
                  <div className="col-span-10 xl:h-screen overflow-y-scroll relative">
                    <MainHeader />
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <ProtectedRoute>
                            <DashboardHome />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/patients"
                        element={
                          <ProtectedRoute>
                            <PatientsHome />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/addMedical"
                        element={
                          <ProtectedRoute>
                            <AddMedical />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/addDoctor"
                        element={
                          <ProtectedRoute>
                            <AddDoctor />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/patientProfile"
                        element={
                          <ProtectedRoute>
                            <PatientProfile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/doctorProfile"
                        element={
                          <ProtectedRoute>
                            <DoctorProfile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/patientDelete"
                        element={
                          <ProtectedRoute>
                            <DeletePatient />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/doctors"
                        element={
                          <ProtectedRoute>
                            <DoctorsHome />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/appointments"
                        element={
                          <ProtectedRoute>
                            <AppointmentsHome />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/appointmentProfile"
                        element={
                          <ProtectedRoute>
                            <AppointmentProfile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/medicine"
                        element={
                          <ProtectedRoute>
                            <MedicineHome />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/settings"
                        element={
                          <ProtectedRoute>
                            <SettingsHome />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
