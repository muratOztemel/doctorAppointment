import { useState, useEffect } from "react";
import AppointmentSlider from "./AppointmentSlider";
import DefaultImage from "../hooks/DefaultImage";
import {
  useGetDoctorWorkingDayByDoctorIdQuery,
  useGetFavoritesQuery,
  useUpdateFavoriteMutation,
  useAddNewFavoriteMutation,
} from "../../redux/features/api/apiSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DoctorList = ({ doctor, branchName, setDay, day }) => {
  const { userId } = useSelector((state) => state.users.userLogin);
  const { data: doctorData, isLoading: isLoadingDoctorData } =
    useGetDoctorWorkingDayByDoctorIdQuery(doctor.id);
  const { data: favoritesData, isLoading: isLoadingFavorites } =
    useGetFavoritesQuery(userId);
  const [favorites, setFavorites] = useState([]);
  const [updateFavorite, { isLoading: isUpdatingFavorite }] =
    useUpdateFavoriteMutation();
  const [addNewFavorite, { isLoading: isAdding }] = useAddNewFavoriteMutation();

  useEffect(() => {
    if (favoritesData) {
      setFavorites(favoritesData);
    }
  }, [favoritesData]);

  const isFavorited = favorites.some(
    (fav) => fav.doctorId === doctor.id && fav.status
  );

  const toggleFavorite = async () => {
    try {
      const currentFavorite = favorites.find(
        (fav) => fav.doctorId === doctor.id
      );
      const newStatus = !isFavorited;

      const updatedFavorites = favorites.map((fav) =>
        fav.doctorId === doctor.id ? { ...fav, status: newStatus } : fav
      );
      setFavorites(updatedFavorites);

      if (currentFavorite) {
        const result = await updateFavorite({
          id: currentFavorite.id,
          updatedFavorite: {
            id: currentFavorite.id,
            doctorId: doctor.id,
            userId,
            status: newStatus,
          },
        });

        if (result.error?.data?.status === 400) {
          await addNewFavorite({ doctorId: doctor.id });
        }
        if (newStatus) {
          toast.success(`Doctor added to favorites.`);
        } else {
          toast.error("Doctor removed from favorites.");
        }
      } else {
        await addNewFavorite({ doctorId: doctor.id });
        toast.success(`Doctor added to favorites.`);
      }
    } catch (error) {
      setFavorites(favorites);
      toast.error("Failed to update favorites.");
    }
  };

  if (isLoadingDoctorData || isLoadingFavorites) {
    return <div>Loading...</div>;
  }

  const workingDays = doctorData?.days
    ?.split(",")
    .map((day) => parseInt(day.trim()))
    .filter((day) => day >= 0 && day <= 6);

  const workingDayElements =
    workingDays?.length > 0 ? (
      workingDays.map((day) => (
        <div
          key={day}
          className="w-9 h-9 bg-amber-500 text-white rounded-full flex items-center justify-center m-1">
          {dayNames[day]}
        </div>
      ))
    ) : (
      <div>No working days set</div>
    );

  return (
    <>
      <div className="col-span-2 p-4">
        <div className="flex justify-center items-center">
          <img
            src={DefaultImage(doctor.doctorInfo)}
            alt={`${doctor.name} ${doctor.surname}`}
            className="w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
          />
        </div>
        <div className="flex justify-center items-center">
          {doctor.title} {doctor.name} {doctor.surname}
        </div>
        <div className="flex justify-center items-center text-gray-500">
          {branchName}
        </div>
        <div className="text-center text-gray-300">Doctor Work Days</div>
        <div className="flex justify-center items-center">
          {workingDayElements}
        </div>
        <div className="text-sm flex flex-col justify-center items-center">
          <div className="mr-2 text-gray-300">Add to Favorites</div>
          <div>
            {isFavorited ? (
              <FaHeart
                className="text-red-500 text-3xl"
                onClick={toggleFavorite}
              />
            ) : (
              <FaRegHeart className="text-3xl" onClick={toggleFavorite} />
            )}
          </div>
        </div>
      </div>
      <AppointmentSlider
        doctor={doctor}
        branchName={branchName}
        setDay={setDay}
        day={day}
      />
    </>
  );
};
export default DoctorList;
