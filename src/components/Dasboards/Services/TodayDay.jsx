const TodayDay = () => {
  const today = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[today.getDay()]; // getDay(), haftanın gününü 0 (Pazar) ile 6 (Cumartesi) arasında bir sayı olarak döndürür

  return <p>{day}</p>;
};
export default TodayDay;
