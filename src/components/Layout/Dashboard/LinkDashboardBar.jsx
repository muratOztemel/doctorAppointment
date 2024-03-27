import Card from "../../UI/Cards/Card";
import { array } from "prop-types";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { RiMedicineBottleLine } from "react-icons/ri";
import Chart from "../../Dasboards/Charts/Chart";
import ChartPatients from "../../Dasboards/Charts/ChartPatients";
import ChartPieAppointments from "../../Dasboards/Charts/ChartPieAppointments";
import ChartPiePatients from "../../Dasboards/Charts/ChartPiePatients";

const LinkDashboardBar = () => {
  const cardClass = "grid grid-cols-8 gap-4 mt-4 items-center rounded-xl";
  return (
    <div className="w-full grid xl:grid-cols-4 gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      <Card
        title={"Monthly Appointments"}
        icon={<IoDocumentTextOutline />}
        color={"yellow"}>
        <div className={`bg-yellow-50 ${cardClass}`}>
          <Chart
            color="#f0ad4e"
            days={30}
            dataName="appointments"
            chartType="bar"
          />
        </div>
      </Card>
      <Card
        title={"Appointments 3 Months"}
        icon={<IoDocumentTextOutline />}
        color={"cyan"}>
        <div className={`bg-green-50 ${cardClass}`}>
          {/* <Chart color={"#06b6d4"} days={0} dataName={"appointments"} /> */}
          <ChartPieAppointments
            dataName="appointments"
            color={["#32b8d5", "#00E396"]}
            widthChart={250}
          />
        </div>
      </Card>
      <Card title={"Total Patients"} icon={<PiUsers />} color={"cyan"}>
        <div className="grid grid-cols-8 gap-4 mt-4 bg-cyan-50  items-center rounded-xl">
          <ChartPatients
            color="#32b8d5"
            days={30}
            dataName="patients"
            chartType="bar"
          />
        </div>
      </Card>
      <Card
        title={"Patients Last 3 Months "}
        icon={<RiMedicineBottleLine />}
        color={"red"}>
        <div className={`bg-red-50 ${cardClass}`}>
          <ChartPiePatients
            dataName="patients"
            color={["#fbbf24", "#ef4444"]}
            widthChart={250}
          />
        </div>
      </Card>
    </div>
  );
};
export default LinkDashboardBar;

LinkDashboardBar.propTypes = {
  /*   patients: array,
  appointments: array, */
};
