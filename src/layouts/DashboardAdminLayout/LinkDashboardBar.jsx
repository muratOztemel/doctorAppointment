import Card from "../../components/UI/Cards/Card";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { RiMedicineBottleLine } from "react-icons/ri";
import ChartPatients from "../../components/Dasboards/Charts/ChartPatients";
import ChartPieAppointments from "../../components/Dasboards/Charts/ChartPieAppointments";
import ChartPiePatients from "../../components/Dasboards/Charts/ChartPiePatients";
import ChartAppointment from "../../components/Dasboards/Charts/ChartAppointment";

const LinkDashboardBar = () => {
  const cardClass = "grid grid-cols-8 gap-4 mt-4 items-center rounded-xl";
  return (
    <div className="w-full grid xl:grid-cols-4 gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      <Card
        title={"Monthly Appointments"}
        icon={<IoDocumentTextOutline />}
        color={"amber"}>
        <div className={`bg-yellow-50 ${cardClass}`}>
          <ChartAppointment />
        </div>
      </Card>
      <Card
        title={"Appointments 3 Months"}
        icon={<IoDocumentTextOutline />}
        color={"green"}>
        <div className={`bg-green-50 ${cardClass}`}>
          <ChartPieAppointments />
        </div>
      </Card>
      <Card title={"Total Patients"} icon={<PiUsers />} color={"cyan"}>
        <div className="grid grid-cols-8 gap-4 mt-4 bg-cyan-50  items-center rounded-xl">
          <ChartPatients />
        </div>
      </Card>
      <Card
        title={"Patients Last 3 Months "}
        icon={<RiMedicineBottleLine />}
        color={"red"}>
        <div className={`bg-red-50 ${cardClass}`}>
          <ChartPiePatients />
        </div>
      </Card>
    </div>
  );
};
export default LinkDashboardBar;
