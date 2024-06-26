import LeftSide from "../../components/Layout/Dashboard/LeftSide";

const LeftSidebarAdminLayout = () => {
  return (
    <aside className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-white h-full text-cyan-500 transition-all duration-300 z-10 sidebar ">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <LeftSide />
        <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
          Copyright @2024
        </p>
      </div>
    </aside>
  );
};
export default LeftSidebarAdminLayout;
