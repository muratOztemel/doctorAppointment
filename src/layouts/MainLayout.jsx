import { Outlet } from "react-router-dom";
import HeaderMainLayout from "./HeaderMainLayout";

const MainLayout = () => {
  return (
    <div>
      <HeaderMainLayout />
      <Outlet />
    </div>
  );
};
export default MainLayout;
