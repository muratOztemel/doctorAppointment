import { createSlice } from "@reduxjs/toolkit";

export const DoctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    doctorId: null,
  },
  reducers: {
    setDoctorId: (state, action) => {
      state.doctorId = action.payload;
    },
    clearDoctor: (state) => {
      state.doctorId = null;
    },
  },
});

export const { setDoctorId, clearDoctor } = DoctorsSlice.actions;

export default DoctorsSlice.reducer;
