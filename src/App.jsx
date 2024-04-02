import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Login from "./components/Form/Login.jsx";
import RegisterForm from "./components/Form/register/RegisterForm";

const App = () => {
  return (
    <BrowserRouter>
      <div className="fixed z-50 inset-4 pointer-events-none"></div>
      <div className="bg-slate-50 xl:h-screen flex-col ">
        <div className="grid xl:grid-cols-12 w-full 2xl:max-w-[2000px]">
          <LeftSide />
          <div className="col-span-10 xl:h-screen overflow-y-scroll relative">
            <MainHeader />
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/patients" element={<PatientsHome />} />
              <Route path="/patientProfile" element={<PatientProfile />} />
              <Route path="/patientDelete" element={<DeletePatient />} />
              <Route path="/doctors" element={<DoctorsHome />} />
              <Route path="/appointments" element={<AppointmentsHome />} />
              <Route path="/medicine" element={<MedicineHome />} />
              <Route path="/settings" element={<SettingsHome />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default App;
