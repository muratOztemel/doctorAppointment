import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeaderMainLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <header className="header bg-white relative">
        <div className="topbar bg-white border-b border-gray-200 py-4">
          <div className="container">
            <div className="row flex flex-wrap">
              <div className="lg:w-1/2 md:w-5/12 w-full">
                <ul className="top-link float-left">
                  <li className="inline-block mr-4 last:mr-0">
                    <a
                      className="text-[#2C2D3F] text-sm font-normal hover:text-[#1A76D1]"
                      href="#">
                      About
                    </a>
                  </li>
                  <li className="inline-block mr-4 last:mr-0">
                    <a
                      className="text-[#2C2D3F] text-sm font-normal hover:text-[#1A76D1]"
                      href="#">
                      Doctors
                    </a>
                  </li>
                  <li className="inline-block mr-4 last:mr-0">
                    <a
                      className="text-[#2C2D3F] text-sm font-normal hover:text-[#1A76D1]"
                      href="#">
                      Contact
                    </a>
                  </li>
                  <li className="inline-block mr-4 last:mr-0">
                    <a
                      className="text-[#2C2D3F] text-sm font-normal hover:text-[#1A76D1]"
                      href="#">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2 md:w-5/12 w-full">
                <ul className="top-contact float-right">
                  <li className="inline-block mr-6 last:mr-0 text-[#2C2D3F]">
                    <i className="fa fa-phone text-[#1A76D1] mr-2"></i>+000 1234
                    56789
                  </li>
                  <li className="inline-block mr-6 last:mr-0 text-[#2C2D3F]">
                    <i className="fa fa-envelope text-[#1A76D1] mr-2"></i>
                    <a
                      href="mailto:support@yourmail.com"
                      className="text-sm hover:text-[#1A76D1]">
                      support@yourmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="icon.png" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-500">
              Doctor
            </span>
            <span className="self-center text-2xl whitespace-nowrap">
              Appointment
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 "
                  aria-current="page">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0">
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0">
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0">
                  Contact
                </a>
              </li>
              <li>
                <Link
                  to="/auth/login"
                  className="btn bg-red-500 p-3 rounded text-white">
                  Get Appointment
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default HeaderMainLayout;
