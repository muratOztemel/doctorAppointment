import React, { useState, useEffect, useRef } from "react";
import { format, addDays } from "date-fns";

const DoctorAppointment = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [dates, setDates] = useState([]);
  const [slots, setSlots] = useState({});
  const sliderRef = useRef(null);

  const [selectionPath, setSelectionPath] = useState({
    hastane: "Örnek Hastane",
    bolum: "Örnek Bölüm",
    doktor: "Dr. Örnek",
  });

  useEffect(() => {
    setDates(generateDates(today, 10));
    fetchSlots(today, 10);
  }, []);

  const generateDates = (startDate, numDays) => {
    return Array.from({ length: numDays }, (_, i) => addDays(startDate, i));
  };

  const fetchSlots = (startDate, numDays) => {
    let newSlots = {};
    for (let i = 0; i < numDays; i++) {
      const date = addDays(startDate, i);
      newSlots[format(date, "yyyy-MM-dd")] = [
        "09:00",
        "09:15",
        "09:30",
        "09:45",
        "10:00",
        "10:15",
        "10:30",
        "10:45",
        "11:00",
        "11:15",
        "11:30",
        "11:45",
        "01:30",
        "13:45",
        "02:00",
        "03:00",
      ];
    }
    setSlots(newSlots);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset slot when date changes
  };

  const handleSlotChange = (slot) => {
    setSelectedSlot(slot === selectedSlot ? null : slot);
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

  return (
    <>
      <div className="col-span-6 p-4">
        <div className="flex items-center space-x-2 mb-4">
          <button
            onClick={() => scroll("left")}
            className="p-2 bg-cyan-500 text-white rounded-full w-8 h-8 flex justify-center items-center">
            {"<"}
          </button>
          <div
            ref={sliderRef}
            className="flex overflow-x-auto hide-scrollbar"
            style={{ width: "550px", height: "105px" }}>
            {dates.map((date, index) => (
              <div
                key={index}
                onClick={() => handleDateChange(date)}
                className={`cursor-pointer p-2 rounded-lg text-center ${
                  selectedDate.toDateString() === date.toDateString()
                    ? "bg-cyan-500 text-white"
                    : "bg-cyan-200"
                }`}
                style={{ minWidth: "100px", marginRight: "10px" }}>
                <div className="text-sm font-medium text-cyan-800">
                  {format(date, "eee")}
                </div>
                <div className="text-5xl font-medium">{format(date, "dd")}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll("right")}
            className="p-2 bg-cyan-500 text-white rounded-full w-8 h-8 flex justify-center items-center">
            {">"}
          </button>
        </div>
        <div className="slots w-full">
          <h2 className="font-bold text-xl mb-2">
            Available Slots on {format(selectedDate, "eeee, MMMM dd")}
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {(slots[format(selectedDate, "yyyy-MM-dd")] || []).map(
              (slot, index) => (
                <button
                  key={index}
                  className={`p-2 rounded-lg ${
                    selectedSlot === slot
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleSlotChange(slot)}>
                  {slot}
                </button>
              )
            )}
          </div>
        </div>
      </div>
      <div className="col-span-2 p-4">
        {selectedSlot && (
          <div className="mt-4 p-4 border rounded-lg">
            <h3 className="font-bold text-lg">Seçiminiz</h3>
            <div className="text-md mt-2">Hastane: {selectionPath.hastane}</div>
            <div className="text-md">Bölüm: {selectionPath.bolum}</div>
            <div className="text-md">Doktor: {selectionPath.doktor}</div>
            <div className="text-md">
              Tarih: {format(selectedDate, "eeee, MMMM dd")}
            </div>
            <div className="text-md">Saat: {selectedSlot}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorAppointment;
