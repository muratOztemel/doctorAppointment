import React, { useRef, useState } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const doctors = [
  {
    img: "/images/slider/01.jpg",
    name: "Dr. John Doe",
    specialty: "Cardiology",
  },
  {
    img: "/images/slider/02.jpg",
    name: "Dr. Jane Smith",
    specialty: "Neurology",
  },
  {
    img: "/images/slider/03.jpg",
    name: "Dr. Emily White",
    specialty: "Pediatrics",
  },
];

function AdvancedDoctorSlider() {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);

  const nextSlide = () => {
    const nextIndex = (index + 1) % doctors.length;
    animateSlideTransition(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = index === 0 ? doctors.length - 1 : index - 1;
    animateSlideTransition(prevIndex);
  };

  const animateSlideTransition = (newIndex) => {
    gsap.to(sliderRef.current.children[index], { opacity: 0, duration: 1 });
    gsap.fromTo(
      sliderRef.current.children[newIndex],
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
    setIndex(newIndex);
  };

  return (
    <div className="relative w-full max-w-[1280px] h-[500px] mx-auto overflow-hidden">
      <div ref={sliderRef} className="absolute inset-0">
        {doctors.map((doctor, i) => (
          <img
            key={i}
            src={doctor.img}
            alt={`Dr. ${doctor.name}`}
            style={{
              width: "1280px",
              height: "500px",
              position: "absolute",
              left: 0,
              top: 0,
              opacity: i === index ? 1 : 0,
            }}
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute w-12 h-14 left-4 top-1/2 -translate-y-1/2 text-white text-4xl z-10 bg-red-500 rounded">
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute w-12 h-14 right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-10 bg-red-500 rounded">
        &#10095;
      </button>
      <div className="absolute inset-0 flex flex-col items-end justify-end">
        <div className="bg-white bg-opacity-30 mb-10 mr-10 rounded-md p-2">
          <h1 className="text-3xl font-bold">
            Committed to Excellence in{" "}
            <span className="text-[#1A76D1]">Healthcare.</span>
          </h1>
          <p>
            Building a Healthier Tomorrow, Together: Exceptional Care, Advanced
            Medicine, and a Passion for Healing
          </p>
          <div className="button mt-4">
            <Link
              to="/auth/login"
              className="btn bg-red-500 p-3 rounded text-white">
              Get Appointment
            </Link>
            <button className="btn primary bg-slate-800 text-white p-3 ml-6 rounded">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedDoctorSlider;
