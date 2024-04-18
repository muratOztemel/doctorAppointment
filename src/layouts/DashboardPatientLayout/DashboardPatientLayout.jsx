import { Outlet } from "react-router-dom";
import HeaderPatientLayout from "./HeaderPatientLayout";
import LeftSidebarPatientLayout from "./LeftSidebarPatientLayout";

const DashboardPatientLayout = () => {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-100 text-black">
      <HeaderPatientLayout />
      <LeftSidebarPatientLayout />
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};
export default DashboardPatientLayout;
