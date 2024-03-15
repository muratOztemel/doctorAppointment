import Card from "../../UI/Cards/Card";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { RiMedicineBottleLine } from "react-icons/ri";

const LinkDashboardBar = () => {
  return (
    <div className="w-full grid xl:grid-cols-4 gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      <Card
        title={"Today Appointment"}
        icon={<IoDocumentTextOutline />}
        color={"yellow"}>
        <div className="grid grid-cols-8 gap-4 mt-4 bg-cyan-50 py-5 px-8 items-center rounded-xl">
          10
        </div>
      </Card>
      <Card
        title={"Monthly Appointment"}
        icon={<IoDocumentTextOutline />}
        color={"yellow"}>
        <div className="grid grid-cols-8 gap-4 mt-4 bg-cyan-50 py-5 px-8 items-center rounded-xl">
          50
        </div>
      </Card>
      <Card title={"Total Patients"} icon={<PiUsers />} color={"cyan"}>
        <div className="grid grid-cols-8 gap-4 mt-4 bg-cyan-50 py-5 px-8 items-center rounded-xl">
          10
        </div>
      </Card>
      <Card title={"Doctors"} icon={<RiMedicineBottleLine />} color={"teal"}>
        <div className="grid grid-cols-8 gap-4 mt-4 bg-cyan-50 py-5 px-8 items-center rounded-xl">
          3
        </div>
      </Card>
    </div>
  );
};
export default LinkDashboardBar;
