import Card from "../../UI/Cards/Card";
import { IoDocumentTextOutline } from "react-icons/io5";

const LinkDashboardBar = () => {
  return (
    <div className="w-full grid xl:grid-cols-4 gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      <Card title={"Today Appointment"} icon={<IoDocumentTextOutline />}>
        <div className="grid grid-cols-8 gap-4 mt-4 bg-cyan-50 py-5 px-8 items-center rounded-xl">
          10
        </div>
      </Card>
      <Card title={"Monthly Appointment"} icon={<IoDocumentTextOutline />}>
        <div className="grid grid-cols-8 gap-4 mt-4 bg-cyan-50 py-5 px-8 items-center rounded-xl">
          Detail
        </div>
      </Card>
      <Card title={"Total Patients"} icon={"icon"}>
        <div className="grid grid-cols-8 gap-4 mt-4 bg-cyan-50 py-5 px-8 items-center rounded-xl">
          Detail
        </div>
      </Card>
      <Card title={"Doctors"} icon={"icon"}>
        <div className="grid grid-cols-8 gap-4 mt-4 bg-cyan-50 py-5 px-8 items-center rounded-xl">
          Detail
        </div>
      </Card>
    </div>
  );
};
export default LinkDashboardBar;
