import { createSlice } from "@reduxjs/toolkit";

export const tablePatientsSlice = createSlice({
  name: "tablePatients",
  initialState: {
    patientId: null,
    sortField: "id",
    sortOrder: "asc",
    searchTerm: "",
    filter: "",
    isShowError: false,
  },
  reducers: {
    setPatientId: (state, action) => {
      state.patientId = action.payload;
    },
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setIsShowError: (state) => {
      state.isShowError = !state.isShowError;
    },
  },
});

export const {
  setPatientId,
  setSortField,
  setSortOrder,
  setSearchTerm,
  setFilter,
  setIsShowError,
} = tablePatientsSlice.actions;

export default tablePatientsSlice.reducer;
