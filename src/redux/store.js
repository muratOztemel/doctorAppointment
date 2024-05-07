import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import chartReducer from "./slices/chartSlice";
import chartAppointmentReducer from "./slices/chartAppointmentSlice";
import chartDoctorsReducer from "./slices/chartDoctorsSlice";
import chartPatientsReducer from "./slices/chartPatientsSlice";
import chartAppointmentsPieReducer from "./slices/chartAppointmentsPieSlice";
import chartPatientsPieReducer from "./slices/chartPatientsPieSlice";
import tablePatientsReducer from "./slices/tablePatientsSlice";
import tableDoctorsReducer from "./slices/tableDoctorsSlice";
import tableAppointmentsReducer from "./slices/tableAppointmentsSlice";
import usersReducer from "./slices/usersSlice";
import branchesListReducer from "./slices/branchesListSlice";
import doctorsReducer from "./slices/doctorsSlice";
import tableMedicinesReducer from "./slices/tableMedicinesSlice";
import tableDoctorAppointmentReducer from "./slices/tableDoctorAppointmentSlice";
import modalReducer from "./slices/modalSlice";
import patientReducer from "./slices/patientSlice.js";

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
    tableDoctorAppointment: tableDoctorAppointmentReducer,
    modal: modalReducer,
    patient: patientReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
