import { NavLink } from "react-router-dom";
import {
  FaRegCalendarDays,
  FaUserInjured,
  FaBriefcaseMedical,
} from "react-icons/fa6";

const PatientStickyLink = () => {
  const linkDizi = [
    {
      id: 1,
      name: "Patient Information",
      path: `/dashboard/patient/profile`,
      icon: <FaUserInjured />,
      end: true,
    },
    {
      id: 2,
      name: "Medical Records",
      path: `/dashboard/patient/medicalRecords`,
      icon: <FaBriefcaseMedical />,
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
      <ul className="flex flex-col py-4 space-y-1 gap-2">
        {linkDizi.map(({ id, path, icon, name, end }) => (
          <li key={id}>
            <NavLink
              to={path}
              end={end}
              className={({ isActive }) =>
                `relative flex flex-row items-center h-11 focus:outline-none bg-cyan-50 text-white-600 hover:text-white-800 border-l-4 border-transparent pr-6 ${
                  isActive
                    ? "bg-green-100 border-green-500 hover:border-green-500"
                    : "hover:bg-cyan-100 hover:border-cyan-500"
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
export default PatientStickyLink;
