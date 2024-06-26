import { useState } from "react";
import {
  useGetDoctorsQuery,
  useGetDoctorWorkingDaysQuery,
} from "../../../redux/features/api/apiSlice";
import DoctorWorkingDaysModal from "./DoctorWorkingDaysModal";
import TitleCard from "../../UI/Cards/TitleCard";
import Card from "../../UI/Cards/Card";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";

const DoctorWorkingDaysList = () => {
  const [selectedWorkingDay, setSelectedWorkingDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const { data: doctors, isLoading: isLoadingDoctors } = useGetDoctorsQuery();
  const { data: workingDays, isLoading: isLoadingWorkingDays } =
    useGetDoctorWorkingDaysQuery();

  if (isLoadingDoctors || isLoadingWorkingDays) {
    return <p>Loading...</p>;
  }

  const handleRowClick = (workingDay) => {
    setSelectedWorkingDay(workingDay);
    setIsAddingNew(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorkingDay(null);
    setIsAddingNew(false);
  };

  const openNewWorkingDayModal = () => {
    setIsAddingNew(true);
    setSelectedWorkingDay(null); // Ensure we are creating a new working day
    setIsModalOpen(true);
  };

  return (
    <div className="xl:px-8 px-2 pt-6">
      <TitleCard title={"U S E R S"} />
      <Card
        title={"User List"}
        icon={<FaUserDoctor />}
        color={"cyan"}
        className="mt-5 p-2">
        <div className="container gap-4 mt-5">
          <div className="flex flex-col justify-around gap-10">
            <div>
              <button
                onClick={openNewWorkingDayModal}
                className="w-60 h-9 bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-white text-lg flex justify-center items-center">
                <IoMdAddCircle className="mr-2" />
                Add New Working Day
              </button>
            </div>
            <div>
              <table className="table-auto w-full">
                <thead className="bg-cyan-50 rounded-md overflow-hidden">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Working Hours
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workingDays?.map((day) => {
                    const doctor = doctors?.find(
                      (doc) => doc.id === day.doctorId
                    );
                    return (
                      <tr
                        key={day.id}
                        onClick={() => handleRowClick(day)}
                        className="border-b border-cyan-100 hover:bg-cyan-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {doctor
                            ? `${doctor.name} ${doctor.surname}`
                            : "Unknown"}
                        </td>
                        <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                          {day.days
                            .split(",")
                            .map(
                              (dayNumber) =>
                                [
                                  "Monday",
                                  "Tuesday",
                                  "Wednesday",
                                  "Thursday",
                                  "Friday",
                                  "Saturday",
                                  "Sunday",
                                ][parseInt(dayNumber) - 1]
                            )
                            .join(", ")}
                        </td>
                        <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                          {day.startTime} - {day.endTime}
                        </td>
                        <td className="text-start text-sm py-4 px-2 whitespace-nowrap">
                          <a
                            href="#"
                            className="text-cyan-600 hover:text-cyan-900">
                            Edit
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {isModalOpen && (
                <DoctorWorkingDaysModal
                  workingDay={selectedWorkingDay}
                  onClose={closeModal}
                  isAddingNew={isAddingNew}
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DoctorWorkingDaysList;
