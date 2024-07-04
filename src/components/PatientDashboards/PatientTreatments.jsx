import { TbClockRecord } from "react-icons/tb";
import Card from "../UI/Cards/Card";
import ListTreatments from "./ListTreatments";

const PatientTreatments = ({ treatment }) => {
  return (
    <Card title={"Treatments"} icon={<TbClockRecord />} color={"cyan"}>
      <div className="grid grid-cols-8 gap-4 mt-4 bg-cyan-50  items-center rounded-xl">
        <ListTreatments treatment={treatment} />
      </div>
    </Card>
  );
};
export default PatientTreatments;
