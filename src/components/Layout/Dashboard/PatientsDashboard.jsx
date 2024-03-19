import Card from "../../UI/Cards/Card";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { RiMedicineBottleLine } from "react-icons/ri";
import Chart from "../../Dasboards/Charts/Chart";

const LinkDashboardBar = () => {
  const cardClass = "grid grid-cols-8 gap-4 mt-4 items-center rounded-xl";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 mb-6">
      <Card
        title="Today Patients"
        icon={<IoDocumentTextOutline />}
        color="yellow">
        <div className={`bg-yellow-50 ${cardClass}`}></div>
      </Card>
      <div className="bg-white flex justify-between items-center gap-4 rounded-xl border-[1px] border-opacity-5 border-slate-300 p-5">
        <div className="w-3/4">
          <h2 className="text-sm font-medium">Today Patients</h2>
          <h2 className="text-xl my-6 font-medium">10</h2>
          <p className="text-xs text-slate-400 font-medium">
            Total Patients <span className="text-teal-500">10</span> today
          </p>
        </div>
        <div className="w-10 h-10 flex flex-col rounded-md text-white items-center justify-center bg-teal-500">
          +
        </div>
      </div>
      <div className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5">
        <div className="w-3/4">
          <h2 className="text-sm font-medium">Monthly Patients</h2>
          <h2 className="text-xl my-6 font-medium">230</h2>
          <p className="text-xs text-textGray">
            Total Patients <span className="text-orange-500">230</span> this
            month
          </p>
        </div>
        <div className="w-10 h-10 flex-colo rounded-md text-white text-md bg-orange-500">
          svg
        </div>
      </div>
    </div>
  );
};
export default LinkDashboardBar;
