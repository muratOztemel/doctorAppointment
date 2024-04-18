import Card from "../../components/UI/Cards/Card";
import { PiUsers } from "react-icons/pi";
import LinkDashboardBar from "../../layouts/DashboardAdminLayout/LinkDashboardBar";
import ChartDoctors from "../../components/Dasboards/Charts/ChartDoctors";
import TitleCard from "../../components/UI/Cards/TitleCard";

const DashboardHome = () => {
  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"D A S H B O A R D"} />
        <LinkDashboardBar />
        <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
          <div className="xl:col-span-12 w-full">
            <Card
              title={"Appointments with Doctor Graphic"}
              icon={<PiUsers />}
              color={"cyan"}>
              <ChartDoctors />
            </Card>
          </div>
          <div className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6"></div>
        </div>
      </div>
    </>
  );
};
export default DashboardHome;
