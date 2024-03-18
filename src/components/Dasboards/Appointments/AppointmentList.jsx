import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoTime } from "react-icons/io5";

const AppointmentList = ({ props, name, surname }) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <p className="text-gray-500 text-[12px] col-span-3 font-light">
        2 hrs later
      </p>
      <div className="flex-col relative col-span-2">
        <hr className="w-[2px] h-20 bg-gray-50 ml-4" />
        <div className="w-7 h-7 flex-col text-sm bg-opacity-10 bg-green-500 text-green-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <FaCheckCircle className="text-green-500 ml-2 mt-2" />
        </div>
      </div>
      <a className="flex flex-col gap-1 col-span-6" href="/appointments">
        <h2 className="text-xs font-medium">
          {name} {surname}
        </h2>
        <p className="text-[12px] font-light text-gray-500">10:00 - 12:00</p>
      </a>
    </div>
  );
};
export default AppointmentList;
