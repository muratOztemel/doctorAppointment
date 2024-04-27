import React, { useRef } from "react";
import { days } from "./days"; // days.js dosyasından import edildi
import DateSlider from "./DateSlider";

const AppointmentSlider = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const containerWidth = sliderRef.current.clientWidth;
    const scrollAmount = (containerWidth / 5) * 5; // Beş kart genişliği
    if (direction === "left") {
      sliderRef.current.scrollLeft -= scrollAmount;
    } else {
      sliderRef.current.scrollLeft += scrollAmount;
    }
  };

  return <DateSlider />;
};

export default AppointmentSlider;
