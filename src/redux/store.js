import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import chartReducer from "./slices/chartSlice.js";
import chartAppointmentReducer from "./slices/chartAppointmentSlice.js";
import chartDoctorsReducer from "./slices/chartDoctorsSlice.js";
import chartPatientsReducer from "./slices/chartPatientsSlice.js";
import chartAppointmentsPieReducer from "./slices/chartAppointmentsPieSlice.js";
import chartPatientsPieReducer from "./slices/chartPatientsPieSlice.js";
import tablePatientsReducer from "./slices/tablePatientsSlice.js";
import tableDoctorsReducer from "./slices/tableDoctorsSlice.js";
import tableAppointmentsReducer from "./slices/tableAppointmentsSlice.js";
import usersReducer from "./slices/usersSlice.js";
import branchesListReducer from "./slices/branchesListSlice.js";
import doctorsReducer from "./slices/doctorsSlice.js";
import tableMedicinesReducer from "./slices/tableMedicinesSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    chart: chartReducer,
    chartAppointment: chartAppointmentReducer,
    chartDoctors: chartDoctorsReducer,
    chartPatients: chartPatientsReducer,
    chartAppointmentsPie: chartAppointmentsPieReducer,
    chartPatientsPie: chartPatientsPieReducer,
    tablePatients: tablePatientsReducer,
    tableDoctors: tableDoctorsReducer,
    tableAppointments: tableAppointmentsReducer,
    users: usersReducer,
    branchesList: branchesListReducer,
    doctors: doctorsReducer,
    tableMedicines: tableMedicinesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
