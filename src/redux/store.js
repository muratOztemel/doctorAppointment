import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import chartReducer from "./slices/chartSlice.js";
import chartDoctorsReducer from "./slices/chartDoctorsSlice.js";
import chartPatientsReducer from "./slices/chartPatientsSlice.js";
import chartAppointmentsPieReducer from "./slices/chartAppointmentsPieSlice.js";
import chartPatientsPieReducer from "./slices/chartPatientsPieSlice.js";
import tablePatientsReducer from "./slices/tablePatientsSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    chart: chartReducer,
    chartDoctors: chartDoctorsReducer,
    chartPatients: chartPatientsReducer,
    chartAppointmentsPie: chartAppointmentsPieReducer,
    chartPatientsPie: chartPatientsPieReducer,
    tablePatients: tablePatientsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
