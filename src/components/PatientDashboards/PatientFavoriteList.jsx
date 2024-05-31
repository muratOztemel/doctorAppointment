import React, { useState } from "react";
import DefaultImage from "../hooks/DefaultImage";
import {
  useGetDoctorByIdQuery,
  useGetBranchByIdQuery,
  useUpdateFavoriteMutation,
} from "../../redux/features/api/apiSlice";
import { FaHeart } from "react-icons/fa6";
import { toast } from "react-toastify";

const PatientFavoriteList = ({ favorite }) => {
  const {
    data: doctorData,
    isLoading: isLoadingDoctorData,
    isError: isErrorDoctorData,
  } = useGetDoctorByIdQuery(favorite.doctorId, {
    skip: !favorite.doctorId,
  });

  const [
    updateFavorite,
    { isLoading: isUpdatingFavorite, isError: isErrorUpdateFavorite },
  ] = useUpdateFavoriteMutation();

  const {
    data: branchData,
    isLoading: isLoadingBranchData,
    isError: isErrorBranchData,
  } = useGetBranchByIdQuery(favorite.branchId, {
    skip: !favorite.branchId,
  });

  const [isRemoving, setIsRemoving] = useState(false);

  const toggleFavorite = async () => {
    try {
      setIsRemoving(true);
      setTimeout(async () => {
        const result = await updateFavorite({
          id: favorite.favoriteId,
          updatedFavorite: {
            id: favorite.favoriteId,
            doctorId: favorite.doctorId,
            status: false,
          },
        });
        toast.success("Doctor removed from favorites.", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }, 500); // 0.5 saniyelik animasyon süresi
    } catch (error) {
      toast.error("Failed to update favorites.");
    }
  };

  if (isLoadingDoctorData || isLoadingBranchData || isUpdatingFavorite) {
    return <p>Loading...</p>;
  }

  if (isErrorDoctorData || isErrorBranchData) {
    return <p>Error loading favorite doctors.</p>;
  }

  return (
    <div
      className={`relative group flex flex-col justify-center items-center text-center ${
        isRemoving ? "fade-out" : ""
      }`}>
      <div className="relative w-36 h-36">
        <img
          src={DefaultImage(doctorData?.doctorInfo)}
          alt={`${doctorData?.name} ${doctorData?.surname}`}
          className="w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 cursor-pointer"
        />
        <div
          onClick={toggleFavorite}
          className="absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
          <span className="text-gray-300 text-lg font-semibold mt-44">
            remove
          </span>
        </div>
      </div>
      <FaHeart
        className="text-red-500 text-3xl -mt-5 z-10 cursor-pointer"
        onClick={toggleFavorite}
      />
      <FaHeart className="w-10 h-10 text-white text-3xl -mt-9" />
      <div className="text-lg font-semibold mt-2">
        {doctorData?.title} {doctorData?.name} {doctorData?.surname}
      </div>
      <div className="text-gray-500">{branchData?.name}</div>
    </div>
  );
};

export default PatientFavoriteList;
