import { IoHomeOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiMedicineBottleLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

const LeftSide = () => {
  return (
    <div className="bg-white xl:shadow-lg py-6 px-4 xl:h-screen w-full border-r border-border">
      <a href="/">
        <img
          src="/logo.png"
          alt="logo"
          className="w-3/4 h-18 ml-4 object-contain"
        />
      </a>
      <div className="flex-col gap-2 mt-12">
        <a
          className="bg-teal-50-green-500 flex gap-4 transitions group items-center w-full p-4 rounded-lg bg-cyan-50"
          href="/">
          <IoHomeOutline className="text-xl text-cyan-500" />
          <p className="text-sm font-medium  text-cyan-500 group-hover:text-text-teal-100">
            Dashboard
          </p>
        </a>
        <a
          className="flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-cyan-50"
          href="/patients">
          <PiUsers className="text-xl text-cyan-500" />
          <p className="text-sm font-medium group-hover:text-cyan-500 text-gray-500">
            Patients
          </p>
        </a>
        <a
          className="flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-cyan-50"
          href="/receptions">
          <RiCustomerService2Fill className="text-xl text-cyan-500" />

          <p className="text-sm font-medium group-hover:text-cyan-500 text-gray-500">
            Receptions
          </p>
        </a>
        <a
          className="flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-cyan-50"
          href="/doctors">
          <FaUserDoctor className="text-xl text-cyan-500" />
          <p className="text-sm font-medium group-hover:text-cyan-500 text-gray-500">
            Doctors
          </p>
        </a>
        <a
          className="flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-cyan-50"
          href="/appointments">
          <IoDocumentTextOutline className="text-xl text-cyan-500" />
          <p className="text-sm font-medium group-hover:text-cyan-500 text-gray-500">
            Appointments
          </p>
        </a>
        <a
          className="flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-cyan-50"
          href="/medicine">
          <RiMedicineBottleLine className="text-xl text-cyan-500" />

          <p className="text-sm font-medium group-hover:text-cyan-500 text-gray-500">
            Medicine
          </p>
        </a>
        <a
          className="flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-cyan-50"
          href="/settings">
          <IoSettingsOutline className="text-xl text-cyan-500" />
          <p className="text-sm font-medium group-hover:text-cyan-500 text-gray-500">
            Settings
          </p>
        </a>
      </div>
    </div>
  );
};
export default LeftSide;
