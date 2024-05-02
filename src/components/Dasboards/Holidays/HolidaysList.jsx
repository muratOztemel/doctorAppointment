import { useState } from "react";
import {
  useGetHolidaysQuery,
  useDeleteHolidayMutation,
} from "../../../redux/features/api/apiSlice";
import TitleCard from "../../UI/Cards/TitleCard";
import Card from "../../UI/Cards/Card";
import { FaUserDoctor } from "react-icons/fa6";
import HolidayModal from "./HolidayModal";
import ConfirmModal from "./ConfirmModal";

const HolidaysList = () => {
  const { data: holidays, isLoading, isError } = useGetHolidaysQuery();
  const [deleteHoliday] = useDeleteHolidayMutation();
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState(null);

  const handleDeleteConfirm = async () => {
    if (holidayToDelete) {
      await deleteHoliday(holidayToDelete).unwrap();
      setHolidayToDelete(null); // ID'yi temizle
      setShowConfirmModal(false); // Modalı kapat
    }
  };

  const handleDelete = (id) => {
    setHolidayToDelete(id);
    setShowConfirmModal(true);
  };

  const handleEdit = (holiday) => {
    setSelectedHoliday(holiday);
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setSelectedHoliday({ name: "", id: null });
    setIsAddingNew(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading holidays.</p>;
  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"H O L I D A Y S"} />
      <Card
        title={"Holiday List"}
        icon={<FaUserDoctor />}
        color={"cyan"}
        className="mt-5">
        <div className="flex gap-4 mt-5">
          <div className="flex justify-around gap-10">
            <div>
              <button
                onClick={handleAddNew}
                className="w-40 h-20 bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-white text-lg">
                Add New Holiday
              </button>
            </div>
            <div>
              <table className="table-auto w-full">
                <thead className="bg-cyan-50 rounded-md overflow-hidden">
                  <tr>
                    <th className="cursor-pointer hover:bg-cyan-300">ID</th>
                    <th className="cursor-pointer hover:bg-cyan-300">Name</th>
                    <th className="cursor-pointer hover:bg-cyan-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {holidays?.map((holiday) => (
                    <tr
                      key={holiday.id}
                      className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {holiday.id}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                        {holiday.name}
                      </td>
                      <td className="text-start text-sm py-4 px-2 whitespace-nowrap flex justify-center items-center">
                        <button
                          onClick={() => handleEdit(holiday)}
                          className="w-28 h-9 text-white bg-amber-300 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                          <img
                            src="/images/eye.png"
                            alt="detail"
                            className="h-7 mr-2"
                          />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(holiday.id)}
                          className="w-28 h-9 text-white bg-red-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                          <img
                            src="/images/delete.png"
                            alt="detail"
                            className="h-4 mr-2"
                          />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gab-6">
              {(selectedHoliday || isAddingNew) && (
                <div>
                  <HolidayModal
                    holiday={selectedHoliday}
                    onClose={() => {
                      setSelectedHoliday(null);
                      setIsAddingNew(false);
                    }}
                    isAddingNew={isAddingNew}
                  />
                </div>
              )}

              {showConfirmModal && (
                <div>
                  <ConfirmModal
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={handleDeleteConfirm}
                    message="Are you sure you want to delete this holiday?"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HolidaysList;
