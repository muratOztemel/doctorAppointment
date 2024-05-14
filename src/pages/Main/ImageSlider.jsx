import React, { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    const nextIndex = (index + 1) % doctors.length;

    const timeline = gsap.timeline({
      defaults: { duration: 5, ease: "power2.inOut" },
      onComplete: () => setIndex(nextIndex),
    });

    timeline
      .to(sliderRef.current.children[index], { opacity: 0 }, 0)
      .fromTo(
        sliderRef.current.children[nextIndex],
        { opacity: 0 },
        { opacity: 1 },
        0.5
      );
  }, [index]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "500px" }}>
      <div ref={sliderRef} className="absolute inset-0">
        {doctors.map((doctor, i) => (
          <img
            key={i}
            src={doctor.img}
            alt={`Dr. ${doctor.name}`}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              opacity: i === 0 ? 1 : 0,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col items-end justify-end">
        <div className="bg-white bg-opacity-30 mb-10 mr-10 rounded-md p-2">
          <h1 className="text-3xl font-bold h-35 mb-4">
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
