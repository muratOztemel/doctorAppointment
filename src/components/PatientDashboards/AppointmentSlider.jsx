import DateSlider from "./DateSlider";

const AppointmentSlider = ({ doctor, branchName, setDay, day }) => {
  return (
    <DateSlider
      doctor={doctor}
      branchName={branchName}
      setDay={setDay}
      day={day}
    />
  );
};

export default AppointmentSlider;
