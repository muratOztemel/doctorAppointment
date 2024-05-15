import { useState, useEffect, useRef } from "react";
import { format, addDays, isValid, parse } from "date-fns";
import { BsPersonWalking } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import {
  useGetDoctorWorkingDayByDoctorIdQuery,
  useGetDailySlotsQuery,
  useGetAppointmentsByPatientAndDateQuery,
} from "../../redux/features/api/apiSlice";
import ConfirmAppointmentModal from "./ConfirmAppointmentModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DoctorAppointment = ({ doctor, branchName, setDay, day }) => {
  const { patientId } = useSelector((state) => state.patient);
  const today = format(new Date(), "yyyy-MM-dd");
  const [searchParams, setSearchParams] = useSearchParams();
  const dayFromUrl = searchParams.get("day");

  let initialDate = today;
  if (dayFromUrl) {
    const parsedDate = parse(dayFromUrl, "yyyy-MM-dd", new Date());
    if (isValid(parsedDate)) {
      initialDate = parsedDate;
    }
  }

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedAvailable, setSelectedAvailable] = useState(null);
  const [confirmedSlots, setConfirmedSlots] = useState([]);
  const [dates, setDates] = useState([]);
  const [slots, setSlots] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const sliderRef = useRef(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false); // Veri yükleniyor mu?

  const formattedSlotsDate = format(selectedDate, "yyyy-MM-dd");

  const { data: doctorData, isLoading: isLoadingDoctorData } =
    useGetDoctorWorkingDayByDoctorIdQuery(doctor.id);
  const { data: dailySlots, isLoading: isLoadingDailySlots } =
    useGetDailySlotsQuery({ doctorId: doctor.id, date: formattedSlotsDate });
  const { data: appointments, isLoading: isLoadingAppointments } =
    useGetAppointmentsByPatientAndDateQuery({
      patientId,
      date: formattedSlotsDate,
    }); // Randevuları alın

  const [selectionPath, setSelectionPath] = useState({
    bolum: branchName,
    doktor: `${doctor.name} ${doctor.surname}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (dailySlots && doctorData) {
        // doctorData da burada kontrol ediliyor
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
    setDay(format(date, "yyyy-MM-dd"));
    setSelectedSlot(null); // Tarih değiştiğinde seçili slota null atın
    setIsLoadingSlots(true); // Yeni tarih seçildiğinde veri yükleniyor olarak işaretleyin
  };

  const handleSlotChange = (slot) => {
    setSelectedSlot(slot === selectedSlot ? null : slot);
  };

  const handleConfirmSlot = (slot) => {
    setConfirmedSlots([...confirmedSlots, slot]);
    closeModal();
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

  const selectedSlots = slots[format(selectedDate, "yyyy-MM-dd")] || [];

  // Tüm tarihleri oluştur
  const allDates = generateDates(today, 30);

  // Doktorun çalışma günlerini al
  const workingDays = doctorData ? doctorData.days : [];

  // Tüm tarihleri dönüp rengini belirle
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

  return (
    <>
      <div className="col-span-6 p-4">
        <div className="flex items-center space-x-2 mb-4">
          <button
            onClick={() => scroll("left")}
            className="p-2 bg-gray-300 hover:bg-cyan-500 delay-100	 text-white rounded-full w-8 h-8 flex justify-center items-center">
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
          {selectedSlots.length > 0 ? (
            <>
              <h2 className="font-bold text-xl mb-2 text-cyan-700 text-center">
                Available Slots on {format(selectedDate, "eeee, MMMM dd")}
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {selectedSlots.map((slot, index) => {
                  // Slot zamanını "HH:mm:ss" formatına dönüştür
                  const formattedSlotTime = `${slot.time}:00`;
                  // Slotun alınmış olup olmadığını kontrol edin
                  const isConfirmed = confirmedSlots.some(
                    (cs) =>
                      cs.slot === formattedSlotTime && cs.doctorId === doctor.id
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
                      {slot.time} {/* slot nesnesinden sadece zamanı al */}
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
                  doctor={doctor}
                  selectedDate={selectedDate}
                  selectedSlot={selectedSlot}
                  branchName={branchName}
                  onConfirm={handleConfirmSlot} // Confirm handler
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorAppointment;
