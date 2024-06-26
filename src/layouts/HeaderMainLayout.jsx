import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeaderMainLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex justify-center bg-white">
      <div className="w-full max-w-screen-xl">
        <div className={`header ${isScrolled ? "shadow-md" : ""}`}>
          <div className="topbar border-b border-gray-200 py-4">
            <div className="container mx-auto px-4">
              <div className="flex justify-between">
                <ul className="flex">
                  <li className="mr-4">
                    <Link
                      to="/about"
                      className="text-gray-700 hover:text-red-600">
                      About
                    </Link>
                  </li>
                  <li className="mr-4">
                    <Link
                      className="text-gray-700 hover:text-red-600"
                      to={"/doctors"}>
                      Doctors
                    </Link>
                  </li>
                  <li className="mr-4">
                    <Link
                      to="/contact"
                      className="text-gray-700 hover:text-red-600">
                      Contact
                    </Link>
                  </li>
                  <li className="mr-4">
                    <Link
                      to="/faq"
                      className="text-gray-700 hover:text-red-600">
                      FAQ
                    </Link>
                  </li>
                </ul>
                <ul className="flex">
                  <li className="mr-6">
                    <i className="fa fa-phone text-red-600 mr-2"></i>+000 1234
                    56789
                  </li>
                  <li>
                    <i className="fa fa-envelope text-red-600 mr-2"></i>
                    <a
                      href="mailto:support@yourmail.com"
                      className="hover:text-red-600">
                      support@yourmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <nav className="bg-white py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <Link to={"/"} className="flex items-center">
                <img
                  src="icon.png"
                  className="h-8 mr-2"
                  alt="Doctor Appointment"
                />
                <span className="text-xl font-bold text-red-500">Doctor</span>
                <span className="text-xl text-gray-700">Appointment</span>
              </Link>
              <ul className="flex items-center space-x-4">
                <li>
                  <Link to={"/"} className="text-gray-700 hover:text-red-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/about"}
                    className="text-gray-700 hover:text-red-500">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/services"}
                    className="text-gray-700 hover:text-red-500">
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/contact"}
                    className="text-gray-700 hover:text-red-500">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/login"
                    className="bg-red-500 text-white px-3 py-2 rounded">
                    Get Appointment
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeaderMainLayout;
