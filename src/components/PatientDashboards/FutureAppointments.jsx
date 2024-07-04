import { useEffect, useState } from "react";
import Slider from "react-slick";
import useFutureAppointments from "../hooks/useFutureAppointments";
import { format } from "date-fns";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FutureAppointments = () => {
  const { futureAppointments, isLoading, isError } = useFutureAppointments();
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading appointments.</p>;
  }

  const settings = {
    dots: true,
    infinite: false, // Set to false to ensure no infinite looping
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const uniqueAppointments = futureAppointments.reduce((acc, curr) => {
    if (!acc.find((appointment) => appointment.id === curr.id)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return (
    <div className="w-full bg-green-400 mb-6 p-4 text-white rounded">
      <Slider {...settings}>
        {uniqueAppointments.length === 0 ? (
          <p>No future appointments found.</p>
        ) : (
          uniqueAppointments.map((appointment) => {
            const appointmentTime = new Date(appointment.appointmentDate);
            const timeLeft = Math.max(
              (appointmentTime - currentTime) / 1000,
              0
            ); // Time left in seconds
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = Math.floor(timeLeft % 60);

            return (
              <div key={appointment.id}>
                <div className="bg-white text-black p-2 rounded">
                  <p>
                    <strong>Doctor:</strong> {appointment.doctorFullName} -
                    <strong className="text-cyan-500">
                      Future appointment on{" "}
                      {format(
                        new Date(appointment.appointmentDate),
                        "yyyy-MM-dd"
                      )}{" "}
                      at {appointment.appointmentTime}
                    </strong>
                    - <strong>Time left:</strong> {hours}h {minutes}m {seconds}s
                  </p>
                </div>
              </div>
            );
          })
        )}
      </Slider>
    </div>
  );
};

export default FutureAppointments;
