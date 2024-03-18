import { createElement } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiMedicineBottleLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

const LeftSide = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3004/links")
      .then((resLink) => setLinks(resLink.data))
      .catch((err) => console.log("Link data connection is mistake!", err));
  }, []);

  if (links === "") {
    return (
      <div className="flex items-center justify-center place-content-center">
        <img
          className="w-20 h-20 animate-spin"
          src="/loading.png"
          alt="Loading icon"
        />
      </div>
    );
  }
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
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <Link
                to={link.link}
                className="flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-cyan-50">
                {createElement(eval(link.iconName), {
                  className: "text-xl text-cyan-500",
                })}
                <p className="text-sm font-medium  text-cyan-500 group-hover:text-text-teal-100">
                  {link.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default LeftSide;
