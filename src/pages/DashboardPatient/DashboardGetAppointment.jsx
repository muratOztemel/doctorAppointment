import { TbClockRecord } from "react-icons/tb";
import PatientGetAppointment from "../../components/PatientDashboards/PatientGetAppointment";
import Card from "../../components/UI/Cards/Card";
import TitleCard from "../../components/UI/Cards/TitleCard";

const DashboardGetAppointment = () => {
  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"M Y - D O C T O R - A P P O I N T M E N T"} />
        <Card title={"My Appointments"} icon={<TbClockRecord />} color={"cyan"}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-10 gap-4 border-b border-dashed border-gray-200">
              <PatientGetAppointment />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
export default DashboardGetAppointment;
