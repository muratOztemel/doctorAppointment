import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoHome, IoLogOut, IoSettingsOutline } from "react-icons/io5";
import { FaUserInjured } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { LuCalendarSearch } from "react-icons/lu";
import { AiFillMedicineBox } from "react-icons/ai";
import { clearUser } from "../../../redux/slices/usersSlice";

const LeftSide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeLinkId, setActiveLinkId] = useState(null);

  const toggleLink = (id) => {
    if (activeLinkId === id) {
      setActiveLinkId(null); // If clicked link is already active, close it
    } else {
      setActiveLinkId(id); // Else open the new one
    }
  };

  const linkDizi = [
    {
      id: 1,
      name: "Dashboard",
      pageName: "DashboardHome",
      path: "/dashboard/admin/",
      icon: <IoHome />,
      end: true,
    },
    {
      id: 2,
      name: "Patients",
      pageName: "PatientsHome",
      path: "/dashboard/admin/patients",
      icon: <FaUserInjured />,
    },
    {
      id: 3,
      name: "Doctors",
      pageName: "DoctorsHome",
      path: "/dashboard/admin/doctors",
      icon: <FaUserDoctor />,
    },
    {
      id: 4,
      name: "Appointments",
      pageName: "AppointmentsHome",
      path: "/dashboard/admin/appointments",
      icon: <LuCalendarSearch />,
    },
    {
      id: 5,
      name: "Medicine",
      pageName: "MedicineHome",
      path: "/dashboard/admin/medicines",
      icon: <AiFillMedicineBox />,
    },
    {
      id: 6,
      name: "Settings",
      pageName: "SettingsHome",
      path: "/dashboard/admin/settings",
      icon: <IoSettingsOutline />,
      children: [
        {
          name: "Users",
          pageName: "UsersHome",
          path: "/dashboard/admin/users",
          icon: <IoSettingsOutline />,
        },
        {
          name: "Roles",
          pageName: "RolesHome",
          path: "/dashboard/admin/roles",
          icon: <IoSettingsOutline />,
        },
        {
          name: "User Roles",
          pageName: "UserRolesHome",
          path: "/dashboard/admin/userroles",
          icon: <IoSettingsOutline />,
        },
        {
          name: "Links",
          pageName: "LinksHome",
          path: "/dashboard/admin/links",
          icon: <IoSettingsOutline />,
        },
        {
          name: "Holidays",
          pageName: "HolidaysHome",
          path: "/dashboard/admin/holidays",
          icon: <IoSettingsOutline />,
        },
        {
          name: "doctorWorkingDays",
          pageName: "doctorWorkingDaysHome",
          path: "/dashboard/admin/doctorWorkingDays",
          icon: <IoSettingsOutline />,
        },
        {
          name: "Branches",
          pageName: "branchesHome",
          path: "/dashboard/admin/branches",
          icon: <IoSettingsOutline />,
        },
      ],
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
              Admin Dashboard
            </div>
          </div>
        </li>
        {linkDizi.map((link) => (
          <li key={link.id}>
            <NavLink
              to={link.path}
              end={link.end}
              onClick={() => toggleLink(link.id)}
              className={({ isActive }) =>
                `relative flex flex-row items-center h-11 focus:outline-none text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 pr-6 ${
                  isActive ? "bg-cyan-100 border-cyan-500" : "hover:bg-cyan-50 "
                }`
              }>
              <span className="inline-flex justify-center items-center ml-4">
                {link.icon}
              </span>

              <span className="ml-2 text-sm tracking-wide truncate">
                {link.name}
              </span>
            </NavLink>
            {link.children && activeLinkId === link.id && (
              <ul className="pl-4">
                {link.children.map((subLink, index) => (
                  <li key={index}>
                    <NavLink
                      to={subLink.path}
                      className={({ isActive }) =>
                        `relative flex flex-row items-center text-sm h-8 focus:outline-none text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 ${
                          isActive
                            ? "bg-cyan-100 border-cyan-500"
                            : "hover:bg-cyan-50 "
                        }`
                      }>
                      {subLink.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
export default LeftSide;
