import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUsersLogin } from "../../../redux/slices/usersSlice";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const MainHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Kullanıcının token'ını localStorage'dan sil
    localStorage.removeItem("token");

    // Kullanıcı durumunu global state'den de temizle (Redux kullanıyorsanız)
    dispatch(
      setUsersLogin({
        username: "",
        token: "",
      })
    );
    setDropdownOpen(!dropdownOpen);
    // Kullanıcıyı giriş sayfasına yönlendir
    navigate("/login");
  };
  return (
    <header className="mt-5 xl:w-5/6 w-full 2xl:max-w-[1640px] bg-slate-50 grid md:grid-cols-2 grid-cols-12 items-center bg-opacity-95 fixed top-0 z-40 xl:px-8 px-2">
      <div className="md:col-span-1 sm:col-span-11 col-span-10 flex gap-4 items-center md:py-0 py-4">
        <button className="block xl:hidden border text-2xl bg-gray-50 w-16 md:w-12 h-12 rounded-md flex-col text-gray-500 transitions hover:bg-gray-50"></button>
        <input
          type="text"
          placeholder='Search "Patients"'
          className="md:w-96 w-full h-12 text-sm text-main rounded-md bg-slate-50 border border-border px-4"
        />
      </div>
      <div className="md:col-span-1 sm:col-span-1 col-span-2 items-center justify-end pr-4 md:pr-0">
        <div className="float-right flex gap-4 items-center justify-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            <div className="relative">
              <MdOutlineNotificationsNone className="text-2xl hover:text-red-500" />
              <span className="absolute -top-2.5 -right-2.5 font-semibold bg-red-500 rounded-full px-1.5 py-0.5 text-xs text-white text-center">
                5
              </span>
            </div>
          </button>
          {/* Kullanıcı avatarı ve açılır menü */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-4">
              <img
                src="/murat.jpeg"
                alt="user"
                className="w-12 h-12 rounded-full border border-border object-cover"
              />
              <span>Manager</span>
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
          {/* notification start */}
          <div className="flex absolute">
            <div className="relative mr-40">
              {isOpen && (
                <>
                  <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 h-full w-full z-10"></div>

                  <div
                    className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
                    style={{ width: "20rem" }}>
                    <div className="py-2">
                      {/* Örnek menü öğeleri burada yer alacak */}
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                        <img
                          className="h-8 w-8 rounded-full object-cover mx-1"
                          src="https://example.com/avatar1.jpg"
                          alt="avatar"
                        />
                        <p className="text-gray-600 text-sm mx-2">
                          <span className="font-bold">John Doe</span> replied on
                          the{" "}
                          <span className="font-bold text-blue-500">
                            Upload Image
                          </span>{" "}
                          article. 2m
                        </p>
                      </a>
                      {/* Diğer öğeler */}
                    </div>
                    <a
                      href="#"
                      className="block bg-red-500 text-white text-center font-bold py-2">
                      See all notifications
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* notification finish */}
        </div>
      </div>
    </header>
  );
};
export default MainHeader;
