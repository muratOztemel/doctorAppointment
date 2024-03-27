import { createSlice } from "@reduxjs/toolkit";

export const chartPatientsPieSlice = createSlice({
  name: "chartPatientsPie",
  initialState: {
    patientsPieTotalCounts: 0,
    patientsPieMonths: {},
    patientsPieSeries: [],
    patientsPieOptions: {},
  },
  reducers: {
    setPatientsPieTotalCounts: (state, action) => {
      state.patientsPieTotalCounts = action.payload;
    },
    setPatientsPieMonths: (state, action) => {
      state.patientsPieMonths = action.payload;
    },
    setPatientsPieSeries: (state, action) => {
      state.patientsPieSeries = action.payload;
    },
    setPatientsPieOptions: (state, action) => {
      state.patientsPieOptions = action.payload;
    },
  },
});

export const {
  setPatientsPieTotalCounts,
  setPatientsPieMonths,
  setPatientsPieSeries,
  setPatientsPieOptions,
} = chartPatientsPieSlice.actions;

export default chartPatientsPieSlice.reducer;
