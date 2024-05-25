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
  useGetPatientByIdQuery,
} from "../../redux/features/api/apiSlice";

const DoctorCalendar = () => {
  const { doctorId } = useSelector((state) => state.doctors);
  const [events, setEvents] = useState([]);
  const [isTodayInDatabaseDays, setIsTodayInDatabaseDays] = useState(false);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [dailySlotsData, setDailySlotsData] = useState([]);
  const [patientNames, setPatientNames] = useState({});

  const {
    data: workingDaysData,
    isLoading: isLoadingWorkingDays,
    isError: isErrorWorkingDays,
  } = useGetDoctorWorkingDayByDoctorIdQuery(doctorId, {
    skip: !doctorId,
  });

  useEffect(() => {
    if (workingDaysData) {
      const databaseDays = workingDaysData.days.split(",").map(Number);
      const today = new Date();
      const weekday = today.getDay();
      const adjustedWeekday = ((weekday + 6) % 7) + 1;
      const isInDatabaseDays = databaseDays.includes(adjustedWeekday);
      setIsTodayInDatabaseDays(isInDatabaseDays);
    }
  }, [workingDaysData]);

  useEffect(() => {
    if (isTodayInDatabaseDays && doctorId) {
      console.log("I'm here");
      const fetchAppointmentsAndSlots = async () => {
        try {
          const today = new Date().toISOString().split("T")[0];

          // Fetch appointments
          const { data: fetchedAppointments } =
            await useGetByDoctorAndDateQuery(
              { doctorId, date: today },
              { skip: !doctorId }
            );
          setAppointmentsData(fetchedAppointments || []);

          // Fetch daily slots
          const { data: fetchedDailySlots } = await useGetDailySlotsQuery(
            { doctorId, date: today },
            { skip: !doctorId }
          );
          setDailySlotsData(fetchedDailySlots || []);

          // Fetch patient names
          const patientNamePromises = (fetchedAppointments || []).map(
            async (appointment) => {
              const { data: patientData } = await useGetPatientByIdQuery(
                appointment.patientId
              );
              return {
                id: appointment.patientId,
                name: `${patientData.name} ${patientData.surname}`,
              };
            }
          );

          const fetchedPatientNames = await Promise.all(patientNamePromises);
          const patientNamesMap = fetchedPatientNames.reduce(
            (acc, { id, name }) => {
              acc[id] = name;
              return acc;
            },
            {}
          );
          setPatientNames(patientNamesMap);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchAppointmentsAndSlots();
    }
  }, [isTodayInDatabaseDays, doctorId]);

  useEffect(() => {
    if (isTodayInDatabaseDays && appointmentsData.length > 0) {
      const formattedEvents = appointmentsData.map((appointment) => ({
        title: patientNames[appointment.patientId] || "Empty Appointment",
        date: `${appointment.appointmentDate}T${appointment.appointmentTime}`,
      }));
      setEvents(formattedEvents);
    }
  }, [appointmentsData, patientNames, isTodayInDatabaseDays]);

  if (isLoadingWorkingDays) {
    return <p>Loading...</p>;
  }

  if (isErrorWorkingDays) {
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
