import { TbClockRecord } from "react-icons/tb";
import Card from "../UI/Cards/Card";
import ListTreatments from "./ListTreatments";

const PatientTreatments = ({ treatment }) => {
  return (
    <Card title={"Treatments"} icon={<TbClockRecord />} color={"cyan"}>
      <ListTreatments treatment={treatment} />
    </Card>
  );
};
export default PatientTreatments;
