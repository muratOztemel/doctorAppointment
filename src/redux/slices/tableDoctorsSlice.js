import { createSlice } from "@reduxjs/toolkit";

export const tableDoctorsSlice = createSlice({
  name: "tableDoctors",
  initialState: {
    doctorId: 0,
    sortField: "id",
    sortOrder: "asc",
    searchTerm: "",
    filter: "",
  },
  reducers: {
    setDoctorId: (state, action) => {
      state.doctorId = action.payload;
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
  },
});

export const {
  setDoctorId,
  setSortField,
  setSortOrder,
  setSearchTerm,
  setFilter,
  setIsShowError,
} = tableDoctorsSlice.actions;

export default tableDoctorsSlice.reducer;
