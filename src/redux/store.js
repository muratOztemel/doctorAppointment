import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice.js";
import chartReducer from "./slices/chartSlice.js";
import chartDoctorsReducer from "./slices/chartDoctorsSlice.js";
import chartPatientsReducer from "./slices/chartPatientsSlice.js";
import chartAppointmentsPieReducer from "./slices/chartAppointmentsPieSlice.js";
import chartPatientsPieReducer from "./slices/chartPatientsPieSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    chart: chartReducer,
    chartDoctors: chartDoctorsReducer,
    chartPatients: chartPatientsReducer,
    chartAppointmentsPie: chartAppointmentsPieReducer,
    chartPatientsPie: chartPatientsPieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
