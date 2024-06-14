import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorId: null,
  sortField: "",
  sortOrder: "asc",
  searchTerm: "",
  filter: "",
};

const tableDoctorsSlice = createSlice({
  name: "tableDoctors",
  initialState,
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
    resetFilters: (state) => {
      state.sortField = "";
      state.sortOrder = "asc";
      state.searchTerm = "";
      state.filter = "";
    },
  },
});

export const {
  setDoctorId,
  setSortField,
  setSortOrder,
  setSearchTerm,
  setFilter,
  resetFilters,
} = tableDoctorsSlice.actions;

export default tableDoctorsSlice.reducer;
