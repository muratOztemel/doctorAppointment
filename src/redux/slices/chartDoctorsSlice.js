import { createSlice } from "@reduxjs/toolkit";

export const chartDoctorsSlice = createSlice({
  name: "chartDoctors",
  initialState: {
    series: [],
    options: {},
    doctorsName: "",
  },
  reducers: {
    setSeries: (state, action) => {
      state.series = action.payload;
    },
    setOptions: (state, action) => {
      state.options = action.payload;
    },
    setDoctorsName: (state, action) => {
      state.doctorsName = action.payload;
    },
  },
});

export const { setSeries, setOptions, setDoctorsName } =
  chartDoctorsSlice.actions;

export default chartDoctorsSlice.reducer;
