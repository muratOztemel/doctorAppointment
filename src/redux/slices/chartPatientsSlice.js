import { createSlice } from "@reduxjs/toolkit";

export const chartPatientsSlice = createSlice({
  name: "chartPatients",
  initialState: {
    patientsTotalCounts: 0,
    patientsDailyCounts: {},
    patientsSeries: [],
    patientsOptions: {},
  },
  reducers: {
    setPatientsTotalCounts: (state, action) => {
      state.patientsTotalCounts = action.payload;
    },
    setPatientsDailyCounts: (state, action) => {
      state.patientsDailyCounts = action.payload;
    },
    setPatientsSeries: (state, action) => {
      state.patientsSeries = action.payload;
    },
    setPatientsOptions: (state, action) => {
      state.patientsOptions = action.payload;
    },
  },
});

export const {
  setPatientsTotalCounts,
  setPatientsDailyCounts,
  setPatientsSeries,
  setPatientsOptions,
} = chartPatientsSlice.actions;

export default chartPatientsSlice.reducer;
