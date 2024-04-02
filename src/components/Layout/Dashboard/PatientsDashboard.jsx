import Card from "../../UI/Cards/Card";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { RiMedicineBottleLine } from "react-icons/ri";
import Chart from "../../Dasboards/Charts/Chart";
import TodayDay from "../../Dasboards/Services/TodayDay";
import CurrentMounth from "../../Dasboards/Services/CurrentMounth";
import CurrentYear from "../../Dasboards/Services/CurrentYear";

const LinkDashboardBar = () => {
  const cardClass =
    "bg-white flex justify-between items-center gap-4 rounded-xl border-[1px] border-opacity-5 border-slate-300 px-3";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 mb-6">
      <Card
        title="Today Patients"
        icon={<IoDocumentTextOutline />}
        color="yellow">
        <div className={cardClass}>
          <div className="w-3/4">
            <h2 className="text-xl my-6 font-medium">10</h2>
            <p className="text-xs text-slate-400 font-medium">
              Total Patients <span className="text-teal-500">10</span> today
            </p>
          </div>
          <div className="w-10 h-10 flex flex-col rounded-md text-white items-center justify-center bg-slate-500">
            <TodayDay />
          </div>
        </div>
      </Card>
      <Card
        title="Monthly Patients"
        icon={<IoDocumentTextOutline />}
        color="yellow">
        <div className={cardClass}>
          <div className="w-3/4">
            <h2 className="text-xl my-6 font-medium">10</h2>
            <p className="text-xs text-slate-400 font-medium">
              Total Patients <span className="text-teal-500">10</span> today
            </p>
          </div>
          <div className="w-10 h-10 flex flex-col rounded-md text-white items-center justify-center bg-slate-700">
            <CurrentMounth />
          </div>
        </div>
      </Card>
      <Card
        title="Yearly Patients"
        icon={<IoDocumentTextOutline />}
        color="yellow">
        <div className={cardClass}>
          <div className="w-3/4">
            <h2 className="text-xl my-6 font-medium">10</h2>
            <p className="text-xs text-slate-400 font-medium">
              Total Patients <span className="text-teal-500">10</span> today
            </p>
          </div>
          <div className="w-10 h-10 flex flex-col rounded-md text-white items-center justify-center bg-slate-900">
            <CurrentYear />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default LinkDashboardBar;
