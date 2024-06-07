import { FaHeartPulse } from "react-icons/fa6";

const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col justify-start">
        <div className="modal-container">
          <FaHeartPulse className="mr-2 w-16 h-16 text-red-200 animate-ping dark:text-red-600 fill-red-500" />
        </div>
      </div>
    </div>
  );
};
export default Spinner;
