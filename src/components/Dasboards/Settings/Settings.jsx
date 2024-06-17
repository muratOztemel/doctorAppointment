import TitleCard from "../../UI/Cards/TitleCard";
import Card from "../../UI/Cards/Card";
import {
  FaUserDoctor,
  FaUser,
  FaChartBar,
  FaEnvelope,
  FaBell,
  FaCodeBranch,
} from "react-icons/fa6";
import {
  FaCalendarAlt,
  FaCog,
  FaFileAlt,
  FaShieldAlt,
  FaTasks,
  FaCalendarTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Yönetim araçları listesi
const managementTools = [
  { name: "Users", icon: <FaUser />, link: "/dashboard/admin/users" },
  { name: "Roles", icon: <FaShieldAlt />, link: "/dashboard/admin/roles" },
  { name: "User Roles", icon: <FaCog />, link: "/dashboard/admin/userroles" },
  { name: "Links", icon: <FaTasks />, link: "/dashboard/admin/links" },
  {
    name: "Holidays",
    icon: <FaCalendarTimes />,
    link: "/dashboard/admin/holidays",
  },
  {
    name: "Doctor Working Days",
    icon: <FaCalendarAlt />,
    link: "/dashboard/admin/doctorWorkingDays",
  },
  {
    name: "Branches",
    icon: <FaCodeBranch />,
    link: "/dashboard/admin/branches",
  },
];

const Settings = () => {
  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"A D M I N - S E T T I N G S"} />
      <Card
        title={"Manager Settings"}
        icon={<FaUserDoctor />}
        color={"cyan"}
        className="mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {managementTools.map((tool) => (
            <Link
              to={tool.link}
              key={tool.name}
              className="flex items-center p-4 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition">
              <div className="text-3xl text-cyan-500 mr-4">{tool.icon}</div>
              <div className="text-lg font-medium">{tool.name}</div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Settings;
