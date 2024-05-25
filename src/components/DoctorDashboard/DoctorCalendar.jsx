import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector } from "react-redux";
import {
  useGetDailySlotsQuery,
  useGetDoctorWorkingDayByDoctorIdQuery,
  useGetByDoctorAndDateQuery,
} from "../../redux/features/api/apiSlice";
import { format } from "date-fns";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // Tippy.js CSS dosyasını import edin
import "./tooltipStyles.css";

const DoctorCalendar = () => {
  const { doctorId } = useSelector((state) => state.doctors);
  const [events, setEvents] = useState([]);
  const [backgroundEvents, setBackgroundEvents] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  const {
    data: workingDaysData,
    isLoading: isLoadingWorkingDays,
    isError: isErrorWorkingDays,
  } = useGetDoctorWorkingDayByDoctorIdQuery(doctorId, {
    skip: !doctorId,
  });

  const {
    data: appointmentsData,
    isLoading: isLoadingAppointments,
    isError: isErrorAppointments,
  } = useGetByDoctorAndDateQuery(
    { doctorId, date: today },
    { skip: !doctorId }
  );

  const {
    data: dailySlotsData,
    isLoading: isLoadingSlots,
    isError: isErrorSlots,
  } = useGetDailySlotsQuery({ doctorId, date: today }, { skip: !doctorId });

  useEffect(() => {
    if (workingDaysData) {
      const databaseDays = workingDaysData.days.split(",").map(Number);
      const startDate = new Date(today);
      startDate.setMonth(startDate.getMonth() - 1);
      const endDate = new Date(today);
      endDate.setMonth(endDate.getMonth() + 1);

      const workDays = [];
      for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const weekday = date.getDay();
        const adjustedWeekday = ((weekday + 6) % 7) + 1;
        if (databaseDays.includes(adjustedWeekday)) {
          workDays.push(new Date(date));
        }
      }

      const backgroundEvents = workDays.map((date) => ({
        start: date.toISOString().split("T")[0],
        end: date.toISOString().split("T")[0],
        display: "background",
        backgroundColor: "#99ffff",
      }));
      setBackgroundEvents(backgroundEvents);
    }
  }, [workingDaysData]);

  useEffect(() => {
    if (appointmentsData && dailySlotsData) {
      const formattedEvents = appointmentsData.map((appointment) => ({
        title: appointment.patientFullName,
        start: `${format(appointment.appointmentDate, "yyyy-MM-dd")}T${
          appointment.appointmentTime
        }`,
        end: `${format(appointment.appointmentDate, "yyyy-MM-dd")}T${addTime(
          appointment.appointmentTime,
          workingDaysData?.slotDuration
        )}`,
        url: `/dashboard/doctor/patient/${appointment.patientId}/${appointment.patientFullName}`,
      }));
      setEvents(formattedEvents);
    }
  }, [appointmentsData, dailySlotsData]);

  function addTime(time, duration) {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const [dHours, dMinutes, dSeconds] = duration.split(":").map(Number);

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    date.setHours(date.getHours() + dHours);
    date.setMinutes(date.getMinutes() + dMinutes);
    date.setSeconds(date.getSeconds() + dSeconds);

    const newTime = date.toTimeString().split(" ")[0];
    return newTime;
  }

  if (isLoadingWorkingDays || isLoadingAppointments || isLoadingSlots) {
    return <p>Loading...</p>;
  }

  if (isErrorWorkingDays || isErrorAppointments || isErrorSlots) {
    return <p>Error loading data.</p>;
  }

  const handleEventMount = (info) => {
    if (info.event.extendedProps.isWorkday) {
      info.el.style.backgroundColor = "green";
    }

    tippy(info.el, {
      content: `<div>${info.event.title}</div>`,
      allowHTML: true,
      placement: "top",
      theme: "light-border",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={[...events, ...backgroundEvents]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        slotMinTime="08:00:00"
        slotMaxTime="19:00:00"
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventBackgroundColor="#00b2b2"
        eventDidMount={handleEventMount}
      />
    </div>
  );
};

export default DoctorCalendar;
