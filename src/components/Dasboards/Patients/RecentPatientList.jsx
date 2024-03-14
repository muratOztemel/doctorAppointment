const RecentPatientList = () => {
  return (
    <div className="mt-2">
      <a
        className="flex gap-4 mt-6 border-b pb-4 border-border"
        href="/patients/preview/4">
        <div className="flex gap-4 items-center">
          <img
            src="/murat.jpeg"
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="flex flex-col gap-1">
            <h3 className="text-xs font-medium">Murat Öztemel</h3>
            <p className="text-xs text-gray-400">+90 532 711 87 92</p>
          </div>
        </div>
        <p className="text-xs text-gray-400">14:00</p>
      </a>
    </div>
  );
};
export default RecentPatientList;
