import React, { useEffect, useState } from "react";
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
import useFetchPatientNames from "../hooks/FetchPatientNames"; // Import the custom hook

const DoctorCalendar = () => {
  const { doctorId } = useSelector((state) => state.doctors);
  const [events, setEvents] = useState([]);

  const {
    data: dailySlotsData,
    isLoading: isLoadingSlots,
    isError: isErrorSlots,
  } = useGetDailySlotsQuery(
    { doctorId, date: new Date().toISOString().split("T")[0] },
    { skip: !doctorId }
  );

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
    {
      doctorId,
      date: new Date().toISOString().split("T")[0],
    },
    {
      skip: !doctorId,
    }
  );

  const patientNames = useFetchPatientNames(appointmentsData || []);

  useEffect(() => {
    const formattedEvents = (appointmentsData || []).map((appointment) => ({
      title: patientNames[appointment.patientId] || "Unknown Patient",
      date: `${appointment.appointmentDate}T${appointment.appointmentTime}`,
    }));

    setEvents(formattedEvents);
  }, [appointmentsData, patientNames]);

  if (isLoadingSlots || isLoadingWorkingDays || isLoadingAppointments) {
    return <p>Loading...</p>;
  }

  if (isErrorSlots || isErrorWorkingDays || isErrorAppointments) {
    return <p>Error loading data.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
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
      />
    </div>
  );
};

export default DoctorCalendar;
