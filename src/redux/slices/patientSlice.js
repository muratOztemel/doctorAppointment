import { createSlice } from "@reduxjs/toolkit";

export const patientSlice = createSlice({
  name: "patient",
  initialState: {
    patientId: null,
  },
  reducers: {
    setPatientId: (state, action) => {
      state.patientId = action.payload;
    },
    clearPatient: (state) => {
      state.patientId = null;
    },
  },
});

export const { setPatientId, clearPatient } = patientSlice.actions;

export default patientSlice.reducer;
