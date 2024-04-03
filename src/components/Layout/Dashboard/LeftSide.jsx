import { Link } from "react-router-dom";

const LeftSide = () => {
  const linkDizi = [
    {
      id: 1,
      name: "Dashboard",
      pageName: "DashboardHome",
      link: "/",
      icon: "/images/icons/home.png",
    },
    {
      id: 2,
      name: "Patients",
      pageName: "PatientsHome",
      link: "/patients",
      icon: "/images/icons/home.png",
    },
    {
      id: 3,
      name: "Doctors",
      pageName: "DoctorsHome",
      link: "/doctors",
      icon: "/images/icons/home.png",
    },
    {
      id: 4,
      name: "Appointments",
      pageName: "AppointmentsHome",
      link: "/appointments",
      icon: "/images/icons/home.png",
    },
    {
      id: 5,
      name: "Medicine",
      pageName: "MedicineHome",
      link: "/medicine",
      icon: "/images/icons/home.png",
    },
    {
      id: 6,
      name: "Settings",
      pageName: "SettingsHome",
      link: "/settings",
      icon: "/images/icons/home.png",
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
    <aside className="col-span-2 xl:block hidden">
      <div className="bg-white xl:shadow-lg py-6 px-4 xl:h-screen w-full border-r border-border">
        <a href="/">
          <img
            src="/logo.png"
            alt="logo"
            className="w-3/4 h-18 ml-4 object-contain"
          />
        </a>
        <div className="flex-col gap-2 mt-12">
          <ul>
            {linkDizi.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.link}
                  className="flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-cyan-50">
                  <img src={link.icon} alt={link.name} />
                  <p className="text-sm font-medium  text-cyan-500 group-hover:text-text-teal-100">
                    {link.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
export default LeftSide;
