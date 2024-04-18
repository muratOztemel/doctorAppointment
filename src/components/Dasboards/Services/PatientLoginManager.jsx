import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUserLogin } from "../../../redux/slices/usersSlice";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoLogOut, IoSettings } from "react-icons/io5";

const PatientLoginManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    // User token delete in localstorage
    localStorage.removeItem("token");

    // User information clear in Redux
    dispatch(
      setUserLogin({
        username: "",
        token: "",
      })
    );
    setDropdownOpen(!dropdownOpen);
    // User send to login Page
    navigate("/auth/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4">
        <img
          src="/murat.jpeg"
          alt="user"
          className="w-12 h-12 rounded-full border border-border object-cover"
        />
        <span className="mr-9">Manager</span>
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link
            to="/settings"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex justify-start items-center px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-gray-100">
            <FaUser className="ml-0.5 mr-2 text-slate-500 w-4 h-4" />
            Profile
          </Link>
          <Link
            to="/settings"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex justify-start items-center px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-gray-100">
            <IoSettings className="mr-2 text-slate-500 w-5 h-5" />
            Settings
          </Link>
          <hr className="my-1" />
          <button
            onClick={handleLogout}
            className="flex justify-start items-center w-full font-semibold text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <IoLogOut className="mr-2 text-red-500 w-6 h-6" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
export default PatientLoginManager;
