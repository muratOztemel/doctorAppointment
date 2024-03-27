import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async () => {
    const res = await fetch("http://127.0.0.1:3001/appointments");
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    return data;
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",

  initialState: {
    appointmentsData: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    addNewAppointments: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAppointments.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchAppointments.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addNewAppointments } = appointmentsSlice.actions;

export default appointments.reducer;
