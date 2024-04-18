import { useState } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";

const UserNotification = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="mr-4 mt-3">
        <div className="relative inline-flex items-center">
          {" "}
          {/* Notification badge */}
          <MdOutlineNotificationsNone className="text-2xl hover:text-red-500" />
          <div
            className="absolute top-0 right-0 flex justify-center items-center"
            style={{
              width: "24px",
              height: "24px",
              transform: "translate(50%, -50%)",
            }}>
            {" "}
            {/* Heart and Count */}
            <svg
              className="w-6 h-6 fill-current text-red-500" // Heart size
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
            </svg>
            <span className="absolute text-white text-xs font-semibold">5</span>
          </div>
        </div>
      </button>
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
                      <span className="font-bold">John Doe</span> replied on the{" "}
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
    </>
  );
};
export default UserNotification;
