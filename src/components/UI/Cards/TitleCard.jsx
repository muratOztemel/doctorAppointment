const TitleCard = ({ title }) => {
  return (
    <div className="flex items-center text-center mb-6">
      <div className=" flex bg-white border border-cyan-500 border-dashed rounded-lg text-md w-full">
        <div className="p-2">
          <p className="flex justify-center items-center bg-white border border-cyan-500 border-dashed rounded-lg p-2 w-[30px] h-[30px]">
            <img src="/images/icons/fast-forward.png" alt="Dashboard" />
          </p>
        </div>
        <div className="p-2">
          <h1 className="text-xl font-semibold text-slate-500">{title}</h1>
        </div>
      </div>
    </div>
  );
};
export default TitleCard;
