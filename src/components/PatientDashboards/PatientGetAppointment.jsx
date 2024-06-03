import { useState, useEffect, useRef } from "react";
import { format, addDays, isValid, parse, isAfter, set } from "date-fns";
import { BsPersonWalking } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaUserDoctor } from "react-icons/fa6";
import {
  useGetDoctorWorkingDayByDoctorIdQuery,
  useGetDailySlotsQuery,
  useGetAppointmentsByPatientAndDateQuery,
  useGetDoctorByIdQuery,
  useGetFavoritesQuery,
  useAddNewFavoriteMutation,
  useUpdateFavoriteMutation,
} from "../../redux/features/api/apiSlice";
import ConfirmAppointmentModal from "./ConfirmAppointmentModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../UI/Cards/Card";
import { TbClockRecord } from "react-icons/tb";
import useDefaultImage from "../hooks/DefaultImage";
import { toast } from "react-toastify";

const DashboardGetAppointment = () => {
  const [favorites, setFavorites] = useState([]);
  const { patientId } = useSelector((state) => state.patient);
  const { userId } = useSelector((state) => state.users.userLogin);
  const today = format(new Date(), "yyyy-MM-dd");
  const [searchParams] = useSearchParams();
  const dayFromUrl = searchParams.get("day");
  const doctorId = searchParams.get("doctorId");
  const branchName = searchParams.get("branchName");

  let initialDate = today;
  if (dayFromUrl) {
    const parsedDate = parse(dayFromUrl, "yyyy-MM-dd", new Date());
    if (isValid(parsedDate)) {
      initialDate = parsedDate;
    }
  }

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [confirmedSlots, setConfirmedSlots] = useState([]);
  const [slots, setSlots] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const formattedSlotsDate = format(selectedDate, "yyyy-MM-dd");
  const {
    data: doctor,
    isLoading: isLoadingDoctor,
    isError: isErrorDoctor,
  } = useGetDoctorByIdQuery(doctorId);

  const { data: doctorData, isLoading: isLoadingDoctorData } =
    useGetDoctorWorkingDayByDoctorIdQuery(doctorId);
  const { data: dailySlots, isLoading: isLoadingDailySlots } =
    useGetDailySlotsQuery({ doctorId, date: formattedSlotsDate });
  const { data: appointments, isLoading: isLoadingAppointments } =
    useGetAppointmentsByPatientAndDateQuery({
      patientId,
      date: formattedSlotsDate,
    });

  const { data: favoritesData, isLoading: isLoadingFavorites } =
    useGetFavoritesQuery(userId);

  const [addNewFavorite] = useAddNewFavoriteMutation();
  const [updateFavorite] = useUpdateFavoriteMutation();

  const [selectionPath, setSelectionPath] = useState({
    bolum: "", // Bölüm adı dinamik olarak ayarlanabilir
    doktor: doctor?.name,
  });

  useEffect(() => {
    if (favoritesData) {
      setFavorites(favoritesData);
    }
  }, [favoritesData]);

  const isFavorited = favorites.some(
    (fav) => fav.doctorId === doctor?.id && fav.status
  );

  useEffect(() => {
    const fetchData = async () => {
      if (dailySlots && doctorData) {
        fetchSlots(selectedDate, 1, doctorData);
      } else {
        setSlots({});
      }
    };

    setIsLoadingSlots(true);
    fetchData();
  }, [dailySlots, doctorData]);

  useEffect(() => {
    if (appointments) {
      const confirmed = appointments.map((appointment) => ({
        slot: appointment.appointmentTime,
        doctorId: appointment.doctorId,
      }));
      setConfirmedSlots(confirmed);
    }
  }, [appointments]);

  const generateDates = (startDate, numDays) => {
    return Array.from({ length: numDays }, (_, i) => addDays(startDate, i));
  };

  const fetchSlots = (startDate, numDays, schedule) => {
    if (schedule) {
      let newSlots = { ...slots };
      for (let i = 0; i < numDays; i++) {
        const date = addDays(startDate, i);
        const dayOfWeek = date.getDay();
        if (schedule.days.includes(dayOfWeek)) {
          const formattedDate = format(date, "yyyy-MM-dd");
          const slotsForDay = dailySlots?.slots || [];
          newSlots[formattedDate] = slotsForDay;
        } else {
          newSlots[format(date, "yyyy-MM-dd")] = [];
        }
      }
      setSlots(newSlots);
    } else {
      console.error("Error: Schedule is undefined.");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setIsLoadingSlots(true);
  };

  const handleSlotChange = (slot) => {
    setSelectedSlot(slot === selectedSlot ? null : slot);
  };

  const handleConfirmSlot = (slot) => {
    setConfirmedSlots([...confirmedSlots, slot]);
    setIsModalOpen(false);
  };

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount =
        direction === "left"
          ? -sliderRef.current.offsetWidth
          : sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const filterPastSlotsForToday = (slots) => {
    const currentTime = new Date();
    return slots.filter((slot) => {
      const [hours, minutes] = slot.time.split(":").map(Number);
      const slotTime = set(new Date(), { hours, minutes });
      return isAfter(slotTime, currentTime);
    });
  };

  const filteredSlots =
    formattedSlotsDate === today
      ? filterPastSlotsForToday(slots[formattedSlotsDate] || [])
      : slots[formattedSlotsDate] || [];

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

  const allDates = generateDates(new Date(), 30);

  const workingDays = doctorData ? doctorData.days : [];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const workingDays1 = doctorData?.days
    ?.split(",")
    .map((day) => parseInt(day.trim()))
    .filter((day) => day >= 0 && day <= 6);

  const workingDayElements =
    workingDays1?.length > 0 ? (
      workingDays1.map((day) => (
        <div
          key={day}
          className="w-9 h-9 bg-amber-500 text-white rounded-full flex items-center justify-center m-1">
          {dayNames[day]}
        </div>
      ))
    ) : (
      <div>No working days set</div>
    );

  const dateElements = allDates.map((date, index) => {
    const isWorkingDay = workingDays.includes(date.getDay());
    const isSelectedDate = selectedDate.toDateString() === date.toDateString();
    const hasSlots = slots[format(date, "yyyy-MM-dd")]?.length > 0;
    let dateClassName = "bg-red-300 text-white";

    if (isWorkingDay) {
      dateClassName = hasSlots ? "bg-cyan-300 text-black" : "bg-cyan-200";
    }

    if (isSelectedDate) {
      dateClassName = hasSlots
        ? "bg-cyan-500 text-white"
        : "bg-red-500 text-white";
    }

    return (
      <div
        key={index}
        onClick={() => handleDateChange(date)}
        className={`cursor-pointer p-2 rounded-lg text-center ${dateClassName}`}
        style={{ minWidth: "78px", marginRight: "6px" }}>
        <div className="text-sm font-medium text-black">
          {format(date, "eee")}
        </div>
        <div className="text-4xl font-medium">{format(date, "dd")}</div>
      </div>
    );
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        title={"My Favorite Doctors"}
        icon={<TbClockRecord />}
        color={"cyan"}
        className={"mb-6"}>
        <div className="col-span-2 p-4">
          <div className="flex justify-center items-center">
            <img
              src={useDefaultImage(doctor?.doctorInfo)}
              alt={`${doctor?.name} ${doctor?.surname}`}
              className="w-36 h-36 rounded-full object-cover border border-dashed border-cyan-500 p-2 items-center"
            />
          </div>
          <div className="flex justify-center items-center">
            {doctor?.title} {doctor?.name} {doctor?.surname}
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

        <div className="col-span-6 p-4">
          <div className="flex items-center space-x-2 mb-4">
            <button
              onClick={() => scroll("left")}
              className="p-2 bg-gray-300 hover:bg-cyan-500 delay-100 text-white rounded-full w-8 h-8 flex justify-center items-center">
              <IoIosArrowBack />
            </button>
            <div
              className="flex overflow-x-auto hide-scrollbar"
              style={{ width: "600px", height: "78px" }}
              ref={sliderRef}>
              {dateElements}
            </div>
            <button
              onClick={() => scroll("right")}
              className="p-2 bg-gray-300 hover:bg-cyan-500 delay-100 text-white rounded-full w-8 h-8 flex justify-center items-center">
              <IoIosArrowForward />
            </button>
          </div>
          <div className="slots w-full">
            {filteredSlots.length > 0 ? (
              <>
                <h2 className="font-bold text-xl mb-2 text-cyan-700 text-center">
                  Available Slots on {format(selectedDate, "eeee, MMMM dd")}
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {filteredSlots.map((slot, index) => {
                    const formattedSlotTime = `${slot.time}:00`;
                    const isConfirmed = confirmedSlots.some(
                      (cs) =>
                        cs.slot === formattedSlotTime &&
                        cs.doctorId === doctorId
                    );
                    return (
                      <button
                        key={index}
                        disabled={isConfirmed || !slot.available}
                        className={`p-2 rounded-lg ${
                          isConfirmed
                            ? "bg-green-200 cursor-not-allowed"
                            : slot.available
                            ? selectedSlot === slot.time
                              ? "bg-cyan-800 text-white"
                              : "bg-cyan-100"
                            : "bg-red-200 cursor-not-allowed"
                        }`}
                        onClick={() => handleSlotChange(slot.time)}>
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center font-bold text-xl mb-2 text-red-500 text-center">
                No slots available on {format(selectedDate, "eeee, MMMM dd")}
                <ImCancelCircle className="text-4xl mt-3" />
              </div>
            )}
          </div>
        </div>
        <div className="col-span-2">
          <div className="mt-4 p-4 border rounded-lg border-cyan-500 border-dashed">
            <h3 className="font-bold text-lg mb-4">Doctor Appointment</h3>
            <div className="flex gap-4">
              <div className="rounded-full border w-12 h-12 flex justify-center items-center">
                <BsPersonWalking className="text-lg text-gray-400" />
              </div>
              <div className="text-md">Branch: {selectionPath.bolum}</div>
            </div>

            {selectedSlot && (
              <>
                <div className="inline-flex flex-col justify-center items-center">
                  <div>
                    <div className="w-1 h-1 rounded border-r bg-slate-100 mb-1 ml-5"></div>
                  </div>
                  <div></div>
                  <div>
                    <div className="w-1 h-1 rounded border-r bg-slate-100 mb-1 ml-5"></div>
                  </div>
                  <div></div>
                  <div>
                    <div className="w-1 h-1 rounded border-r bg-slate-100 mb-1 ml-5"></div>
                  </div>
                  <div></div>
                </div>
                <div className="flex gap-4">
                  <div className="rounded-full border w-12 h-12 flex justify-center items-center">
                    <FaUserDoctor className="text-lg text-gray-400" />
                  </div>
                  <div className="text-md">Doctor: {selectionPath.doktor}</div>
                </div>
                <div className="inline-flex flex-col justify-center items-center">
                  <div>
                    <div className="w-1 h-1 rounded border-r bg-slate-100 mb-1 ml-5"></div>
                  </div>
                  <div></div>
                  <div>
                    <div className="w-1 h-1 rounded border-r bg-slate-100 mb-1 ml-5"></div>
                  </div>
                  <div></div>
                  <div>
                    <div className="w-1 h-1 rounded border-r bg-slate-100 mb-1 ml-5"></div>
                  </div>
                  <div></div>
                </div>
                <div className="flex gap-4">
                  <div className="rounded-full border w-12 h-12 flex justify-center items-center bg-green-500 text-white">
                    {selectedSlot}
                  </div>
                  <div className="text-md">
                    {format(selectedDate, "eeee, MMMM dd")}
                  </div>
                </div>
                <div>
                  <button
                    onClick={openModal}
                    className="bg-cyan-700 p-2 mt-4 hover:bg-green-600 text-white text-lg rounded">
                    Create Appointment
                  </button>
                  <ConfirmAppointmentModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    doctor={{ id: doctorId }}
                    selectedDate={selectedDate}
                    selectedSlot={selectedSlot}
                    branchName={selectionPath.bolum}
                    onConfirm={handleConfirmSlot}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default DashboardGetAppointment;
