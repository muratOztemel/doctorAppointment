import { createSlice } from "@reduxjs/toolkit";

export const DoctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    doctorId: 1,
  },
  reducers: {
    setDoctorId: (state, action) => {
      state.doctorId = action.payload;
    },
  },
});

export const { setDoctorId } = DoctorsSlice.actions;

export default DoctorsSlice.reducer;
