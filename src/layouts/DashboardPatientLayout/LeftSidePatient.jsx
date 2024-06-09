import { NavLink, useNavigate } from "react-router-dom";
import { IoHome, IoLogOut, IoSettingsOutline } from "react-icons/io5";
import { FaUserInjured } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { AiFillMedicineBox } from "react-icons/ai";
import { TbClockRecord } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/usersSlice";

const LeftSidePatient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const linkDizi = [
    {
      id: 1,
      name: "Dashboard",
      pageName: "DashboardHome",
      path: "/dashboard/patient",
      icon: <IoHome />,
      end: true,
    },
    {
      id: 2,
      name: "My Appointments",
      pageName: "myAppointments",
      path: "/dashboard/patient/appointments",
      icon: <TbClockRecord />,
    },
    {
      id: 3,
      name: "My Doctors",
      pageName: "DoctorsHome",
      path: "/dashboard/patient/mydoctors",
      icon: <FaUserDoctor />,
    },
    {
      id: 4,
      name: "My Medical Record",
      pageName: "MyMedicalRecord",
      path: "/dashboard/patient/medicalRecords",
      icon: <AiFillMedicineBox />,
    },
    {
      id: 5,
      name: "My Profile",
      pageName: "PatientProfile",
      path: "/dashboard/patient/profile",
      icon: <FaUserInjured />,
    },
    {
      id: 6,
      name: "My Settings",
      pageName: "SettingsHome",
      path: "/dashboard/patient/settings",
      icon: <IoSettingsOutline />,
    },
    {
      id: 7,
      name: "Logout",
      pageName: "Logout",
      path: "/auth/login",
      icon: <IoLogOut className="text-red-500 w-6 h-6" />,
      onClick: () => {
        localStorage.removeItem("token");
        dispatch(clearUser());
        navigate("/auth/login");
      },
    },
  ];

  if (linkDizi === "") {
    return (
      <div className="flex items-center justify-center place-content-center">
        <img
          className="w-20 h-20 animate-spin"
          src="/loading.png"
          alt="Loading icon"
        />
      </div>
    );
  }
  return (
    <>
      {/*       <a href="/">
        <img
          src="/logo.png"
          alt="logo"
          className="w-3/4 h-18 ml-4 object-contain"
        />
      </a> */}

      <ul className="flex flex-col py-4 space-y-1">
        <li className="px-5 hidden md:block">
          <div className="flex flex-row items-center h-8">
            <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
              Patient Dashboard
            </div>
          </div>
        </li>
        {linkDizi.map(({ id, path, icon, name, end }) => (
          <li key={id}>
            <NavLink
              to={path}
              end={end}
              className={({ isActive }) =>
                `relative flex flex-row items-center h-11 focus:outline-none dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 dark:hover:border-gray-800 pr-6 ${
                  isActive ? "bg-cyan-100 border-cyan-500" : "hover:bg-cyan-50 "
                }`
              }>
              <span className="inline-flex justify-center items-center ml-4">
                {icon}
              </span>

              <span className="ml-2 text-sm tracking-wide truncate">
                {name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};
export default LeftSidePatient;
