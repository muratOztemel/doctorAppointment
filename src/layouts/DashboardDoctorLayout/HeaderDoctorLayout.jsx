import { CiSearch } from "react-icons/ci";
import DoctorNotification from "../../components/DoctorDashboard/DoctorNotification";
import DoctorLoginManager from "../../components/DoctorDashboard/DoctorLoginManager";

const HeaderDoctorLayout = () => {
  return (
    <div className="fixed w-full flex items-center justify-between h-14 bg-white text-black z-10">
      <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14">
        <img
          className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
          src="/icon.png"
        />
        <div className="gap-2 flex-col justify-center items-center text-center hidden md:block">
          <h2 className="text-sm font-semibold">DOCTOR</h2>
          <p className="text-xs text-gray-500">APPOINTMENT</p>
        </div>
      </div>
      <div className="flex justify-between items-center w-full h-14 ml-2">
        <div className="bg-white rounded flex items-center w-full max-w-xl mr-4 p-2 md:ml-8">
          {/* <button className="outline-none focus:outline-none">
            <CiSearch />
          </button>
          <input
            type="search"
            name=""
            id=""
            placeholder="Search"
            className="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent"
          /> */}
        </div>
        <ul className="flex items-center">
          <li>
            <DoctorNotification />
          </li>
          <li>
            <div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
          </li>
          <li>
            <DoctorLoginManager />
          </li>
        </ul>
      </div>
    </div>
  );
};
export default HeaderDoctorLayout;
