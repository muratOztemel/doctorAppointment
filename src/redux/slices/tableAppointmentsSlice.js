import { createSlice } from "@reduxjs/toolkit";

export const tableAppointmentsSlice = createSlice({
  name: "tableAppointments",
  initialState: {
    appointmentId: 0,
    sortField: "id",
    sortOrder: "asc",
    searchTerm: "",
    filter: "",
  },
  reducers: {
    setAppointmentId: (state, action) => {
      state.appointmentId = action.payload;
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
  setSortField,
  setSortOrder,
  setSearchTerm,
  setFilter,
} = tableAppointmentsSlice.actions;

export default tableAppointmentsSlice.reducer;
