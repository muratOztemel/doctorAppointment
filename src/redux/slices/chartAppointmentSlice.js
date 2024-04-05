import { createSlice } from "@reduxjs/toolkit";

export const chartAppointmentSlice = createSlice({
  name: "chart",
  initialState: {
    totalCounts: 0,
    dailyCounts: {},
    series: [],
    options: {},
  },
  reducers: {
    setTotalCounts: (state, action) => {
      state.totalCounts = action.payload;
    },
    setDailyCounts: (state, action) => {
      state.dailyCounts = action.payload;
    },
    setSeries: (state, action) => {
      state.series = action.payload;
    },
    setOptions: (state, action) => {
      state.options = action.payload;
    },
  },
});

export const { setTotalCounts, setDailyCounts, setSeries, setOptions } =
  chartAppointmentSlice.actions;

export default chartAppointmentSlice.reducer;
