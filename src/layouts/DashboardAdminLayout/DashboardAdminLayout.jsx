import { Outlet } from "react-router-dom";
import HeaderAdminLayout from "./HeaderAdminLayout";
import LeftSidebarAdminLayout from "./LeftSidebarAdminLayout";

const DashboardAdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-100 text-black">
      <HeaderAdminLayout />
      <LeftSidebarAdminLayout />
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};
export default DashboardAdminLayout;
