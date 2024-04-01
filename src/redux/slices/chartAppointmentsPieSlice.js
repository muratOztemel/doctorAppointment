import { createSlice } from "@reduxjs/toolkit";

export const chartAppointmentsPieSlice = createSlice({
  name: "chartAppointmentsPie",
  initialState: {
    appointmentsPieTotalCounts: 0,
    appointmentsPieMonths: {},
    appointmentsPieSeries: [],
    appointmentsPieOptions: {},
  },
  reducers: {
    setAppointmentsPieTotalCounts: (state, action) => {
      state.appointmentsPieTotalCounts = action.payload;
    },
    setAppointmentsPieMonths: (state, action) => {
      state.appointmentsPieMonths = action.payload;
    },
    setAppointmentsPieSeries: (state, action) => {
      state.appointmentsPieSeries = action.payload;
    },
    setAppointmentsPieOptions: (state, action) => {
      state.appointmentsPieOptions = action.payload;
    },
  },
});

export const {
  setAppointmentsPieTotalCounts,
  setAppointmentsPieMonths,
  setAppointmentsPieSeries,
  setAppointmentsPieOptions,
} = chartAppointmentsPieSlice.actions;

export default chartAppointmentsPieSlice.reducer;
