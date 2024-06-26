import { useGetDailySlotsQuery } from "../../redux/features/api/apiSlice";

// Custom hook tanımı
function useFetchDailySlots(doctorId, date) {
  const { data, error, isLoading } = useGetDailySlotsQuery({ doctorId, date });

  return {
    slots: data ? data.slots : [],
    isLoading,
    error,
  };
}

export default useFetchDailySlots;
