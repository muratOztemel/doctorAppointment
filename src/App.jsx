import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardHome from "./components/pages/Dashboard/DashboardHome";
import PatientsHome from "./components/pages/Dashboard/PatientsHome";
import ReceptionsHome from "./components/pages/Dashboard/ReceptionsHome";
import DoctorsHome from "./components/pages/Dashboard/DoctorsHome";
import AppointmentsHome from "./components/pages/Dashboard/AppointmentsHome";
import MedicineHome from "./components/pages/Dashboard/MedicineHome";
import SettingsHome from "./components/pages/Dashboard/SettingsHome";
import LeftSide from "./components/Layout/Dashboard/LeftSide";

const App = () => {
  return (
    <BrowserRouter>
      <div className="fixed z-50 inset-4 pointer-events-none"></div>
      <div className="bg-slate-50 xl:h-screen flex-col ">
        <div className="grid xl:grid-cols-12 w-full 2xl:max-w-[2000px]">
          <LeftSide />
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/patients" element={<PatientsHome />} />
            <Route path="/receptions" element={<ReceptionsHome />} />
            <Route path="/doctors" element={<DoctorsHome />} />
            <Route path="/appointments" element={<AppointmentsHome />} />
            <Route path="/medicine" element={<MedicineHome />} />
            <Route path="/settings" element={<SettingsHome />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default App;
