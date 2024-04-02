import { FaHeartPulse } from "react-icons/fa6";

const Spinner = () => {
  return (
    <div
      role="status"
      className="flex justify-center items-center min-h-screen">
      <FaHeartPulse className="mr-2 w-16 h-16 text-red-200 animate-ping dark:text-red-600 fill-red-500" />
    </div>
  );
};
export default Spinner;
