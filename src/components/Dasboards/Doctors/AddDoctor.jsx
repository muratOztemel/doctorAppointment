import Card from "../../../components/UI/Cards/Card.jsx";
import { FaUserDoctor } from "react-icons/fa6";
import TitleCard from "../../../components/UI/Cards/TitleCard.jsx";

import AddDoctorForm from "./AddDoctorForm.jsx";

const AddDoctor = () => {
  return (
    <>
      <div className="xl:px-8 px-2 pt-6">
        <TitleCard title={"D O C T O R S"} />
        <Card
          title={"Add Doctor"}
          icon={<FaUserDoctor />}
          color={"cyan"}
          className="mt-5">
          <div className="grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 mt-5">
            {/* <DoctorForm branches={branches} userId={userId} /> */}
            <AddDoctorForm />
          </div>
        </Card>
      </div>
    </>
  );
};
export default AddDoctor;
