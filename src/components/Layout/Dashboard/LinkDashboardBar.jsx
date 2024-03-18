import Card from "../../UI/Cards/Card";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { RiMedicineBottleLine } from "react-icons/ri";
import Chart from "../../Dasboards/Charts/Chart";
import Chart2 from "../../Dasboards/Charts/Chart2";
import Chart3 from "../../Dasboards/Charts/Chart3";

const LinkDashboardBar = () => {
  return (
    <div className="w-full grid xl:grid-cols-4 gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      <Card
        title={"Monthly Appointments"}
        icon={<IoDocumentTextOutline />}
        color={"yellow"}>
        <div className="grid grid-cols-8 gap-4 mt-4 bg-yellow-50  items-center rounded-xl">
          <Chart
            color={"#f0ad4e"}
            days={30}
            dataName={"appointments"}
            chartType={"bar"}
          />
        </div>
      </Card>
      <Card
        title={"Total Appointments"}
        icon={<IoDocumentTextOutline />}
        color={"cyan"}>
        <div className="grid grid-cols-8 gap-4 mt-4 bg-cyan-50  items-center rounded-xl">
          <Chart color={"#06b6d4"} days={0} dataName={"appointments"} />
        </div>
      </Card>
      <Card title={"Monthly Patients"} icon={<PiUsers />} color={"cyan"}>
        <div className="grid grid-cols-8 gap-4 mt-4 bg-green-50  items-center rounded-xl">
          <div className="flex justify-start col-span-5">
            <Chart3 />
          </div>
          <div className="flex flex-col gap-4 col-span-3">
            <h4 className="text-md font-medium">825+</h4>
            <p className="text-sm flex gap-2 text-green-500">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"></path>
              </svg>
              64.13%
            </p>
          </div>
        </div>
      </Card>
      <Card
        title={"Total Patients"}
        icon={<RiMedicineBottleLine />}
        color={"red"}>
        <div className="grid grid-cols-8 gap-4 mt-4 bg-red-50  items-center rounded-xl">
          <div className="flex justify-start col-span-5">
            <Chart2 />
          </div>
          <div className="flex flex-col gap-4 col-span-3">
            <h4 className="text-md font-medium">33500+</h4>
            <p className="text-sm flex gap-2 text-red-500">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"></path>
              </svg>
              58.46%
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default LinkDashboardBar;
