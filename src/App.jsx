import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardHome from "./components/pages/Dashboard/DashboardHome";
import PatientsHome from "./components/pages/Dashboard/PatientsHome";
import ReceptionsHome from "./components/pages/Dashboard/ReceptionsHome";
import DoctorsHome from "./components/pages/Dashboard/DoctorsHome";
import AppointmentsHome from "./components/pages/Dashboard/AppointmentsHome";
import MedicineHome from "./components/pages/Dashboard/MedicineHome";
import SettingsHome from "./components/pages/Dashboard/SettingsHome";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/patients" element={<PatientsHome />} />
        <Route path="/receptions" element={<ReceptionsHome />} />
        <Route path="/doctors" element={<DoctorsHome />} />
        <Route path="/appointments" element={<AppointmentsHome />} />
        <Route path="/medicine" element={<MedicineHome />} />
        <Route path="/settings" element={<SettingsHome />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
