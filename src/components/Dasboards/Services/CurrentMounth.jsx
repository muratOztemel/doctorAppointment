const CurrentMounth = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const today = new Date();
  const month = months[today.getMonth()]; // Ayı al ve dizi üzerinden ismini bul

  return <p>{month}</p>;
};
export default CurrentMounth;
