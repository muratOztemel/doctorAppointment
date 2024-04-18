import { createSlice } from "@reduxjs/toolkit";

export const tableDoctorAppointmentSlice = createSlice({
  name: "tableDoctorAppointment",
  initialState: {
    appointmentId: 0,
    doctorId: 1,
    sortField: "id",
    sortOrder: "asc",
    searchTerm: "",
    filter: "",
  },
  reducers: {
    setAppointmentId: (state, action) => {
      state.appointmentId = action.payload;
    },
    setDoctorId: (state, action) => {
      state.doctorId = action.payload;
    },
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setAppointmentId,
  setDoctorId,
  setSortField,
  setSortOrder,
  setSearchTerm,
  setFilter,
} = tableDoctorAppointmentSlice.actions;

export default tableDoctorAppointmentSlice.reducer;
