export const appointmentData = {
  doctorId: 1,
  date: "2024-05-06",
  slots: [
    { time: "10:00", available: true },
    { time: "10:20", available: true },
    { time: "10:40", available: true },
    { time: "11:00", available: true },
    { time: "11:20", available: true },
    { time: "11:40", available: true },
    { time: "12:00", available: true },
    { time: "12:20", available: true },
    { time: "13:30", available: true },
    { time: "13:50", available: true },
    { time: "14:10", available: true },
    { time: "14:30", available: true },
    { time: "14:50", available: true },
    { time: "15:10", available: true },
    { time: "15:30", available: true },
    { time: "15:50", available: true },
  ],
};

const times = appointmentData.slots.map((slot) => slot.time);

console.log(times);
