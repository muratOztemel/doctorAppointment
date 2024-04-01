import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "./slices/patientsSlice";
import appointmentsReducer from "./slices/appointmentsSlice";

const store = configureStore({
  reducer: {
    patients: patientsReducer,
    appointments: appointmentsReducer,
  },
});

export default store;
