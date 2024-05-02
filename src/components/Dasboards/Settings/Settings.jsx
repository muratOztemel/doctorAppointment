import TitleCard from "../../UI/Cards/TitleCard";
import Card from "../../UI/Cards/Card";
import { FaUserDoctor } from "react-icons/fa6";

const Settings = () => {
  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"S E T T I N G S"} />
      <Card
        title={"Role List"}
        icon={<FaUserDoctor />}
        color={"cyan"}
        className="mt-5">
        <div className="flex gap-4 mt-5">Settings Page</div>
      </Card>
    </div>
  );
};

export default Settings;
