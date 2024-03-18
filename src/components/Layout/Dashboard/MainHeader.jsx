import { MdOutlineNotificationsNone } from "react-icons/md";

const MainHeader = () => {
  return (
    <div className="xl:w-5/6 w-full 2xl:max-w-[1640px] bg-slate-50 grid md:grid-cols-2 grid-cols-12 items-center bg-opacity-95 fixed top-0 z-40 xl:px-8 px-2">
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
          <button>
            <div className="relative">
              <MdOutlineNotificationsNone className="text-2xl hover:text-red-500" />
              <span className="absolute -top-2.5 -right-2.5 font-semibold bg-red-500 rounded-full px-1.5 py-0.5 text-xs text-white text-center">
                5
              </span>
            </div>
          </button>
          <div className=" items-center md:flex hidden">
            <div className="text-sm w-full relative">
              <button
                id="headlessui-menu-button-:r2:"
                type="button"
                aria-haspopup="menu"
                aria-expanded="false"
                data-headlessui-state>
                <div className="flex gap-4 items-center p-4 rounded-lg">
                  <img
                    src="/murat.jpeg"
                    alt="user"
                    className="w-12 border border-border object-cover h-12 rounded-full"
                  />
                  <p className="text-sm text-textGray font-medium">Manager</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainHeader;
