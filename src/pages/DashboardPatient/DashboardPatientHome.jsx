import Card from "../../components/UI/Cards/Card";
import TitleCard from "../../components/UI/Cards/TitleCard";
import { FaUserInjured } from "react-icons/fa";

const DashboardPatientHome = () => {
  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"D A S H B O A R D"} />
        <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
          <div className="xl:col-span-12 w-full">
            <Card
              title={"Patient dashboard"}
              icon={<FaUserInjured />}
              color={"cyan"}></Card>
          </div>
          <div className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6"></div>
        </div>
      </div>
    </>
  );
};
export default DashboardPatientHome;
