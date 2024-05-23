import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { setUserLogin } from "../../redux/slices/usersSlice";
import { useGetDoctorByIdQuery } from "../../redux/features/api/apiSlice";
import DefaultImage from "../hooks/DefaultImage";
import { FaUser } from "react-icons/fa";
import { IoLogOut, IoSettings } from "react-icons/io5";

const DoctorLoginManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { doctorId } = useSelector((state) => state.doctors);
  const { data: doctor, isError, isLoading } = useGetDoctorByIdQuery(doctorId);
  const defaultImage = DefaultImage(doctor?.doctorInfo);
  const ref = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUserLogin({ userId: null, username: null, token: null }));
    setDropdownOpen(false);
    navigate("/auth/login");
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (dropdownOpen && ref.current && !ref.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdownOpen]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Doctor detayları yüklenirken hata oluştu</div>;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-4"
        aria-expanded={dropdownOpen}>
        <img
          src={defaultImage}
          alt="user"
          className="w-12 h-12 rounded-full border border-border object-cover"
        />
        <span className="mr-9">
          {doctor?.title} {doctor?.name} {doctor?.surname}
        </span>
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link
            to="/dashboard/patient/profile"
            onClick={toggleDropdown}
            className="flex justify-start items-center px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-gray-100">
            <FaUser className="ml-0.5 mr-2 text-slate-500 w-4 h-4" />
            Profile
          </Link>
          <Link
            to="settings"
            onClick={toggleDropdown}
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

export default DoctorLoginManager;
