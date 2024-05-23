import { FaUserInjured } from "react-icons/fa6";
import Card from "../UI/Cards/Card";
import DoctorCalendar from "./DoctorCalendar";

const DoctorScheduler = () => {
  return (
    <Card
      title={"My Calendar"}
      icon={<FaUserInjured />}
      color={"cyan"}
      className={"mb-6"}>
      <div className="w-full">
        <DoctorCalendar />
      </div>
    </Card>
  );
};
export default DoctorScheduler;
