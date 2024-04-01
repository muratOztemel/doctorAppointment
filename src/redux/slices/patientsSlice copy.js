import { createSlice } from "@reduxjs/toolkit";

const patientsSlice = createSlice({
  name: "patients",

  initialState: {
    patientsData: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    addNewPatients: () => {},
  },
});

export const { addNewPatients } = patientsSlice.actions;

export default patientsSlice.reducer;
